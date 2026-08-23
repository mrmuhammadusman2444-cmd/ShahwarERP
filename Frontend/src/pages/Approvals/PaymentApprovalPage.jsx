import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import PaymentApproval from '../../components/Approvals/PaymentApproval.jsx'

const PaymentApprovalPage = () => {
  return (
     <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <PaymentApproval/>
            </div>

        </div>
  )
}

export default PaymentApprovalPage
