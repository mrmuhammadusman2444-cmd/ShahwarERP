import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import RawPackingStock from '../../components/Stock/RawPackingStock.jsx'
const RawPackingStockPage = () => {
  return (
     <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <RawPackingStock />
            </div>

        </div>
  )
}

export default RawPackingStockPage
