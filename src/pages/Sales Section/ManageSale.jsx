import React from 'react'
import ManagingSales from '../../components/Sales/ManagingSales.jsx'
import Sidebar from '../../components/Sidebar.jsx'
import SideMenus from '../../components/SideMenus.jsx'

const NewSale = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ManagingSales/>
            </div>

        </div>
    )
}

export default NewSale
