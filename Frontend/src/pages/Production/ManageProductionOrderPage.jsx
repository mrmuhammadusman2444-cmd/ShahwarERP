import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ManageProductionOrder from '../../components/Production/ManageProductionOrder.jsx'
const ManageProductionOrderPage = () => {
  return (
   <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ManageProductionOrder />
            </div>

        </div>
  )
}

export default ManageProductionOrderPage
