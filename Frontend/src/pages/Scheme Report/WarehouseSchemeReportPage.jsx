import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import WarehouseSchemeReport from '../../components/Scheme Report/WarehouseSchemeReport.jsx'
const WarehouseSchemeReportPage = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1'>
        <WarehouseSchemeReport />
      </div>

    </div>
  )
}

export default WarehouseSchemeReportPage
