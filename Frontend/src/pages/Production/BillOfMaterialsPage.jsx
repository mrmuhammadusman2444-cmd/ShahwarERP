import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import BillOfMaterials from '../../components/Production/BillOfMaterials.jsx'
const BillOfMaterialsPage = () => {
  return (
     <div className='flex'>

            <Sidebar />
            <div className='flex-1'>
                <BillOfMaterials />
            </div>

        </div>
  )
}

export default BillOfMaterialsPage
