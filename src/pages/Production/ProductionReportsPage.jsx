import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ProductionReports from '../../components/Production/ProductionReports.jsx'
const ProductionReportsPage = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <ProductionReports />
            </div>

        </div>
  )
}

export default ProductionReportsPage
