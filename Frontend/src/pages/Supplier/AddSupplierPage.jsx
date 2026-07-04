import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import AddSupplier from '../../components/Supplier/AddSupplier.jsx'

const SupplierPage = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <AddSupplier />
            </div>

        </div>
  )
}

export default SupplierPage
