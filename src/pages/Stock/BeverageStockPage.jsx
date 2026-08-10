import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import BeverageStock from '../../components/Stock/BeverageStock.jsx'
const BeverageStockPage = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <BeverageStock />
            </div>

        </div>
  )
}

export default BeverageStockPage
