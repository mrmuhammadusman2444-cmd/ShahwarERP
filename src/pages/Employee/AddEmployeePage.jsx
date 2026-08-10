import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import AddEmployee from '../../components/Employee/AddEmployee.jsx'
const AddEmployeePage = () => {
  return (
   <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <AddEmployee/>
            </div>

        </div>
  )
}

export default AddEmployeePage
