import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ManagePurchase from '../../components/Purchase/ManagePurchase.jsx'


function ManagePurchasePage() {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ManagePurchase />
            </div>

        </div>
    )
}

export default ManagePurchasePage
