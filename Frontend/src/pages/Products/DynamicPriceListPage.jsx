import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import DynamicPriceList from '../../components/ProductAdding/DynamicPriceList.jsx'
const DynamicPriceListPage = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <DynamicPriceList/>
            </div>

        </div>
  )
}

export default DynamicPriceListPage
