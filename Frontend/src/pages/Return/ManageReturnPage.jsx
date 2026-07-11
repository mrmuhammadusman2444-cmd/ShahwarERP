import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ManageReturn from '../../components/Return/ManageReturn.jsx'
const ManageReturnPage = () => {
  return (
       <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ManageReturn/>
            </div>

        </div>
  )
}

export default ManageReturnPage
