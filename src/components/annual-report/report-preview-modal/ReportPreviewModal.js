import {useState, useEffect} from 'react'
import {
    Button,
    ButtonStrip,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
    DataTable,
    TableBody,
    TableHead,
    DataTableRow,
    DataTableColumnHeader,
    DataTableCell
  } from '@dhis2/ui'
import './report-preview-styles.css'
import logo from '../../../assets/images/WHO_logo.png'



const ReportPreviewModal = ({isHidden, onClose, onPrintReport}) => {


  return (
    <Modal onClose={onClose} hide={isHidden} position="middle" fluid>
            <ModalTitle>
                <div className='modal-header'>
                    <div className='modal-image'>
                        <img src={logo} alt="Image" className='logoImage' />
                    </div>
                    <div>
                        WHO Data Quality Annual Report | Rwanda - 2022
                    </div>
                </div>
            </ModalTitle>
            <ModalContent>

                <div class="section-header">
                    <p>SUMMARY</p>
                </div>

                <div class="section-sub-header">
                    <p>Domain 1 - Completeness</p>
                </div>

                <h4>1a: Completeness of facility reporting</h4>
                <p>The percentage of expected reports that have been entered and completed.</p>
                <DataTable>
                    <TableHead>
                        <DataTableRow>
                            <DataTableColumnHeader>Data set</DataTableColumnHeader>
                            <DataTableColumnHeader>Overrall score</DataTableColumnHeader>
                            <DataTableColumnHeader>
                                Province with divergent score
                                
                            </DataTableColumnHeader>
                        </DataTableRow>
                    </TableHead>
                    <TableBody>
                        <DataTableRow>
                            <DataTableCell bordered> A - Hospital Daily Flash Report [ Previous Day ] - Reporting rate </DataTableCell>
                            <DataTableCell bordered>0%</DataTableCell>
                            <DataTableCell bordered>
                                <DataTable>
                                    <DataTableRow>
                                        <DataTableCell bordered>5</DataTableCell>
                                        <DataTableCell bordered>100%</DataTableCell>
                                    </DataTableRow>
                                </DataTable>
                            </DataTableCell>
                            
                        </DataTableRow>
                    </TableBody>
                </DataTable>
                
                <h4>1b: Timeliness of facility reporting</h4>
                <p>The percentage of expected reports that have been entered and completed on time.</p>
                <DataTable>
                    <TableHead>
                        <DataTableRow>
                            <DataTableColumnHeader>Data set</DataTableColumnHeader>
                            <DataTableColumnHeader>Overrall score</DataTableColumnHeader>
                            <DataTableColumnHeader>
                                Province with divergent score
                                
                            </DataTableColumnHeader>
                        </DataTableRow>
                    </TableHead>
                    <TableBody>
                        <DataTableRow>
                            <DataTableCell bordered> A - Hospital Daily Flash Report [ Previous Day ] - Reporting rate </DataTableCell>
                            <DataTableCell bordered>0%</DataTableCell>
                            <DataTableCell bordered>
                                <DataTable>
                                    <DataTableRow>
                                        <DataTableCell bordered>5</DataTableCell>
                                        <DataTableCell bordered>100%</DataTableCell>
                                    </DataTableRow>
                                </DataTable>
                            </DataTableCell>
                        </DataTableRow>
                        <DataTableRow>
                            <DataTableCell bordered> A - Hospital Daily Flash Report [ Previous Day ] - Reporting rate </DataTableCell>
                            <DataTableCell bordered>0%</DataTableCell>
                            <DataTableCell bordered>
                                <DataTable>
                                    <DataTableRow>
                                        <DataTableCell bordered>5</DataTableCell>
                                        <DataTableCell bordered>100%</DataTableCell>
                                    </DataTableRow>
                                </DataTable>
                            </DataTableCell>
                        </DataTableRow>
                    </TableBody>
                </DataTable>
                
                <h4>1c: Completeness of indicator data</h4>
                <p>Reports where values are not missing. If zeros are not stored, zeros are counted as missing.</p>
                <DataTable>
                    <TableHead>
                        <DataTableRow>
                            <DataTableColumnHeader>Data set</DataTableColumnHeader>
                            <DataTableColumnHeader>Overrall score</DataTableColumnHeader>
                            <DataTableColumnHeader>
                                Province with divergent score
                                
                            </DataTableColumnHeader>
                        </DataTableRow>
                    </TableHead>
                    <TableBody>
                        <DataTableRow>
                            <DataTableCell bordered> A - Hospital Daily Flash Report [ Previous Day ] - Reporting rate </DataTableCell>
                            <DataTableCell bordered>0%</DataTableCell>
                            <DataTableCell bordered>
                                <DataTable>
                                    <DataTableRow>
                                        <DataTableCell bordered>5</DataTableCell>
                                        <DataTableCell bordered>100%</DataTableCell>
                                    </DataTableRow>
                                </DataTable>
                            </DataTableCell>
                            
                        </DataTableRow>
                    </TableBody>
                </DataTable>

                <div class="section-sub-header">
                    <p>Domain 2 - Internal consistency</p>
                </div>
                <h4>2a: Extreme outliers.</h4>
                <p>Extreme outliers, using the standard method. Province are counted as divergent if they have one or more extreme outliers for an indicator.</p>
                <DataTable>
                    <TableHead>
                        <DataTableRow>
                            <DataTableColumnHeader>Indicator</DataTableColumnHeader>
                            <DataTableColumnHeader>Overrall score</DataTableColumnHeader>
                            <DataTableColumnHeader>
                                Province with divergent score
                                
                            </DataTableColumnHeader>
                        </DataTableRow>
                    </TableHead>
                    <TableBody>
                        <DataTableRow>
                            <DataTableCell bordered> A - Hospital Daily Flash Report [ Previous Day ] - Reporting rate </DataTableCell>
                            <DataTableCell bordered>0%</DataTableCell>
                            <DataTableCell bordered>
                                <DataTable>
                                    <DataTableRow>
                                        <DataTableCell bordered>5</DataTableCell>
                                        <DataTableCell bordered>100%</DataTableCell>
                                    </DataTableRow>
                                </DataTable>
                            </DataTableCell>
                            
                        </DataTableRow>
                    </TableBody>
                </DataTable>

            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button  secondary onClick={onClose}>
                        Cancel
                    </Button>
                    <Button  primary onClick={onPrintReport}> 
                        Print Report
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
  )
}

export default ReportPreviewModal