import React from 'react'
import MainDashboard from '../../components/Dashboard/MainDashboard.jsx'
import Sidebar from '../../components/Sidebar.jsx'

const NewProduct = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <MainDashboard />
            </div>

        </div>
    )
}

export default NewProduct
