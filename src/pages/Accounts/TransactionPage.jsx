import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import Transaction from '../../components/Accounts/Transaction.jsx'
const FundTransferPage = () => {
  return (
   <div className='flex h-screen overflow-hidden'>

      <Sidebar />
      <div className='flex-1 overflow-y-auto'>
     <Transaction/>
      </div>
    </div>
  )
}

export default FundTransferPage