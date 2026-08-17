import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import BankBook from '../../components/Cash & Bank/BankBook.jsx'
const BankPage = () => {
  return (
    <div className='flex'>

      <Sidebar />
      <div className='flex-1'>
        <BankBook/>
      </div>
    </div>
  )
}

export default BankPage
