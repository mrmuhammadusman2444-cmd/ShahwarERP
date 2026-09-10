import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import CashBook from '../../components/Cash & Bank/CashBook.jsx'



const CashPage = () => {
  return (
    <div className='flex h-screen overflow-hidden'>

      <Sidebar />
      <div className='flex-1 overflow-y-auto'>
        <CashBook/>
      </div>
    </div>
  )
}

export default CashPage
