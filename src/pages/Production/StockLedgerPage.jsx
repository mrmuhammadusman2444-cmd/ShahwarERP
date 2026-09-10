import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import StockLedger from '../../components/Production/StockLedger.jsx'
const StockLedgerPage = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <StockLedger />
            </div>

        </div>
  )
}

export default StockLedgerPage
