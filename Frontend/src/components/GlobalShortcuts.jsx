import { useNavigate, useLocation } from 'react-router-dom'
import useKeyboardShortcuts from '../components/Hooks/useKeyboardShortcuts.js'

const GlobalShortcuts = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname.toLowerCase()

    const shortcuts = [

        { key: 'd', ctrl: true, action: () => navigate('/Dashboard') },
        { key: 'Escape', action: () => navigate(-1) },

        ...(path === '/dashboard' ? [
            { key: '1', alt: true, action: () => navigate('/newSale') },
            { key: '2', alt: true, action: () => navigate('/ManageOrdersPage') },
            { key: '3', alt: true, action: () => navigate('/newProduct') },
            { key: '4', alt: true, action: () => navigate('/newCustomer') },
        ] : []),

        ...(path === '/newsale' ? [
            { key: 's', ctrl: true, action: () => document.getElementById('saveSaleBtn')?.click() },
            { key: 'r', ctrl: true, action: () => document.getElementById('resetSaleBtn')?.click() },
        ] : []),
        ...(path === '/managesale' ? [
            { key: 'n', ctrl: true, action: () => navigate('/newSale') },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
            { key: 'p', ctrl: true, action: () => document.getElementById('printBtn')?.click() },
        ] : []),

        ...(path === '/newproduct' ? [
            { key: 's', ctrl: true, action: () => document.getElementById('saveProductBtn')?.click() },
            { key: 'r', ctrl: true, action: () => document.getElementById('resetProductBtn')?.click() },
        ] : []),
        ...(path === '/manageproductpage' ? [
            { key: 'n', ctrl: true, action: () => navigate('/newProduct') },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search products..."]')?.focus() },
        ] : []),
        ...(path === '/productcategorypage' ? [
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),
        ...(path === '/unitpage' ? [
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),
        ...(path === '/maincategorypage' ? [
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),

        ...(path === '/newcustomer' ? [
            { key: 's', ctrl: true, action: () => document.getElementById('saveCustomerBtn')?.click() },
            { key: 'r', ctrl: true, action: () => document.getElementById('resetCustomerBtn')?.click() },
        ] : []),
        ...(path === '/managecustomer' ? [
            { key: 'n', ctrl: true, action: () => navigate('/newCustomer') },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),
        ...(path === '/factorycustomer' ? [
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),
        ...(path === '/customerledgerpage' ? [
            { key: 'p', ctrl: true, action: () => document.getElementById('printLedgerBtn')?.click() },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[type="date"]')?.focus() },
        ] : []),
        ...(path === '/customeradvancepage' ? [
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),

        ...(path === '/neworderspage' ? [
            { key: 's', ctrl: true, action: () => document.getElementById('saveOrderBtn')?.click() },
            { key: 'r', ctrl: true, action: () => document.getElementById('resetOrderBtn')?.click() },
        ] : []),
        ...(path === '/manageorderspage' ? [
            { key: 'n', ctrl: true, action: () => navigate('/NewOrdersPage') },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
            { key: 'p', ctrl: true, action: () => document.getElementById('printBtn')?.click() },
        ] : []),
        ...(path === '/orderreportpage' ? [
            { key: 'p', ctrl: true, action: () => document.getElementById('printBtn')?.click() },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[type="date"]')?.focus() },
        ] : []),
        ...(path === '/dispatchorderpage' ? [
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),

        ...(path === '/addpurchasepage' ? [
            { key: 's', ctrl: true, action: () => document.getElementById('savePurchaseBtn')?.click() },
            { key: 'r', ctrl: true, action: () => document.getElementById('resetPurchaseBtn')?.click() },
        ] : []),
        ...(path === '/managepurchasepage' ? [
            { key: 'n', ctrl: true, action: () => navigate('/AddPurchasePage') },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),
        ...(path === '/addpurchaseorderpage' ? [
            { key: 's', ctrl: true, action: () => document.getElementById('savePurchaseOrderBtn')?.click() },
        ] : []),
        ...(path === '/managepurchaseorder' ? [
            { key: 'n', ctrl: true, action: () => navigate('/AddPurchaseOrderPage') },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),

        ...(path === '/addsupplierpage' ? [
            { key: 's', ctrl: true, action: () => document.getElementById('saveSupplierBtn')?.click() },
            { key: 'r', ctrl: true, action: () => document.getElementById('resetSupplierBtn')?.click() },
        ] : []),
        ...(path === '/managesupplierpage' ? [
            { key: 'n', ctrl: true, action: () => navigate('/addSupplierPage') },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),
        ...(path === '/supplierledgerpage' ? [
            { key: 'p', ctrl: true, action: () => document.getElementById('printLedgerBtn')?.click() },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[type="date"]')?.focus() },
        ] : []),
        ...(path === '/supplieradvancepage' ? [
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),

        ...(path === '/invoiceapprovalpage' ? [
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),
        ...(path === '/purchaseapprovalpage' ? [
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),
        ...(path === '/customerpaymentpage' ? [
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),
        ...(path === '/supplier/payment/approval' ? [
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),

        ...(path === '/new/bank' ? [
            { key: 's', ctrl: true, action: () => document.getElementById('saveBankBtn')?.click() },
            { key: 'r', ctrl: true, action: () => document.getElementById('resetBankBtn')?.click() },
        ] : []),
        ...(path === '/manage/bank' ? [
            { key: 'n', ctrl: true, action: () => navigate('/new/bank') },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),
        ...(path === '/add/new/transaction' ? [
            { key: 's', ctrl: true, action: () => document.getElementById('saveTransactionBtn')?.click() },
            { key: 'r', ctrl: true, action: () => document.getElementById('resetTransactionBtn')?.click() },
        ] : []),
        ...(path === '/bank/ledger' ? [
            { key: 'p', ctrl: true, action: () => document.getElementById('printLedgerBtn')?.click() },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[type="date"]')?.focus() },
        ] : []),

        ...(path === '/salary' ? [
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
            { key: 'p', ctrl: true, action: () => document.getElementById('printBtn')?.click() },
        ] : []),
        ...(path === '/employee/advance/salary' ? [
            { key: 's', ctrl: true, action: () => document.getElementById('saveAdvanceBtn')?.click() },
        ] : []),
        ...(path === '/manage/employee/salary' ? [
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),

        ...(path === '/add/employee' ? [
            { key: 's', ctrl: true, action: () => document.getElementById('saveEmployeeBtn')?.click() },
            { key: 'r', ctrl: true, action: () => document.getElementById('resetEmployeeBtn')?.click() },
        ] : []),
        ...(path === '/manage/employee' ? [
            { key: 'n', ctrl: true, action: () => navigate('/add/employee') },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),

        ...(path === '/attendence' ? [
            { key: 's', ctrl: true, action: () => document.getElementById('saveAttendenceBtn')?.click() },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[type="date"]')?.focus() },
        ] : []),
        ...(path === '/attendence/report' ? [
            { key: 'p', ctrl: true, action: () => document.getElementById('printBtn')?.click() },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[type="date"]')?.focus() },
        ] : []),

        ...(path === '/assets' ? [
            { key: 's', ctrl: true, action: () => document.getElementById('saveAssetBtn')?.click() },
            { key: 'r', ctrl: true, action: () => document.getElementById('resetAssetBtn')?.click() },
        ] : []),
        ...(path === '/manage/assets' ? [
            { key: 'n', ctrl: true, action: () => navigate('/assets') },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),
        ...(path === '/assets/ledger' ? [
            { key: 'p', ctrl: true, action: () => document.getElementById('printLedgerBtn')?.click() },
        ] : []),

        ...(path === '/finish/stock' || path === '/raw/material/stock' || path === '/reel/stock' ||
            path === '/beverage/stock' || path === '/tea/stock' || path === '/raw/packing/stock' ? [
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
            { key: 'p', ctrl: true, action: () => document.getElementById('printBtn')?.click() },
        ] : []),

        ...(path === '/newfinishproductpage' ? [
            { key: 's', ctrl: true, action: () => document.getElementById('saveFinishProductBtn')?.click() },
        ] : []),
        ...(path === '/managefinishproductpage' ? [
            { key: 'n', ctrl: true, action: () => navigate('/NewFinishProductPage') },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),

        ...(path === '/return' ? [
            { key: 's', ctrl: true, action: () => document.getElementById('saveReturnBtn')?.click() },
        ] : []),
        ...(path === '/manage/return' ? [
            { key: 'n', ctrl: true, action: () => navigate('/return') },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),

        ...(path === '/analytics' ? [
            { key: 'r', ctrl: true, action: () => window.location.reload() },
        ] : []),

        ...(path === '/cash/book' || path === '/bank/book' ? [
            { key: 'p', ctrl: true, action: () => document.getElementById('printBtn')?.click() },
            { key: 'f', ctrl: true, action: () => document.querySelector('input[type="date"]')?.focus() },
        ] : []),

        ...(path === '/inbox' ? [
            { key: 'f', ctrl: true, action: () => document.querySelector('input[placeholder="Search..."]')?.focus() },
        ] : []),

    ]

    useKeyboardShortcuts(shortcuts)
    return null
}

export default GlobalShortcuts