import React from 'react'
import AddNewSale from '../../components/Sales/AddNewSale.jsx'
import Sidebar from '../../components/Sidebar.jsx'
import SideMenus from '../../components/SideMenus.jsx'

const NewSale = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <AddNewSale/>
            </div>

        </div>
    )
}

export default NewSale
