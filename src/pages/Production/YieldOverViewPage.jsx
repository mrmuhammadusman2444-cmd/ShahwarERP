import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import YieldOverView from '../../components/Production/YieldOverView.jsx'
const YieldOverViewPage = () => {
  return (
  <div className='flex h-screen overflow-hidden'>

            <Sidebar />
            <div className='flex-1 overflow-y-auto'>
               <YieldOverView />
            </div>

        </div>
  )
}

export default YieldOverViewPage
