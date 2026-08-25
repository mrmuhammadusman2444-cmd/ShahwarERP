import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import CashAdjustment from '../../components/Cash & Bank/CashAdjustment.jsx'
const CashAdjustmentPage = () => {
  return (
    <div className='flex h-screen overflow-hidden'>

      <Sidebar />
      <div className='flex-1 overflow-y-auto'>
        <CashAdjustment />
      </div>
    </div>
  )
}

export default CashAdjustmentPage
