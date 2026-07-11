import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import AddNewTransaction from '../../components/Bank/AddNewTransaction.jsx'

const AddNewTransactionPage = () => {
  return (
    <div className='flex'>

      <Sidebar />
      <div className='flex-1'>
        <AddNewTransaction />
      </div>
    </div>
  )
}

export default AddNewTransactionPage
