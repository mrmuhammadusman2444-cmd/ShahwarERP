import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import OrderReport from '../../components/Orders/OrderReport.jsx'

const OrderReportPage = () => {
  return (
 <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                 <OrderReport/>
            </div>
        </div>
  )
}

export default OrderReportPage
