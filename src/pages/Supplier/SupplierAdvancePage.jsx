import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import SupplierAdvance from '../../components/Supplier/SupplierAdvance.jsx'

const SupplierAdvancePage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <SupplierAdvance />
            </div>

        </div>
    )
}

export default SupplierAdvancePage
