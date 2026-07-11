import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import RawMaterialStock from '../../components/Stock/RawMaterialStock.jsx'
const RawMaterialStockPage = () => {
  return (
     <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <RawMaterialStock />
            </div>

        </div>
  )
}

export default RawMaterialStockPage
