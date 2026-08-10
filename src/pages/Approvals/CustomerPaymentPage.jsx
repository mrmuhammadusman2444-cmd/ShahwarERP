import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import CustomerPayment from '../../components/Approvals/CustomerPayment.jsx'

const CustomerPaymentPage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <CustomerPayment/>
            </div>
        </div>
    )
}

export default CustomerPaymentPage
