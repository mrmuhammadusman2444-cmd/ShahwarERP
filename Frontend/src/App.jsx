import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration.jsx'
import Login from './pages/Login.jsx'
import Sidebar from './components/Sidebar.jsx'
import Home from './pages/Home.jsx'
import { ToastContainer } from 'react-toastify'
import NewSale from './pages/Sales Section/NewSale.jsx'
import ManageSale from './pages/Sales Section/ManageSale.jsx'
import NewProduct from './pages/Products/NewProduct.jsx'



const App = () => {
  return (
    <BrowserRouter>
       <ToastContainer />

          <Routes>
            <Route path='/' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/newSale' element={<NewSale />} />
            <Route path='/manageSale' element={<ManageSale />} />
            <Route path='/newProduct' element={<NewProduct />} />



          
          </Routes>
        
     
    </BrowserRouter>
  )
}

export default App