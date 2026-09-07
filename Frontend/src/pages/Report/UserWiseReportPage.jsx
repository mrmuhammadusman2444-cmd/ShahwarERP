import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import UserWiseReport from '../../components/Report/UserWiseReport.jsx'
const UserWiseReportPage = () => {
  return (
     <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <UserWiseReport/>
            </div>

        </div>
  )
}

export default UserWiseReportPage
