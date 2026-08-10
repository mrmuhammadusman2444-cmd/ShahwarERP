import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ManagePurchaseOrder from '../../components/Purchase/ManagePurchaseOrder.jsx'


const ManagePurchaseOrderPage = () => {
  return (
     <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ManagePurchaseOrder />
            </div>

        </div>
  )
}

export default ManagePurchaseOrderPage
