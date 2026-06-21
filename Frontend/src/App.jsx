import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration.jsx'
import Login from './pages/Login.jsx'
import Sidebar from './components/Sidebar.jsx'
import Home from './pages/Home.jsx'
import { ToastContainer } from 'react-toastify'



const App = () => {
  return (
    <BrowserRouter>
       <ToastContainer />

          <Routes>
            <Route path='/' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
          
          </Routes>
        
     
    </BrowserRouter>
  )
}

export default App