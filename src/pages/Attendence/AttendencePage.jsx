import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import Attendence from '../../components/Attendence/Attendence.jsx'
const AttendencePage = () => {
    return (
        <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <Attendence />
            </div>

        </div>
    )
}

export default AttendencePage
