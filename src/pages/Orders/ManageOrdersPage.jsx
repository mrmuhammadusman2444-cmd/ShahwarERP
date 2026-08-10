import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ManageOrder from '../../components/Orders/ManageOrder.jsx'

const ManageOrdersPage = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1 min-w-0'>
            <ManageOrder/>
            </div>
        </div>
  )
}

export default ManageOrdersPage
