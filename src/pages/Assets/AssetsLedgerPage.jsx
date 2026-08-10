import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import AssetsLedger from '../../components/Assets/AssetsLedger.jsx'
const AssetsLedgerPage = () => {
  return (
      <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
           <AssetsLedger/>

            </div>
        </div>
  )
}

export default AssetsLedgerPage
