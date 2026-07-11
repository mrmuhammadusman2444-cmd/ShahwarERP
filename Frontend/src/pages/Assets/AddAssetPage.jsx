import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import AddAssets from '../../components/Assets/AddAssets.jsx'

const AddAssetPage = () => {
  return (
   <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
           <AddAssets/>

            </div>
        </div>
  )
}

export default AddAssetPage
