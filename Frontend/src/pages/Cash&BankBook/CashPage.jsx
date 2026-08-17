import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import CashBook from '../../components/Cash & Bank/CashBook.jsx'



const CashPage = () => {
  return (
    <div className='flex'>

      <Sidebar />
      <div className='flex-1'>
        <CashBook/>
      </div>
    </div>
  )
}

export default CashPage
