import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import SupplierReciept from '../../components/Report/SupplierReciept.jsx'
const SupplierRecieptPage = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <SupplierReciept/>
            </div>

        </div>
  )
}

export default SupplierRecieptPage
