import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import Manageitem from '../../components/Production/Manageitem.jsx'
const ManageItemPage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <Manageitem />
            </div>

        </div>
    )
}

export default ManageItemPage
