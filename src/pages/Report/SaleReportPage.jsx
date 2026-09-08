import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import SaleReport from '../../components/Report/SaleReport.jsx'
const SaleReportPage = () => {
  return (
    <div className='flex h-screen overflow-hidden'>

      <Sidebar />
      <div className='flex-1 overflow-y-auto'>
        <SaleReport />
      </div>

    </div>
  )
}

export default SaleReportPage
