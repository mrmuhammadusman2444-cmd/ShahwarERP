import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import AssignUserToStock from '../../components/Stock/AssignUserToStock.jsx'
const AssignUserToStockPage = () => {
  return (
     <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <AssignUserToStock />
            </div>

        </div>
  )
}

export default AssignUserToStockPage
