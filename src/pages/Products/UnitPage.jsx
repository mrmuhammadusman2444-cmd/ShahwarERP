import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import Unit from '../../components/ProductAdding/Unit.jsx'

const UnitPage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <Unit />
            </div>

        </div>
    )
}

export default UnitPage
