import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ProductionOrders from '../../components/Production/ProductionOrders.jsx'
const ProductionOrdersPage = () => {
  return (
    <div className='flex h-screen overflow-hidden'>

            <Sidebar />
            <div className='flex-1 overflow-auto'>
                <ProductionOrders />
            </div>

        </div>
  )
}

export default ProductionOrdersPage
