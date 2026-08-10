import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ManageAssets from '../../components/Assets/ManageAssets.jsx'

const ManageAssetsPage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ManageAssets />

            </div>
        </div>
    )
}

export default ManageAssetsPage
