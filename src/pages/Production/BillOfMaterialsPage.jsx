import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import BillOfMaterials from '../../components/Production/BillOfMaterials.jsx'
const BillOfMaterialsPage = () => {
  return (
     <div className='flex h-screen overflow-hidden'>

            <Sidebar />
            <div className='flex-1 overflow-auto'>
                <BillOfMaterials />
            </div>

        </div>
  )
}

export default BillOfMaterialsPage
