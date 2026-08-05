import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ManageAllCustomer from '../../components/Customer/ManageAllCustomer.jsx'




const ManageCustomer = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1 '>
                <ManageAllCustomer />

            </div>
        </div>
    )
}

export default ManageCustomer
