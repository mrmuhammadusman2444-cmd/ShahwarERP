import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ManageFinishProduct from '../../components/Warehouse finish Product/ManageFinishProduct.jsx'

const ManageFinishProductPage = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ManageFinishProduct />
            </div>

        </div>
  )
}

export default ManageFinishProductPage
