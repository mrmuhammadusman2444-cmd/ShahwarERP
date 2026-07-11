import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ManageEmployeeSalary from '../../components/Employee/ManageEmployeeSalary.jsx'


const ManageEmployeeSalaryPage = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ManageEmployeeSalary />
            </div>

        </div>
  )
}

export default ManageEmployeeSalaryPage
