import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import SupplierPaymentApproval from '../../components/Approvals/SupplierPaymentApproval.jsx'
const SupplierPaymentApprovalPage = () => {
    return (
        <div className='flex h-screen overflow-hidden'>

            <Sidebar />
            <div className='flex-1 overflow-y-auto'>
                <SupplierPaymentApproval />
            </div>
        </div>
    )
}

export default SupplierPaymentApprovalPage
