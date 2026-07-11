import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import FinishStock from '../../components/Stock/FinishStock.jsx'
const FinishStockPage = () => {
  return (
     <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <FinishStock/>
            </div>

        </div>
  )
}

export default FinishStockPage
