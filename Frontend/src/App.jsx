import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration.jsx'
import Login from './pages/Login.jsx'
import Sidebar from './components/Sidebar.jsx'
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
import DispatchOrderPage from './pages/Orders/DispatchOrderPage.jsx'
import ManageProductPage from './pages/Products/ManageProductPage.jsx'
import ProductCategoryPage from './pages/Products/ProductCategoryPage.jsx'
import UnitPage from './pages/Products/UnitPage.jsx'
import MainCategoryPage from './pages/Products/MainCategoryPage.jsx'
import SchemeProductsPage from './pages/Products/SchemeProductsPage.jsx'
import InvoiceApprovalPage from './pages/Approvals/InvoiceApprovalPage.jsx'
import PurchaseApprovalPage from './pages/Approvals/PurchaseApprovalPage.jsx'
import CustomerPaymentPage from './pages/Approvals/CustomerPaymentPage.jsx'
import SupplierPaymentPage from './pages/Approvals/SupplierPaymentPage.jsx'
import AnalyticsPage from './pages/Analytics/AnalyticsPage.jsx'
import AddSupplierPage from './pages/Supplier/AddSupplierPage.jsx'
import SupplierLedgerPage from './pages/Supplier/SupplierLedgerPage.jsx'
import ManageSupplierPage from './pages/Supplier/ManageSupplierPage.jsx'
import SupplierAdvancePage from './pages/Supplier/SupplierAdvancePage.jsx'
import AddPurchasePage from './pages/Purchase/AddPurchasePage.jsx'
import ManagePurchasePage from './pages/Purchase/ManagePurchasePage.jsx'
import AddPurchaseOrderPage from './pages/Purchase/AddPurchaseOrderPage.jsx'
import ManagePurchaseOrderPage from './pages/Purchase/ManagePurchaseOrderPage.jsx'
import NewFinishProductPage from './pages/Warehouse Finish Product/NewFinishProductPage.jsx'
import ManageFinishProductPage from './pages/Warehouse Finish Product/ManageFinishProductPage.jsx'
import FinishStockPage from './pages/Warehouse Finish Product/FinishStockPage.jsx'
import SchemeReportPage from './pages/Scheme Report/SchemeReportPage.jsx'
import WarehouseSchemeReportPage from './pages/Scheme Report/WarehouseSchemeReportPage.jsx'
import ReturnPage from './pages/Return/ReturnPage.jsx'
import ManageReturnPage from './pages/Return/ManageReturnPage.jsx'
import ManageDistributorOrderPage from './pages/Distributor Order/ManageDistributorOrderPage.jsx'
import NewBankPage from './pages/Bank/NewBankPage.jsx'
import AddNewTransactionPage from './pages/Bank/AddNewTransactionPage.jsx'
import ManageBankPage from './pages/Bank/ManageBankPage.jsx'
import BankLedgerPage from './pages/Bank/BankLedgerPage.jsx'
//Salary
import SalaryPage from './pages/Salary/SalaryPage.jsx'
//Attendence
import AttendencePage from './pages/Attendence/AttendencePage.jsx'
import AttendenceReportPage from './pages/Attendence/AttendenceReportPage.jsx'
//Employee
import AddEmployeePage from './pages/Employee/AddEmployeePage.jsx'
import ManageEmployeePage from './pages/Employee/ManageEmployeePage.jsx'
import ManageEmployeeSalaryPage from './pages/Employee/ManageEmployeeSalaryPage.jsx'
//Assets
import AddAssetPage from './pages/Assets/AddAssetPage.jsx'
import ManageAssetsPage from './pages/Assets/ManageAssetsPage.jsx'
import AssetsLedgerPage from './pages/Assets/AssetsLedgerPage.jsx'
//Stock
import StockPage from './pages/Stock/StockPage.jsx'
import RawMaterialStockPage from './pages/Stock/RawMaterialStockPage.jsx'
import ReelStockPage from './pages/Stock/ReelStockPage.jsx'
import BeverageStockPage from './pages/Stock/BeverageStockPage.jsx'
import TeaStockPage from './pages/Stock/TeaStockPage.jsx'
import RawPackingStockPage from './pages/Stock/RawPackingStockPage.jsx'
import OutOfStockPage from './pages/Stock/OutOfStockPage.jsx'
import AssignUserToStockPage from './pages/Stock/AssignUserToStockPage.jsx'




const App = () => {
  return (
    <BrowserRouter>

      <ToastContainer />

      <Routes>
        //authentication
        <Route path='/' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        //Sales
        <Route path='/newSale' element={<NewSale />} />
        <Route path='/manageSale' element={<ManageSale />} />
        //Products
        <Route path='/newProduct' element={<NewProduct />} />
        <Route path='/newCustomer' element={<NewCustomerAdding />} />
        //Dashboard
        <Route path='/Dashboard' element={<Dashboard />} />
        //Customer
        <Route path='/manageCustomer' element={<ManageCustomer />} />
        <Route path='/factoryCustomer' element={<FactoryCustomer />} />
        <Route path='/CustomerLedgerPage' element={<CustomerLedgerPage />} />
        <Route path='/CustomerAdvancePage' element={<CustomerAdvancePage />} />
        //Orders
        <Route path='/NewOrdersPage' element={<NewOrdersPage />} />
        <Route path='/ManageOrdersPage' element={<ManageOrdersPage />} />
        <Route path='/OrderReportPage' element={<OrderReportPage />} />
        <Route path='/DispatchOrderPage' element={<DispatchOrderPage />} />
        <Route path='/ManageProductPage' element={<ManageProductPage />} />
        //products
        <Route path='/ProductCategoryPage' element={<ProductCategoryPage />} />
        <Route path='/UnitPage' element={<UnitPage />} />
        <Route path='/MainCategoryPage' element={<MainCategoryPage />} />
        <Route path='/SchemeProductsPage' element={<SchemeProductsPage />} />
        <Route path='/InvoiceApprovalPage' element={<InvoiceApprovalPage />} />
        <Route path='/PurchaseApprovalPage' element={<PurchaseApprovalPage />} />
        <Route path='/CustomerPaymentPage' element={<CustomerPaymentPage />} />
        <Route path='/SupplierPaymentPage' element={<SupplierPaymentPage />} />
        <Route path='/addSupplierPage' element={<AddSupplierPage />} />
        <Route path='/addSupplierPage' element={<AddSupplierPage />} />
        <Route path='/SupplierLedgerPage' element={<SupplierLedgerPage />} />
        <Route path='/ManageSupplierPage' element={<ManageSupplierPage />} />
        <Route path='/SupplierAdvancePage' element={<SupplierAdvancePage />} />
        <Route path='/Analytics' element={<AnalyticsPage />} />
        <Route path='/AddPurchasePage' element={<AddPurchasePage />} />
        <Route path='/ManagePurchasePage' element={<ManagePurchasePage />} />
        <Route path='/AddPurchaseOrderPage' element={<AddPurchaseOrderPage />} />
        <Route path='/ManagePurchaseOrder' element={<ManagePurchaseOrderPage />} />
        <Route path='/NewFinishProductPage' element={<NewFinishProductPage />} />
        <Route path='/ManageFinishProductPage' element={<ManageFinishProductPage />} />
        <Route path='/FinishStock' element={<FinishStockPage />} />
        <Route path='/scheme/report' element={<SchemeReportPage />} />
        <Route path='/warehouse/scheme/report' element={<WarehouseSchemeReportPage />} />
        <Route path='/return' element={<ReturnPage />} />
        <Route path='/manage/return' element={<ManageReturnPage />} />
        <Route path='/manage/distributor/order' element={<ManageDistributorOrderPage />} />
        <Route path='/new/bank' element={<NewBankPage />} />
        <Route path='/add/new/transaction' element={<AddNewTransactionPage />} />
        <Route path='/manage/bank' element={<ManageBankPage />} />
        <Route path='/bank/ledger' element={<BankLedgerPage />} />
        //Salary
        <Route path='/salary' element={<SalaryPage />} />
        //Attendence
        <Route path='/attendence' element={<AttendencePage />} />
        <Route path='/attendence/report' element={<AttendenceReportPage />} />
        //Employee
        <Route path='/add/employee' element={<AddEmployeePage />} />
        <Route path='/manage/employee' element={<ManageEmployeePage />} />
        <Route path='/manage/employee/salary' element={<ManageEmployeeSalaryPage />} />

         //Assets
        <Route path='/assets' element={<AddAssetPage />} />
        <Route path='/manage/assets' element={<ManageAssetsPage />} />
        <Route path='/assets/ledger' element={<AssetsLedgerPage />} />
        //Stock
        <Route path='/finish/stock' element={<StockPage />} />
        <Route path='/raw/material/stock' element={<RawMaterialStockPage />} />
        <Route path='/reel/stock' element={<ReelStockPage />} />
        <Route path='/Beverage/stock' element={<BeverageStockPage />} />
        <Route path='/tea/stock' element={<TeaStockPage />} />
        <Route path='/raw/packing/stock' element={<RawPackingStockPage />} />
        <Route path='/out/of/stock' element={<OutOfStockPage />} />
        <Route path='/assign/user/stock' element={<AssignUserToStockPage />} />
























      </Routes>

    </BrowserRouter>
  )
}

export default App