import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import NewItem from '../../components/Production/NewItem.jsx'
const NewItemPage = () => {
  return (
   <div className='flex h-screen overflow-hidden'>

            <Sidebar />
            <div className='flex-1 overflow-y-auto'>
               <NewItem />
            </div>

        </div>
  )
}

export default NewItemPage
