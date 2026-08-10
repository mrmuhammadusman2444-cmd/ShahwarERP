import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import SchemeReport from '../../components/Scheme Report/SchemeReport.jsx'

const SchemeReportPage = () => {
  return (
    <div className='flex'>
            <Sidebar />
            <div className='flex-1'>
                <SchemeReport />

            </div>

        </div>
  )
}

export default SchemeReportPage
