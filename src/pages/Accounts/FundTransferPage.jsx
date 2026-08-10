import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import FundTransfer from '../../components/Accounts/FundTransfer.jsx'
const FundTransferPage = () => {
  return (
   <div className='flex'>

      <Sidebar />
      <div className='flex-1'>
     <FundTransfer/>
      </div>
    </div>
  )
}

export default FundTransferPage
