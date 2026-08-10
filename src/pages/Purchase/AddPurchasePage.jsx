import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import AddPurchase from '../../components/Purchase/AddPurchase.jsx'
const AddPurchasePage = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <AddPurchase />
            </div>

        </div>
  )
}

export default AddPurchasePage
