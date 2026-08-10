import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import OutOfStock from '../../components/Stock/OutOfStock.jsx'
const OutOfStockPage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <OutOfStock />
            </div>

        </div>
    )
}

export default OutOfStockPage
