import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import LotTracking from '../../components/Production/LotTracking.jsx'

const LotTrackingPage = () => {
  return (
   <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <LotTracking />
            </div>

        </div>
  )
}

export default LotTrackingPage
