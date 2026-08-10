import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import NewOrder from '../../components/Orders/NewOrder.jsx'


const NewOrdersPage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <NewOrder/>

            </div>
        </div>
    )
}

export default NewOrdersPage
