import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import SupplierTallyLedger from '../../components/Accounts/SupplierTallyLedger.jsx'
const SupplierTallyLedgerPage = () => {
  return (
     <div className='flex h-screen overflow-hidden'>

      <Sidebar />
      <div className='flex-1 overflow-y-auto'>
     <SupplierTallyLedger />
      </div>
    </div>
  )
}

export default SupplierTallyLedgerPage
