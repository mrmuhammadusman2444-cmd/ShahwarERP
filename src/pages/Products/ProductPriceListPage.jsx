import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ProductPriceLlist from '../../components/ProductAdding/ProductPriceLlist.jsx'
const ProductPriceListPage = () => {
  return (
   <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ProductPriceLlist/>

            </div>
        </div>
  )
}

export default ProductPriceListPage
