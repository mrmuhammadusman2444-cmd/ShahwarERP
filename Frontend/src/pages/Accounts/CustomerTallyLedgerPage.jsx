import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import CustomerTallyLedger from '../../components/Accounts/CustomerTallyLedger.jsx'


const CustomerTallyLedgerPage = () => {
  return (
    <div className='flex h-screen overflow-hidden'>

      <Sidebar />
      <div className='flex-1 overflow-y-auto'>
        <CustomerTallyLedger/>
      </div>
    </div>
  )
}

export default CustomerTallyLedgerPage
