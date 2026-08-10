import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import MainCategory from '../../components/ProductAdding/MainCategory'

const MainCategoryPage = () => {
  return (
      <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <MainCategory />
            </div>

        </div>
  )
}

export default MainCategoryPage
