import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import TeaStock from '../../components/Stock/TeaStock.jsx'
const TeaStockPage = () => {
  return (
      <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <TeaStock />
            </div>

        </div>
  )
}

export default TeaStockPage
