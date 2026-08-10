import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import CustomerAdvance from '../../components/Customer/CustomerAdvance.jsx'

const CustomerAdvancePage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
           <CustomerAdvance/>

            </div>
        </div>
    )
}

export default CustomerAdvancePage
