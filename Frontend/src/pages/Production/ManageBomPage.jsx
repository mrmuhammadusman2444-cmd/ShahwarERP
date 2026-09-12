import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ManageBom from '../../components/Production/ManageBom.jsx'
const ManageBomPage = () => {
  return (
     <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ManageBom />
            </div>

        </div>
  )
}

export default ManageBomPage
