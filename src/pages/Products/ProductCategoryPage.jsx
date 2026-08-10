import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'

import ProductCategory from '../../components/ProductAdding/ProductCategory.jsx'

const ProductCategoryPage = () => {
  return (
      <div className='flex'>

            <Sidebar />
            <div className='flex-1'>

            <ProductCategory/>
            </div>

        </div>
  )
}

export default ProductCategoryPage
