import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import NewDistOrder from '../../components/Distributor Order/NewDistOrder.jsx'

const NewDistOrderPage = () => {
  return (
     <div className='flex'>

      <Sidebar />
      <div className='flex-1'>
<NewDistOrder/>
      </div>
    </div>
  )
}

export default NewDistOrderPage
