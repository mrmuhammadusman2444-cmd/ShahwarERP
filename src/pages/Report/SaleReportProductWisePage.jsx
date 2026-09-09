import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import SaleReportProductWise from '../../components/Report/SaleReportProductWise.jsx'



const SaleReportProductWisePage = () => {
    return (
        <div className='flex h-screen overflow-hidden'>
            <Sidebar />
            <div className='flex-1 overflow-y-auto'>
                <SaleReportProductWise />
            </div>

        </div>
    )
}

export default SaleReportProductWisePage
