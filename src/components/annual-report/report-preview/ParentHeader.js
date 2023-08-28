import React from 'react'
import './styles/parentheader.css'

export const ParentHeader = ({main_title, sub_title}) => {
    return (
        <div className='parent-header-container'>
            <div className='parent-header-main-title'>
                {main_title}
            </div>
            <div className='parent-header-sub-title'>
                {sub_title} 
            </div>
        </div>
    )
}