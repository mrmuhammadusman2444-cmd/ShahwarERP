import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import Analytics from '../../components/Dashboard/Analytics.jsx'

const AnalyticsPage = () => {
  return (
       <div className='flex h-screen overflow-hidden'>

            <Sidebar />
            <div className='flex-1 overflow-y-auto '>
            <Analytics/>
            </div>
        </div>
  )
}

export default AnalyticsPage
