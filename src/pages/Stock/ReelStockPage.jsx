import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ReelStock from '../../components/Stock/ReelStock.jsx'
const ReelStockPage = () => {
  return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ReelStock />
            </div>

        </div>
  )
}

export default ReelStockPage
