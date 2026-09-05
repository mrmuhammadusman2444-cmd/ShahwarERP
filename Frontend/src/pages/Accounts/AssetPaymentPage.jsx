import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import AssetPayment from '../../components/Accounts/AssetPayment.jsx'
const AssetPaymentPage = () => {
  return (
   <div className='flex h-screen overflow-hidden'>

      <Sidebar />
      <div className='flex-1 overflow-y-auto'>
        <AssetPayment/>
      </div>
    </div>
  )
}

export default AssetPaymentPage
