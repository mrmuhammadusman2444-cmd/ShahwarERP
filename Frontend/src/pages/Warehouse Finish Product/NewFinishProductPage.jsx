import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import NewFinishProduct from '../../components/Warehouse finish Product/NewFinishProduct.jsx'
const NewFinishProductPage = () => {
  return (
    <div className='flex'>

      <Sidebar />
      <div className='flex-1'>
        <NewFinishProduct />
      </div>

    </div>
  )
}

export default NewFinishProductPage
