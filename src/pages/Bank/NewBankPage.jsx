import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import NewBank from '../../components/Bank/NewBank.jsx'
const NewBankPage = () => {
  return (
  <div className='flex'>

      <Sidebar />
      <div className='flex-1'>
        <NewBank />
      </div>
    </div>
  )
}

export default NewBankPage
