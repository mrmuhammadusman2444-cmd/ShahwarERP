import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import NewCustomer from '../../components/Customer/NewCustomer.jsx'

const NewProduct = () => {
  return (
    <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <NewCustomer/>
            </div>

        </div>
  )
}

export default NewProduct
