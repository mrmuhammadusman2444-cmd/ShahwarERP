import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration.jsx'
import Login from './pages/Login.jsx'
import Sidebar from './components/Sidebar.jsx'
import Home from './pages/Home.jsx'
import { ToastContainer } from 'react-toastify'
import NewSale from './pages/Sales Section/NewSale.jsx'
import ManageSale from './pages/Sales Section/ManageSale.jsx'
import NewProduct from './pages/Products/NewProduct.jsx'
import NewCustomerAdding from './pages/CustomerPage/NewCustomerAdding.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import ManageCustomer from './pages/CustomerPage/ManageCustomer.jsx'
import FactoryCustomer from './pages/CustomerPage/FactoryCustomerPage.jsx'
import CustomerLedgerPage from './pages/CustomerPage/CustomerLedgerPage.jsx'
import CustomerAdvancePage from './pages/CustomerPage/CustomerAdvancePage.jsx'
import NewOrdersPage from './pages/Orders/NewOrdersPage.jsx'
import ManageOrdersPage from './pages/Orders/ManageOrdersPage.jsx'
import OrderReportPage from './pages/Orders/OrderReportPage.jsx'

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
        <Route path='/newCustomer' element={<NewCustomerAdding />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/manageCustomer' element={<ManageCustomer />} />
        <Route path='/factoryCustomer' element={<FactoryCustomer />} />
        <Route path='/CustomerLedgerPage' element={<CustomerLedgerPage />} />
        <Route path='/CustomerAdvancePage' element={<CustomerAdvancePage />} />
        <Route path='/NewOrdersPage' element={<NewOrdersPage />} />
        <Route path='/ManageOrdersPage' element={<ManageOrdersPage />} />
        <Route path='/OrderReportPage' element={<OrderReportPage />} />






      </Routes>

    </BrowserRouter>
  )
}

export default App