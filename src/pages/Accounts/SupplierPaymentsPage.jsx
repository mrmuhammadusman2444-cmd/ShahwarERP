import React from 'react'
import SupplierPayment from '../../components/Accounts/SupplierPayment.jsx'
import Sidebar from '../../components/Sidebar.jsx'

const SupplierPaymentsPage = () => {
  return (
    <div className='flex'>

      <Sidebar />
      <div className='flex-1'>
     <SupplierPayment/>
      </div>
    </div>
  )
}

export default SupplierPaymentsPage
