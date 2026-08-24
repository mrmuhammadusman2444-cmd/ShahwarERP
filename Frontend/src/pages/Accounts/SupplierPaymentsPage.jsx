import React from 'react'
import SupplierPayment from '../../components/Accounts/SupplierPayment.jsx'
import Sidebar from '../../components/Sidebar.jsx'

const SupplierPaymentsPage = () => {
  return (
    <div className='flex h-screen overflow-hidden'>

      <Sidebar />
      <div className='flex-1 overflow-y-auto'>
     <SupplierPayment/>
      </div>
    </div>
  )
}

export default SupplierPaymentsPage
