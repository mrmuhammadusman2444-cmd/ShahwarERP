import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import AddPurchaseOrder from '../../components/Purchase/AddPurchaseOrder.jsx'
const AddPurchaseOrderPage = () => {
  return (
    <div className='flex'>

      <Sidebar />
      <div className='flex-1'>
        <AddPurchaseOrder />
      </div>

    </div>
  )
}

export default AddPurchaseOrderPage
