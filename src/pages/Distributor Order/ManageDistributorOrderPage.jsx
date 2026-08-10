import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ManageDistributorOrder from '../../components/Distributor Order/ManageDistributorOrder.jsx'


const ManageDistributorOrderPage = () => {

  return (
    <div className='flex'>

      <Sidebar />
      <div className='flex-1'>
        <ManageDistributorOrder />
      </div>
    </div>
  )
}

export default ManageDistributorOrderPage
