import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import SupplierPayment from '../../components/Approvals/SupplierPayment'

const SupplierPaymentPage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <SupplierPayment />
            </div>
        </div>
    )
}

export default SupplierPaymentPage
