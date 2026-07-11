import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import AttendenceReport from '../../components/Attendence/AttendenceReport.jsx'
const AttendenceReportPage = () => {
  return (
     <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <AttendenceReport />
            </div>

        </div>
  )
}

export default AttendenceReportPage
