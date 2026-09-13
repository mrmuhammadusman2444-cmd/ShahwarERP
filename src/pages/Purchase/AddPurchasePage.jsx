import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import AddPurchase from '../../components/Purchase/AddPurchase.jsx'
const AddPurchasePage = () => {
  return (
    <div className='flex h-screen overflow-hidden'>

            <Sidebar />
            <div className='flex-1 overflow-auto'>
                <AddPurchase />
            </div>

        </div>
  )
}

export default AddPurchasePage
