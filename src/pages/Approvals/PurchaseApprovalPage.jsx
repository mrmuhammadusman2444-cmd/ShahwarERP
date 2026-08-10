import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import PurchaseApproval from '../../components/Approvals/PurchaseApproval.jsx'
const PurchaseApprovalPage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <PurchaseApproval />
            </div>
        </div>
    )
}

export default PurchaseApprovalPage
