import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import CustomerLedger  from '../../components/Customer/CustomerLedger.jsx'



const CustomerLedgerPage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
             <CustomerLedger/>
             
            </div>
        </div>
    )
}

export default CustomerLedgerPage
