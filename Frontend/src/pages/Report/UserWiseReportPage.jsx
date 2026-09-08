import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import UserWiseReport from '../../components/Report/UserWiseReport.jsx'
const UserWiseReportPage = () => {
  return (
     <div className='flex h-screen overflow-hidden'>

            <Sidebar />
            <div className='flex-1 overflow-y-auto'>
                <UserWiseReport/>
            </div>

        </div>
  )
}

export default UserWiseReportPage
