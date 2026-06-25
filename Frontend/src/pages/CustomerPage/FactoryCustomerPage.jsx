import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import FactoryCustomer from '../../components/Customer/FactoryCustomer.jsx'



const FactoryCustomerPage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <FactoryCustomer />

            </div>
        </div>
    )
}

export default FactoryCustomerPage
