import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import Transaction from '../../components/Accounts/Transaction.jsx'
const FundTransferPage = () => {
  return (
   <div className='flex'>

      <Sidebar />
      <div className='flex-1'>
     <Transaction/>
      </div>
    </div>
  )
}

export default FundTransferPage
