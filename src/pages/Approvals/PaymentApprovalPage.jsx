import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import PaymentApproval from '../../components/Approvals/PaymentApproval.jsx'

const PaymentApprovalPage = () => {
  return (
     <div className='flex h-screen overflow-hidden'>

            <Sidebar />
            <div className='flex-1 overflow-y-auto'>
                <PaymentApproval/>
            </div>

        </div>
  )
}

export default PaymentApprovalPage
