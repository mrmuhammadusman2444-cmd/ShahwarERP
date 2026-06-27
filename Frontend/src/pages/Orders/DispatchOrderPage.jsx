import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import DispatchOrder from '../../components/Orders/DispatchOrder.jsx'


const DispatchOrderPage = () => {
  return (
    <div className='flex'>

      <Sidebar />
      <div className='flex-1'>
     <DispatchOrder/>
      </div>
    </div>
  )
}

export default DispatchOrderPage
