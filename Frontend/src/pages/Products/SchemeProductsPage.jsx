import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import SchemeProduct from '../../components/ProductAdding/SchemeProduct.jsx'

const SchemeProductsPage = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <SchemeProduct/>
            </div>

        </div>
  )
}

export default SchemeProductsPage
