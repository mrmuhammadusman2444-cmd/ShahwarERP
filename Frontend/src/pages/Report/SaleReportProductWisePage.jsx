import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import SaleReportProductWise from '../../components/Report/SaleReportProductWise.jsx'



const SaleReportProductWisePage = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1'>
                <SaleReportProductWise />
            </div>

        </div>
    )
}

export default SaleReportProductWisePage
