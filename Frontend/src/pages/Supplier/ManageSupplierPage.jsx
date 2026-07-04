import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ManageSupplier from '../../components/Supplier/ManageSupplier.jsx'






const ManageSupplierPage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ManageSupplier />
            </div>

        </div>
    )
}

export default ManageSupplierPage
