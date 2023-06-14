/*
Author: Joseph MANZI
Company: HISP Rwanda
Date: May, 30 2023
The page used to present the user interface for the user to manage the reports
*/

// Import of key features 

import {useState} from 'react'
import React from 'react'
import MenuBar from '../../components/menu-bar/MenuBar'
import './style/report.css'
import { resources } from '../../assets/str-resources/report-section'
import { Button } from '@dhis2/ui'
import { DataSetModal } from '../../components/annual-report/modal/data-sets/DataSetModal'

// End of imports

// Start of the functional component definition
const Report = () => {

  // Hook for managing data set modals
  let [dataSetModalStatus, setDataSetModalStatus] = useState(false)
  // End of hook for managing data set modals

  return (
    <div className='reportContainer'>
      <MenuBar />
      <DataSetModal status={dataSetModalStatus} changeDataModalStatus = {setDataSetModalStatus}/>
        <div className='topParagraph'>
          <p>{resources.report_title}</p>
        </div>

        <div className='report-container'>
          <div className='data-container'>
            <a href='#data-parent' className='first-anchor title'>Data</a>
            <div className='data-below' id='data-parent'>
              <div className='data-section-child'>
                  <Button name="basic_button" onClick={() => setDataSetModalStatus(false) } value="default" className='button'>
                    <span>Choose Data</span>
                  </Button>
              </div>
            </div>
          </div>
          <div className='period-container'>
            <a href='#period-parent' className='period-anchor title'>Period</a>
            <div id='period-parent'>
              <div className='data-section-child'>
                  <Button name="basic_button" onClick={() => {} } value="default" className='button'>
                    <span>Choose Period</span>
                  </Button>
              </div>
            </div>
          </div>
          <div className='orgunit-container'>
            <a href='#orgunit-parent' className='orgunit-anchor title'>Organization Unit</a>
            <div id='orgunit-parent'>
            <div className='data-section-child'>
                  <Button name="basic_button" onClick={() => {} } value="default" className='button'>
                    <span>Choose Organization Unit</span>
                  </Button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Report