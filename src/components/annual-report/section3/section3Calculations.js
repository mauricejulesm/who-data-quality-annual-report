import { getRoundedValue } from '../utils/mathService.js'
import {
    convertAnalyticsResponseToObject,
    sortArrayAfterIndex1,
} from '../utils/utils.js'
import {
    OVERALL_RESPONSE_NAME,
    BY_LEVEL_RESPONSE_NAME,
    EXTERNAL_RELATIONS_INDICES_WITH_BY_LEVEL_DATA,
} from './useFetchSectionThreeData.js'

const MULTIPLE_ORG_UNITS_CHART_TYPE = 'scatter'
const SINGLE_ORG_UNITS_CHART_TYPE = 'bullet'

const getVal = ({ response, dx, ou, pe }) => {
    return response?.[dx]?.[ou]?.[pe]
}

const getRoutineValue = ({ relation, response, ou, pe }) => {
    const numeratorValue = getVal({ response, dx: relation.numerator, ou, pe })
    const denominatorValue = getVal({
        response,
        dx: relation.denominator,
        ou,
        pe,
    })
    return (numeratorValue / denominatorValue) * 100 // the value must be a percentage as externalData is assumed to be percentage
}

const isDivergent3a = ({ score, criteria }) =>
    score < 1 - criteria / 100 || score > 1 + criteria / 100

export const calculateSection3 = ({
    section3Response,
    mappedConfiguration,
    currentPeriod,
    overallOrgUnit,
}) => {
    const formattedResponseOverall = convertAnalyticsResponseToObject({
        ...section3Response[OVERALL_RESPONSE_NAME],
    })
    const overallMetadata =
        section3Response[OVERALL_RESPONSE_NAME].metaData.items

    const currentPeriodID = currentPeriod.id

    const externalRelationsResponsesIndices =
        section3Response[EXTERNAL_RELATIONS_INDICES_WITH_BY_LEVEL_DATA]

    // section 3a must be calculated for each external relation
    const section3a = mappedConfiguration.externalRelations.map(
        (relation, originalIndex) => {
            // get overall information
            const surveyValue = getVal({
                response: formattedResponseOverall,
                dx: relation.externalData,
                ou: overallOrgUnit,
                pe: currentPeriodID,
            })
            const routineValue = getRoutineValue({
                relation,
                response: formattedResponseOverall,
                ou: overallOrgUnit,
                pe: currentPeriodID,
            })

            const section3aItem = {
                name: relation.name,
                level: relation.level,
                qualityThreshold: relation.criteria,
                surveyValue: getRoundedValue(surveyValue, 1),
                routineValue: getRoundedValue(routineValue, 1),
                overallScore: getRoundedValue(
                    (routineValue / surveyValue) * 100,
                    1
                ),
                divergentSubOrgUnits: {},
                chartInfo: {
                    name: relation.name,
                    type: SINGLE_ORG_UNITS_CHART_TYPE, // default
                    values: [
                        {
                            name: overallMetadata[overallOrgUnit]?.name,
                            survey: getRoundedValue(surveyValue, 1),
                            routine: getRoundedValue(routineValue, 1),
                            divergent: isDivergent3a({
                                score: routineValue / surveyValue,
                                criteria: relation.criteria,
                            }),
                        },
                    ],
                },
            }

            // then calculate the divergence on subOrgUnits
            // this only calculable if a byLevel request was possible for the external relation
            if (!externalRelationsResponsesIndices.includes(originalIndex)) {
                return section3aItem
            }

            const correspondingIndex =
                externalRelationsResponsesIndices.indexOf(originalIndex)
            const individualResponse =
                section3Response[BY_LEVEL_RESPONSE_NAME][correspondingIndex]
            const levelMetadata = individualResponse.metaData.items
            const subOrgUnits = individualResponse.metaData.dimensions.ou
            const formattedIndividualResponse =
                convertAnalyticsResponseToObject({
                    ...individualResponse,
                })

            // if one of the DEs is missing from the response data, the values are not calculable
            const requiredDEs = [
                relation.externalData,
                relation.denominator,
                relation.numerator,
            ]

            if (
                !requiredDEs.every((uid) =>
                    Object.keys(formattedIndividualResponse).includes(uid)
                )
            ) {
                return section3aItem
            }

            // if we have gotten here, we can theoretically calculate values and chart is multi-orgunit
            section3aItem.chartInfo.type = MULTIPLE_ORG_UNITS_CHART_TYPE

            const divergentSubOrgUnits = []
            const invalidSubOrgUnits = []
            for (const subOrgUnit of subOrgUnits) {
                const surveyValueSubOrgUnit = getVal({
                    response: formattedIndividualResponse,
                    dx: relation.externalData,
                    ou: subOrgUnit,
                    pe: currentPeriodID,
                })
                const routineValueSubOrgUnit = getRoutineValue({
                    relation,
                    response: formattedIndividualResponse,
                    ou: subOrgUnit,
                    pe: currentPeriodID,
                })
                const scoreSubOrgUnit =
                    surveyValueSubOrgUnit / routineValueSubOrgUnit

                const subOrgUnitIsDivergent = isDivergent3a({
                    score: scoreSubOrgUnit,
                    criteria: relation.criteria,
                })
                if (subOrgUnitIsDivergent) {
                    divergentSubOrgUnits.push(subOrgUnit)
                }

                const subOrgUnitChartInfo = {
                    name: levelMetadata[subOrgUnit]?.name,
                    survey: getRoundedValue(surveyValueSubOrgUnit, 1),
                    routine: getRoundedValue(routineValueSubOrgUnit, 1),
                    divergent: subOrgUnitIsDivergent,
                }

                if (isNaN(scoreSubOrgUnit)) {
                    invalidSubOrgUnits.push(subOrgUnit)
                    subOrgUnitChartInfo.invalid = true
                }

                section3aItem.chartInfo.values.push(subOrgUnitChartInfo)
            }

            section3aItem.chartInfo.values = sortArrayAfterIndex1(
                section3aItem.chartInfo.values
            )

            return {
                ...section3aItem,
                divergentSubOrgUnits: {
                    number: divergentSubOrgUnits.length,
                    percentage: getRoundedValue(
                        (divergentSubOrgUnits.length /
                            Math.max(1, subOrgUnits.length)) *
                            100,
                        1
                    ),
                    names: divergentSubOrgUnits
                        .map((ouID) => levelMetadata[ouID]?.name)
                        .sort()
                        .join(', '),
                    noncalculable: invalidSubOrgUnits
                        .map((ouID) => levelMetadata[ouID]?.name)
                        .sort()
                        .join(', '),
                },
            }
        }
    )

    return {
        section3a,
    }
}