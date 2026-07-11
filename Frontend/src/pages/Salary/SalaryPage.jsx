import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import Salary from '../../components/Salary/Salary.jsx'
const SalaryPage = () => {
    return (
          <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
               <Salary/>
            </div>

        </div>
    )
}

export default SalaryPage
