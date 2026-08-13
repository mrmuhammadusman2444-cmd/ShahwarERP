import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import EmployeeAdvanceSalary from '../../components/Salary/EmployeeAdvanceSalary.jsx'
const EmployeeAdvanceSalaryPage = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
               <EmployeeAdvanceSalary/>
            </div>

        </div>
  )
}

export default EmployeeAdvanceSalaryPage
