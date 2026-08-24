import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import InvoiceApproval from '../../components/Approvals/InvoiceApproval.jsx'
const InvoiceApprovalPage = () => {
  return (
   <div className='flex h-screen overflow-hidden'>

            <Sidebar />
            <div className='flex-1 overflow-y-auto'>
                <InvoiceApproval />
            </div>

        </div>
  )
}

export default InvoiceApprovalPage
