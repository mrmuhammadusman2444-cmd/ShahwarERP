import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import Return from '../../components/Return/Return.jsx'
const ReturnPage = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <Return/>
            </div>

        </div>
  )
}

export default ReturnPage
