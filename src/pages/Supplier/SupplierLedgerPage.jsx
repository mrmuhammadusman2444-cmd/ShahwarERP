import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import SupplierLedger from '../../components/Supplier/SupplierLedger.jsx'

const SupplierLedgerPage = () => {
  return (
     <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <SupplierLedger />
            </div>

        </div>
  )
}

export default SupplierLedgerPage
