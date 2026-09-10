import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ProductionOrders from '../../components/Production/ProductionOrders.jsx'
const ProductionOrdersPage = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ProductionOrders />
            </div>

        </div>
  )
}

export default ProductionOrdersPage
