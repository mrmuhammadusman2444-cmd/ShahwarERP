import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import Inbox from '../../components/Inbox/Inbox.jsx'
const InboxPage = () => {
  return (
     <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <Inbox />
            </div>

        </div>
  )
}

export default InboxPage
