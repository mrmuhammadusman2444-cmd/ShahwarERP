import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import SupplierReciept from '../../components/Report/SupplierReciept.jsx'
const SupplierRecieptPage = () => {
  return (
    <div className='flex h-screen overflow-hidden'>

            <Sidebar />
            <div className='flex-1 overflow-y-auto'>
                <SupplierReciept/>
            </div>

        </div>
  )
}

export default SupplierRecieptPage
