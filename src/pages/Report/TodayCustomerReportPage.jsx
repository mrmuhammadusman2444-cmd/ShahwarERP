import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import TodayCustomerReport from '../../components/Report/TodayCustomerReport.jsx'

const TodayCustomerReportPage = () => {
    return (
        <div className='flex h-screen overflow-hidden'>

            <Sidebar />
            <div className='flex-1 overflow-y-auto'>
                <TodayCustomerReport />
            </div>

        </div>
    )
}

export default TodayCustomerReportPage
