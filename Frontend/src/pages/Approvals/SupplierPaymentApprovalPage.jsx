import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import SupplierPaymentApproval from '../../components/Approvals/SupplierPaymentApproval.jsx'
const SupplierPaymentApprovalPage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <SupplierPaymentApproval />
            </div>
        </div>
    )
}

export default SupplierPaymentApprovalPage
