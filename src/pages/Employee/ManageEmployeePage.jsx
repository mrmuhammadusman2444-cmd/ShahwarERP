import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ManageEmployee from '../../components/Employee/ManageEmployee.jsx'



const ManageEmployeePage = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ManageEmployee />
            </div>

        </div>
  )
}

export default ManageEmployeePage
