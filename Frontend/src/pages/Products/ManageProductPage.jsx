import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ManageProduct from '../../components/ProductAdding/ManageProduct.jsx'

const ManageProductPage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ManageProduct />

            </div>
        </div>
    )
}

export default ManageProductPage
