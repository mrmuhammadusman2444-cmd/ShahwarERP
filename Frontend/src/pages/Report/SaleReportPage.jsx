import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import SaleReport from '../../components/Report/SaleReport.jsx'
const SaleReportPage = () => {
  return (
     <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <SaleReport />
            </div>

        </div>
  )
}

export default SaleReportPage
