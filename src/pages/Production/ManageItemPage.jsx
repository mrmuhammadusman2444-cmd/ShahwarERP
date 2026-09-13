import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import Manageitem from '../../components/Production/Manageitem.jsx'
const ManageItemPage = () => {
    return (
        <div className='flex h-screen overflow-hidden'>

            <Sidebar />
            <div className='flex-1 overflow-auto'>
                <Manageitem />
            </div>

        </div>
    )
}

export default ManageItemPage
