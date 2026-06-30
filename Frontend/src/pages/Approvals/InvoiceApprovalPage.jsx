import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import InvoiceApproval from '../../components/Approvals/InvoiceApproval.jsx'
const InvoiceApprovalPage = () => {
  return (
   <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <InvoiceApproval />
            </div>

        </div>
  )
}

export default InvoiceApprovalPage
