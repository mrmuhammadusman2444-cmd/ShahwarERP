import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import BankLedger from '../../components/Bank/BankLedger.jsx'

const BankLedgerPage = () => {
  return (
   <div className='flex'>

      <Sidebar />
      <div className='flex-1'>
        <BankLedger />
      </div>
    </div>
  )
}

export default BankLedgerPage
