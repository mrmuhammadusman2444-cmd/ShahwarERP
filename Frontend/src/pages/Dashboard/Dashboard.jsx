import React from 'react'
import MainDashboard from '../../components/Dashboard/MainDashboard.jsx'
import Sidebar from '../../components/Sidebar.jsx'

const NewProduct = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1 min-w-0 overflow-x-auto'>
                <MainDashboard />
            </div>

        </div>
    )
}

export default NewProduct
