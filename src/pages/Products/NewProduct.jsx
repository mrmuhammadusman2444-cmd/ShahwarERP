import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import AddNewProduct from '../../components/ProductAdding/AddNewProduct.jsx'

const NewProduct = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <AddNewProduct/>
            </div>

        </div>
  )
}

export default NewProduct
