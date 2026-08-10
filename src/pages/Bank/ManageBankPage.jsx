import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ManageBank from '../../components/Bank/ManageBank.jsx'

const ManageBankPage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ManageBank />
            </div>
        </div>
    )
}

export default ManageBankPage
