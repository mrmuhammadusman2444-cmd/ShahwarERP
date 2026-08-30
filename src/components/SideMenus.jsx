import React from 'react'
import './SidebarMenus.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { can, canSub, canAnySub } from '../Utils/Permissions.js'
import { Search, Inbox, Bell, LayoutDashboard, Wallet, BookOpen, HandCoins, BriefcaseBusiness, ClipboardList, Landmark, Gift, ChartNoAxesCombined, Repeat2, Flag, BarChart2, LayoutGrid, Package, FileText, Users, Truck, ChevronDown, BadgeDollarSign, Handshake, PackageOpen, ShoppingCart, PackageCheck, Blocks } from "lucide-react";

const SideMenus = ({ collapsed }) => {
    const [customerOpen, setCustomerOpen] = useState(false)
    const [active, setActive] = useState('Dashboard')
    const [orderOpen, setOrderOpen] = useState(false)
    const [saleOpen, setsaleOpen] = useState(false)
    const [approvalOpen, setapprovalOpen] = useState(false)
    const [productOpen, setproductOpen] = useState(false)
    const [supplierOpen, setsupplierOpen] = useState(false)
    const [purchaseOpen, setpurchaseOpen] = useState(false)
    const [stockOpen, setstockOpen] = useState(false)
    const [warehouseOpen, setwarehouseOpen] = useState(false)
    const [warehouseSaleOpen, setwarehouseSaleOpen] = useState(false)
    const [schemeOpen, setschemeOpen] = useState(false)
    const [returnOpen, setreturnOpen] = useState(false)
    const [distributorOpen, setdistributorOpen] = useState(false)
    const [reportOpen, setreportOpen] = useState(false)
    const [accountOpen, setaccountOpen] = useState(false)
    const [bankOpen, setbankOpen] = useState(false)
    const [salaryOpen, setsalaryOpen] = useState(false)
    const [assetsOpen, setassetsOpen] = useState(false)
    const [employeeOpen, setemployeeOpen] = useState(false)
    const [attendanceOpen, setattendanceOpen] = useState(false)
    const [salaryDetailOpen, setsalaryDetailOpen] = useState(false)
    const [cashBankOpen, setcashBankOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [pendingPurchase, setPendingPurchase] = useState(0)
    const [pendingInvoiceCount, setPendingInvoiceCount] = useState(0)
    const [pendingPurchaseCount, setPendingPurchaseCount] = useState(0)
    const [pendingPaymentCount, setPendingPaymentCount] = useState(0)
    const [paymentApprovalCount, setPaymentApprovalCount] = useState(0)

    useEffect(() => {
        async function loadPendingCount() {
            try {
                let res = await axios.get('http://localhost:3000/all/pending/invoices')
                setPendingInvoiceCount(res.data.length)
            } catch (err) {
                console.log("PENDING COUNT LOAD FAILED:", err.response?.data || err.message)
            }
        }

        loadPendingCount()

        const interval = setInterval(loadPendingCount, 30000)

        window.addEventListener('saleCreated', loadPendingCount)
        window.addEventListener('approval-changed', loadPendingCount)

        return () => {
            clearInterval(interval)
            window.removeEventListener('saleCreated', loadPendingCount)
            window.removeEventListener('approval-changed', loadPendingCount)
        }
    }, [])



    useEffect(() => {
        async function countPendingPurchase() {
            try {
                let res = await axios.get('http://localhost:3000/find/purchase')
                let count = res.data.filter(p => p.status !== "approved" && p.status !== "rejected").length
                setPendingPurchaseCount(count)
            } catch (err) {
                console.log("COUNT PURCHASE FAILED:", err.response?.data || err.message)
            }
        }

        countPendingPurchase()

        window.addEventListener("approval-changed", countPendingPurchase)

        return () => window.removeEventListener("approval-changed", countPendingPurchase)
    }, [])



    useEffect(() => {
        async function countPendingPayment() {
            try {
                let res = await axios.get('http://localhost:3000/find/supplier/payment')
                let count = res.data.filter(p => p.status !== "approved" && p.status !== "rejected").length
                setPendingPaymentCount(count)
            } catch (err) {
                console.log("COUNT PAYMENT FAILED:", err.response?.data || err.message)
            }
        }
        countPendingPayment()
        window.addEventListener("approval-changed", countPendingPayment)
        return () => window.removeEventListener("approval-changed", countPendingPayment)
    }, [])


    useEffect(() => {
        async function countPaymentApproval() {
            try {
                let res = await axios.get('http://localhost:3000/payment-approval/count')
                setPaymentApprovalCount(res.data.count || 0)
            } catch (err) {
                console.log("PAYMENT APPROVAL COUNT FAILED:", err.response?.data || err.message)
            }
        }
        countPaymentApproval()
        const interval = setInterval(countPaymentApproval, 30000)
        window.addEventListener("approval-changed", countPaymentApproval)
        return () => {
            clearInterval(interval)
            window.removeEventListener("approval-changed", countPaymentApproval)
        }
    }, [])
    const isSearching = searchQuery.trim().length > 0

    const menuMatches = (parentLabel, subLabels) => {
        if (!isSearching) return true
        return (
            parentLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subLabels.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    }

    const subMatches = (subLabel, parentLabel = '') => {
        if (!isSearching) return true
        const q = searchQuery.toLowerCase()
        return subLabel.toLowerCase().includes(q) || parentLabel.toLowerCase().includes(q)
    }


    const setTip = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--tooltip-y', rect.top + rect.height / 2 + 'px');
    }

    const navigate = useNavigate()
    const location = useLocation()
    const isAnalytics = location.pathname === '/analytics'
    const isDashboard = location.pathname === '/dashboard'


    const isActivePath = (path) => location.pathname.toLowerCase() === path.toLowerCase()

    const isParentActive = (paths) => paths.some((p) => isActivePath(p))

    const totalPendingApprovals = pendingInvoiceCount + pendingPurchaseCount + paymentApprovalCount

    return (
        <div>

            <div className="px-2 pt-2.5 pb-2">
                {!collapsed ? (
                    <div
                        style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.10)' }}
                        className="sidebar-search flex items-center gap-2 h-10 rounded-xl px-1.5 border cursor-text"
                    >
                        <Search className="text-slate-100 ml-2" size={18} />
                        <input
                            type="text"
                            placeholder="Quick search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="text-[12px] placeholder:text-slate-400 text-slate-100 flex-1 border-none focus:outline-none"
                        />
                    </div>
                ) : (
                    <div onMouseEnter={setTip} className="relative group group/tooltip flex items-center justify-center h-10 w-10 rounded-full bg-slate-800 cursor-pointer hover:bg-slate-700 transition-colors">
                        <Search className="text-slate-100" size={18} />
                        <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                            Search
                        </span>
                    </div>
                )}
            </div>

            <div className="px-2 pb-2.5 ">

                {menuMatches('Inbox', []) && (
                    <div onClick={() => { navigate('/inbox') }} onMouseEnter={setTip} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer  border-transparent hover:bg-(--nav-active) transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''}`}>

                        <svg width="23" height="23" viewBox="0 0 15 15" fill="#93c5fd" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="shrink-0 text-slate-600 -ml-0.1">
                            <g className="env-letter ">
                                <rect x="4.5" y="6" width="6" height="5" rx="0.5" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />
                                <line x1="5.5" y1="8" x2="9.5" y2="8" stroke="#1e40af" strokeWidth="0.8" />
                                <line x1="5.5" y1="9.5" x2="8.5" y2="9.5" stroke="#1e40af" strokeWidth="0.8" />
                            </g>
                            <rect x="1" y="5.5" width="13" height="8.5" rx="1" fill="#ffffff" stroke="#475569" strokeWidth="0.5" />
                            <line x1="1" y1="14" x2="7.5" y2="9.5" stroke="#475569" strokeWidth="0.8" opacity="0.4" />
                            <line x1="14" y1="14" x2="7.5" y2="9.5" stroke="#475569" strokeWidth="0.8" opacity="0.4" />
                            <g className="env-flap">
                                <polygon points="1,5.5 14,5.5 7.5,11" fill="#ffffff" stroke="#475569" strokeWidth="1" strokeLinejoin="round" />
                            </g>
                        </svg>

                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Inbox</span>}
                        {!collapsed && <span className="text-[10.5px] font-semibold text-blue-700 bg-blue-100 rounded-full px-2 py-px">12</span>}

                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Inbox
                            </span>
                        )}
                    </div>
                )}

                {menuMatches('Notifications', []) && (

                    <div onMouseEnter={setTip} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer  border-transparent hover:bg-(--nav-active) ransition-all ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''}`}>
                        <Bell className="bell-icon text-slate-100 shrink-0" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Notifications</span>}
                        {!collapsed && <span className="text-[10.5px] font-semibold text-amber-700 bg-amber-100 rounded-full px-2 py-px">15+</span>}

                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Notifications
                            </span>
                        )}
                    </div>
                )}
            </div>

            <div className="px-2 pt-3 pb-1">
                {collapsed ? (
                    <div className="flex justify-center">
                        <span className="flex items-center justify-center w-7 h-6 rounded-md bg-slate-800/60 text-slate-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 px-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-[0.18em] shrink-0">Menu</span>
                        <span className="flex-1 h-px bg-linear-to-r from-slate-700/80 via-slate-800 to-transparent" />
                    </div>
                )}
            </div>

            <div className="px-2">

                {can("dashboard", "view") && menuMatches('Dashboard', []) && (
                    <div onClick={() => { navigate('/dashboard') }} onMouseEnter={setTip} className={`relative group group/tooltip flex items-center gap-2.5 rounded-lg px-2 cursor-pointer overflow-hidden mb-px ${collapsed ? 'justify-center w-9 h-9 mx-auto' : 'h-8.75'} ${isDashboard ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isDashboard && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <LayoutGrid className="text-slate-100 shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-blue-100 font-medium">Dashboard</span>}

                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Dashboard
                            </span>
                        )}
                    </div>
                )}


                {can("analytics", "view") && menuMatches('Analytics', []) && (

                    <div onClick={() => { navigate('/analytics') }} onMouseEnter={setTip} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isAnalytics ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isAnalytics && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}

                        <svg width="20" height="20" viewBox="0 0 24 24" text="#ffffff" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 shrink-0 /50">
                            <line x1="18" y1="20" x2="18" y2="10" className="bar3 text-slate-100" style={{ transformOrigin: '18px 20px' }} />
                            <line x1="12" y1="20" x2="12" y2="4" className="bar2  text-slate-100" style={{ transformOrigin: '12px 20px' }} />
                            <line x1="6" y1="20" x2="6" y2="14" className="bar1 text-slate-100" style={{ transformOrigin: '6px 20px' }} />
                        </svg>
                        {!collapsed && <span className="text-[12.5px] text-slate-100">Analytics</span>}

                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Analytics
                            </span>
                        )}
                    </div>
                )}
                {/* {menuMatches('Inventory', []) && (

                    <div onMouseEnter={setTip} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer  hover:bg-(--nav-active)  transition-all mb-px ${collapsed ? 'justify-start' : ''}`}>
                        <Package className="text-slate-100   shrink-0 group-hover:-translate-y-1 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100">Inventory</span>}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-blue-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Inventory
                            </span>
                        )}
                    </div>
                )} */}
                {/* 
                {menuMatches('Invoices', []) && (

                    <div onMouseEnter={setTip} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer  hover:bg-(--nav-active)  transition-all mb-px ${collapsed ? 'justify-start' : ''}`}>
                        <FileText className="text-slate-100  shrink-0  group-hover:-rotate-12 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100">Invoices</span>}

                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-blue-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Invoices
                            </span>
                        )}
                    </div>
                )} */}

                {(can("customers", "view") || canAnySub("customers")) && menuMatches('Customers', ['New Customers', 'Manage Customers', 'Manage Factory Customers', 'Customers Ledger', 'Customers Advance']) && (
                    <div onMouseEnter={setTip} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/newcustomer', '/manageCustomer', '/factoryCustomer', '/CustomerLedgerPage', '/CustomerAdvancePage']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}
                        onClick={() => setCustomerOpen(!customerOpen)}
                    >
                        {isParentActive(['/newcustomer', '/manageCustomer', '/factoryCustomer', '/CustomerLedgerPage', '/CustomerAdvancePage']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <Users className="text-slate-100 shrink-0 group-hover:scale-110 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Customers</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100 w-3.5 h-3.5 transition-transform duration-300 ${customerOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Customers
                            </span>
                        )}
                    </div>
                )}

                {!collapsed && (
                    <div style={{
                        maxHeight: (customerOpen || isSearching) ? '300px' : '0px',
                        opacity: (customerOpen || isSearching) ? 1 : 0,
                        transform: (customerOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                        transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                    }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("customers", "newCustomer") && subMatches('New Customers') && (
                            <div onClick={() => navigate('/newcustomer')} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                New Customers
                            </div>
                        )}
                        {canSub("customers", "manageCustomer") && subMatches('Manage Customers') && (
                            <div onClick={() => navigate('/manageCustomer')} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Customers
                            </div>
                        )}
                        {canSub("customers", "manageFactoryCustomer") && subMatches('Manage Factory Customers') && (
                            <div onClick={() => navigate('/factoryCustomer')} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Factory Customers
                            </div>
                        )}
                        {canSub("customers", "customerLedger") && subMatches('Customers Ledger') && (
                            <div onClick={() => navigate('/customerledgerpage')} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Customers Ledger
                            </div>
                        )}
                        {canSub("customers", "customerAdvance") && subMatches('Customers Advance') && (
                            <div onClick={() => navigate('/customeradvancepage')} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Customers Advance
                            </div>
                        )}
                    </div>
                )}

                {can("orders", "view") && menuMatches('Orders', ['New Orders', 'Manage Orders', 'Orders Reports', 'Dispatch Orders']) && (
                    <div onMouseEnter={setTip} onClick={() => setOrderOpen(!orderOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/NewOrdersPage', '/ManageOrdersPage', '/OrderReportPage', '/DispatchOrderPage']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/NewOrdersPage', '/ManageOrdersPage', '/OrderReportPage', '/DispatchOrderPage']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <Truck className="text-slate-100   shrink-0 group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Orders</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${orderOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Orders
                            </span>
                        )}
                    </div>
                )}
                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (orderOpen || isSearching) ? '200px' : '0px',
                            opacity: (orderOpen || isSearching) ? 1 : 0,
                            transform: (orderOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                            transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("orders", "newOrders") && subMatches('New Orders') && (
                            <div onClick={() => { navigate('/neworderspage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                New Orders
                            </div>
                        )}
                        {canSub("orders", "manageOrders") && subMatches('Manage Orders') && (
                            <div onClick={() => { navigate('/ManageOrdersPage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Orders
                            </div>
                        )}
                        {canSub("orders", "ordersReports") && subMatches('Orders Reports') && (
                            <div onClick={() => { navigate('/orderreportpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Orders Reports
                            </div>
                        )}
                        {canSub("orders", "dispatchOrders") && subMatches('Dispatch Orders') && (
                            <div onClick={() => { navigate('/dispatchorderpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Dispatch Orders
                            </div>
                        )}
                    </div>
                )}




                {(can("sales", "view") || canAnySub("sales")) && menuMatches('Sales', ['New Sales', 'Manage Sales']) && (
                    <div onMouseEnter={setTip} onClick={() => setsaleOpen(!saleOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/newSale', '/manageSale']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/newSale', '/manageSale']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <BadgeDollarSign className="text-slate-100  shrink-0  sale-icon" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Sales</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${saleOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Sales
                            </span>
                        )}
                    </div>
                )}

                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (saleOpen || isSearching) ? '200px' : '0px',
                            opacity: (saleOpen || isSearching) ? 1 : 0,
                            transform: (saleOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                            transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("sales", "newSales") && subMatches('New Sales') && (
                            <div onClick={() => { navigate('/newSale') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                New Sales
                            </div>
                        )}
                        {canSub("sales", "manageSales") && subMatches('Manage Sales') && (
                            <div onClick={() => { navigate('/manageSale') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Sales
                            </div>
                        )}
                    </div>
                )}

                {can("approval", "view") && menuMatches('Approval', ['Invoice Approval', 'Purchase Approval', 'Customer Payment Approval', 'Supplier Payment Approval', 'Payment Approval']) && (

                    <div onMouseEnter={setTip} onClick={() => setapprovalOpen(!approvalOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/invoiceapprovalpage', '/purchaseapprovalpage', '/customerpaymentpage', '/supplierpaymentpage']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/invoiceapprovalpage', '/purchaseapprovalpage', '/customerpaymentpage', '/supplierpaymentpage']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <div className="relative shrink-0">
                            <Handshake className="text-slate-100 group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                            {collapsed && totalPendingApprovals > 0 && (
                                <span className="absolute -top-1 right-0 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-emerald-500 px-0.5 text-[9px] font-bold text-white  ring-2 ring-emerald-900">
                                    {totalPendingApprovals > 9 ? "9+" : totalPendingApprovals}
                                </span>
                            )}
                        </div>

                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Approval</span>}

                        {!collapsed && totalPendingApprovals > 0 && (
                            <span className="relative flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 px-1 text-[10px] font-bold text-white shadow-sm shadow-emerald-500/50 ring-2 ring-emerald-900/40">
                                <span className="absolute inset-0 rounded-full bg-(--nav-strip)  opacity-40" />
                                <span className="relative">{totalPendingApprovals}</span>
                            </span>
                        )}

                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${approvalOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Approval
                            </span>
                        )}
                    </div>
                )}

                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (approvalOpen || isSearching) ? '200px' : '0px',
                            opacity: (approvalOpen || isSearching) ? 1 : 0,
                            transform: (approvalOpen || isSearching) ? 'translateY(0px) scaleY(1)' : 'translateY(-12px) scaleY(0.95)',
                            transformOrigin: 'top',
                            filter: (approvalOpen || isSearching) ? 'blur(0px)' : 'blur(2px)',
                            transition: 'max-height 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("approval", "invoiceApproval") && subMatches('Invoice Approval') && (
                            <div onClick={() => { navigate('/invoiceapprovalpage') }} className="flex items-center justify-between text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                <span>Invoice Approval</span>
                                {pendingInvoiceCount > 0 && (
                                    <span className="relative flex h-4.5 min-w-4.5 items-center animate-pulse justify-center rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 px-1 text-[10px] font-bold text-white shadow-sm shadow-emerald-500/50 ring-2 ring-emerald-900/40">
                                        <span className="absolute inset-0 rounded-full bg-(--nav-strip) animate-ping opacity-40" />
                                        <span className="relative">{pendingInvoiceCount}</span>
                                    </span>
                                )}
                            </div>
                        )}
                        {canSub("approval", "purchaseApproval") && subMatches('Purchase Approval') && (
                            <div onClick={() => { navigate('/purchaseapprovalpage') }} className="flex items-center justify-between text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                <span>Purchase Approval</span>
                                {pendingPurchaseCount > 0 && (
                                    <span className="relative flex h-4.5 min-w-4.5 items-center animate-pulse justify-center rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 px-1 text-[10px] font-bold text-white shadow-sm shadow-emerald-500/50 ring-2 ring-emerald-900/40">
                                        <span className="absolute inset-0 rounded-full bg-(--nav-strip) animate-ping opacity-40" />
                                        <span className="relative">{pendingPurchaseCount}</span>
                                    </span>
                                )}
                            </div>
                        )}
                        {false && canSub("approval", "customerPaymentApproval") && subMatches('Customer Payment Approval') && (
                            <div onClick={() => { navigate('/customerpaymentpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Customer Payment Approval
                            </div>
                        )}

                        {false && canSub("approval", "supplierPaymentApproval") && subMatches('Supplier Payment Approval') && (
                            <div onClick={() => { navigate('/Supplier/Payment/Approval') }} className="flex items-center justify-between text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                <span>Supplier Payment Approval</span>
                                {pendingPaymentCount > 0 && (
                                    <span className="relative flex h-4.5 min-w-4.5 items-center animate-pulse justify-center rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 px-1 text-[10px] font-bold text-white shadow-sm shadow-emerald-500/50 ring-2 ring-emerald-900/40">
                                        <span className="absolute inset-0 rounded-full bg-(--nav-strip) animate-ping opacity-40" />
                                        <span className="relative">{pendingPaymentCount}</span>
                                    </span>
                                )}
                            </div>
                        )}
                        {subMatches('Payment Approval') && (
                            <div onClick={() => { navigate('/payment/approval') }} className="flex items-center justify-between text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                <span>Payment Approval</span>
                                {paymentApprovalCount > 0 && (
                                    <span className="relative flex h-4.5 min-w-4.5 items-center animate-pulse justify-center rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 px-1 text-[10px] font-bold text-white shadow-sm shadow-emerald-500/50 ring-2 ring-emerald-900/40">
                                        <span className="absolute inset-0 rounded-full bg-(--nav-strip) animate-ping opacity-40" />
                                        <span className="relative">{paymentApprovalCount}</span>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                )}


                {(can("products", "view") || canAnySub("products")) && menuMatches('Products', ['New Products', 'Manage Products', 'Category', 'Unit', 'Main Category', 'Scheme Products', 'Products Price List' ,'Dynamic Price List']) && (

                    <div onMouseEnter={setTip} onClick={() => setproductOpen(!productOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/newProduct', '/manageproductpage', '/productcategorypage', '/unitpage', '/maincategorypage', '/schemeproductspage']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/newProduct', '/manageproductpage', '/productcategorypage', '/unitpage', '/maincategorypage', '/schemeproductspage']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <PackageOpen className="text-slate-100  shrink-0  group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Products</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${productOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Products
                            </span>
                        )}
                    </div>
                )}
                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (productOpen || isSearching) ? '300px' : '0px',
                            opacity: (productOpen || isSearching) ? 1 : 0,
                            transform: (productOpen || isSearching) ? 'translateY(0px) scaleY(1)' : 'translateY(-12px) scaleY(0.95)',
                            transformOrigin: 'top',
                            filter: (productOpen || isSearching) ? 'blur(0px)' : 'blur(2px)',
                            transition: 'max-height 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("products", "newProducts") && subMatches('New Products') && (
                            <div onClick={() => { navigate('/newProduct') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                New Product
                            </div>
                        )}
                        {canSub("products", "manageProducts") && subMatches('Manage Products') && (
                            <div onClick={() => { navigate('/manageproductpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Products
                            </div>
                        )}
                        {canSub("products", "category") && subMatches('Category') && (
                            <div onClick={() => { navigate('/productcategorypage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Category
                            </div>
                        )}
                        {canSub("products", "unit") && subMatches('Unit') && (
                            <div onClick={() => { navigate('/unitpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Unit
                            </div>
                        )}
                        {/* {subMatches('Main Category') && (
                         <div onClick={() => { navigate('/maincategorypage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                           Main Category
                            </div>
                        )} */}
                        {canSub("products", "schemeProducts") && subMatches('Scheme Products') && (
                            <div onClick={() => { navigate('/schemeproductspage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Scheme Products
                            </div>
                        )}
                        {canSub("products", "productsPriceList") && subMatches('Products Price List') && (
                            <div onClick={() => { navigate('/product/price/list') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Products Price List
                            </div>
                        )}
                        {canSub("products", "dynamicPriceList") && subMatches('Dynamic Price Lis') && (
                            <div onClick={() => { navigate('/dynamic/price/list') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Dynamic Price List
                            </div>
                        )}
                    </div>
                    
                    
                )}

                {(can("suppliers", "view") || canAnySub("suppliers")) && menuMatches('Suppliers', ['Add New Suppliers', 'Manage Suppliers', 'Suppliers Ledger', 'Suppliers Advance']) && (

                    <div onMouseEnter={setTip} onClick={() => setsupplierOpen(!supplierOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/addSupplierPage', '/ManageSupplierPage', '/SupplierLedgerPage', '/SupplierAdvancePage']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/addSupplierPage', '/ManageSupplierPage', '/SupplierLedgerPage', '/SupplierAdvancePage']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <PackageCheck className="text-slate-100   shrink-0 group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Suppliers</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${supplierOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Suppliers
                            </span>
                        )}
                    </div>
                )}
                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (supplierOpen || isSearching) ? '200px' : '0px',
                            opacity: (supplierOpen || isSearching) ? 1 : 0,
                            transform: (supplierOpen || isSearching) ? 'translateY(0px) scaleY(1)' : 'translateY(-12px) scaleY(0.95)',
                            transformOrigin: 'top',
                            filter: (supplierOpen || isSearching) ? 'blur(0px)' : 'blur(2px)',
                            transition: 'max-height 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("suppliers", "addNewSuppliers") && subMatches('Add New Suppliers') && (
                            <div onClick={() => { navigate('/addsupplierpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Add New Suppliers
                            </div>
                        )}
                        {canSub("suppliers", "manageSuppliers") && subMatches('Manage Suppliers') && (
                            <div onClick={() => { navigate('/managesupplierpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Suppliers
                            </div>
                        )}
                        {canSub("suppliers", "suppliersLedger") && subMatches('Suppliers Ledger') && (
                            <div onClick={() => { navigate('/supplierledgerpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Suppliers Ledger
                            </div>
                        )}
                        {canSub("suppliers", "suppliersAdvance") && subMatches('Suppliers Advance') && (
                            <div onClick={() => { navigate('/supplieradvancepage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Suppliers Advance
                            </div>
                        )}
                    </div>
                )}

                {(can("purchase", "view") || canAnySub("purchase")) && menuMatches('Purchase', ['Add Purchase', 'Manage Purchase', 'Add Purchase Order', 'Manage Purchase Order']) && (

                    <div onMouseEnter={setTip} onClick={() => setpurchaseOpen(!purchaseOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/AddPurchasePage', '/ManagePurchasePage', '/AddPurchaseOrderPage', '/ManagePurchaseOrder']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/AddPurchasePage', '/ManagePurchasePage', '/AddPurchaseOrderPage', '/ManagePurchaseOrder']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <ShoppingCart className="text-slate-100   shrink-0 group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Purchase</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${purchaseOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Purchase
                            </span>
                        )}
                    </div>
                )}
                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (purchaseOpen || isSearching) ? '200px' : '0px',
                            opacity: (purchaseOpen || isSearching) ? 1 : 0,
                            transform: (purchaseOpen || isSearching) ? 'translateY(0px) scaleY(1)' : 'translateY(-12px) scaleY(0.95)',
                            transformOrigin: 'top',
                            filter: (purchaseOpen || isSearching) ? 'blur(0px)' : 'blur(2px)',
                            transition: 'max-height 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("purchase", "addPurchase") && subMatches('Add Purchase') && (
                            <div onClick={() => { navigate('/addpurchasepage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Add Purchase
                            </div>
                        )}
                        {canSub("purchase", "managePurchase") && subMatches('Manage Purchase') && (
                            <div onClick={() => { navigate('/managepurchasepage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Purchase
                            </div>
                        )}
                        {canSub("purchase", "addPurchaseOrder") && subMatches('Add Purchase Order') && (
                            <div onClick={() => { navigate('/addpurchaseorderpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Add Purchase Order
                            </div>
                        )}
                        {canSub("purchase", "managePurchaseOrder") && subMatches('Manage Purchase Order') && (
                            <div onClick={() => { navigate('/managepurchaseorder') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Purchase Order
                            </div>
                        )}
                    </div>
                )}

                {can("warehouseFinishProduct", "view") && menuMatches('Warehouse Finish Product', ['New Finish Product', 'Manage Finish Product', 'Finish Product Stock']) && (

                    <div onMouseEnter={setTip} onClick={() => setwarehouseOpen(!warehouseOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/NewFinishProductPage', '/ManageFinishProductPage', '/FinishProductStockPage']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/NewFinishProductPage', '/ManageFinishProductPage', '/FinishProductStockPage']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <PackageCheck className="text-slate-100   shrink-0 group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Warehouse Finish Product</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${warehouseOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Warehouse Finish Product
                            </span>
                        )}
                    </div>

                )}

                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (warehouseOpen || isSearching) ? '200px' : '0px',
                            opacity: (warehouseOpen || isSearching) ? 1 : 0,
                            transform: (warehouseOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                            transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("warehouseFinishProduct", "newFinishProduct") && subMatches('New Finish Product') && (
                            <div onClick={() => { navigate('/newfinishproductpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                New Finish Product
                            </div>
                        )}
                        {canSub("warehouseFinishProduct", "manageFinishProduct") && subMatches('Manage Finish Product') && (
                            <div onClick={() => { navigate('/managefinishproductpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Finish Product
                            </div>
                        )}
                        {canSub("warehouseFinishProduct", "finishProductStock") && subMatches('Finish Product Stock') && (
                            <div onClick={() => { navigate('/finishstock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Finish Product Stock
                            </div>
                        )}
                    </div>
                )}

                {can("stock", "view") && menuMatches('Stock', ['Finish Stock', 'Raw Material Stock', 'Reel Stock', 'Beverage Stock', 'Tea Stock', 'Out of Stock', 'Raw Packing Stock', ' Assign User to Stock']) && (
                    <div onMouseEnter={setTip} onClick={() => setstockOpen(!stockOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/finish/stock', '/raw/material/stock', '/reel/stock', '/Beverage/stock', '/tea/stock', '/out/of/stock', '/raw/packing/stock', '/assign/user/stock']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/finish/stock', '/raw/material/stock', '/reel/stock', '/Beverage/stock', '/tea/stock', '/out/of/stock', '/raw/packing/stock', '/assign/user/stock']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <Blocks className="text-slate-100 shrink-0   group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Stock</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${stockOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Stock
                            </span>
                        )}
                    </div>
                )}
                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (stockOpen || isSearching) ? '340px' : '0px',
                            opacity: (stockOpen || isSearching) ? 1 : 0,
                            transform: (stockOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                            transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                        }}

                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-y-auto no-scrollbar"

                    >

                        {canSub("stock", "finishStock") && subMatches('Finish Stock') && (
                            <div onClick={() => { navigate('/finish/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Finish Stock
                            </div>
                        )}
                        {canSub("stock", "rawMaterialStock") && subMatches('Raw Material Stock') && (
                            <div onClick={() => { navigate('/raw/material/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Raw Material Stock
                            </div>
                        )}
                        {canSub("stock", "reelStock") && subMatches(' Reel Stock') && (
                            <div onClick={() => { navigate('/reel/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Reel Stock
                            </div>
                        )}
                        {canSub("stock", "beverageStock") && subMatches(' Beverage Stock') && (
                            <div onClick={() => { navigate('/beverage/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Beverage Stock
                            </div>
                        )}
                        {canSub("stock", "teaStock") && subMatches(' Tea Stock') && (
                            <div onClick={() => { navigate('/tea/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Tea Stock
                            </div>
                        )}
                        {canSub("stock", "rawPackingStock") && subMatches(' Raw Packing Stock') && (
                            <div onClick={() => { navigate('/raw/packing/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Raw Packing Stock
                            </div>
                        )}
                        {canSub("stock", "outOfStock") && subMatches(' Out of Stock') && (
                            <div onClick={() => { navigate('/out/of/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Out of Stock
                            </div>
                        )}
                        {canSub("stock", "assignUserToStock") && subMatches('  Assign User to Stock') && (
                            <div onClick={() => { navigate('/assign/user/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Assign User to Stock
                            </div>
                        )}
                    </div>
                )}
                {can("warehouseWiseSale", "view") && menuMatches('Warehouse Wise Sale', ['New Stock', 'Manage Stock', 'New Sale', 'Manage Warehouse Sale', 'Warehouse Stock']) && (

                    <div onMouseEnter={setTip} onClick={() => setwarehouseSaleOpen(!warehouseSaleOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/PATH_HERE_1', '/PATH_HERE_2']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/PATH_HERE_1', '/PATH_HERE_2']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <ChartNoAxesCombined className="text-slate-100 shrink-0   group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Warehouse Wise Sale</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${warehouseSaleOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Warehouse Wise Sale
                            </span>
                        )}
                    </div>
                )}

                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (warehouseSaleOpen || isSearching) ? '200px' : '0px',
                            opacity: (warehouseSaleOpen || isSearching) ? 1 : 0,
                            transform: (warehouseSaleOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                            transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("warehouseWiseSale", "newStock") && subMatches('New Stock') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                New Stock
                            </div>
                        )}
                        {canSub("warehouseWiseSale", "manageStock") && subMatches('Manage Stock') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Stock
                            </div>
                        )}
                        {canSub("warehouseWiseSale", "newSale") && subMatches('New Sale') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                New Sale
                            </div>
                        )}
                        {canSub("warehouseWiseSale", "manageWarehouseSale") && subMatches('Manage Warehouse Sale') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Warehouse Sale
                            </div>
                        )}
                        {canSub("warehouseWiseSale", "warehouseStock") && subMatches('Warehouse Stock') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Warehouse Stock
                            </div>
                        )}
                    </div>
                )}

                {can("schemeReport", "view") && menuMatches('Scheme Report', ['Scheme Report', 'Warehouse Report']) && (

                    <div onMouseEnter={setTip} onClick={() => setschemeOpen(!schemeOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/scheme/report', '/warehouse/scheme/report']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/scheme/report', '/warehouse/scheme/report']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <Gift className="text-slate-100   shrink-0  group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Scheme Report</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${schemeOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Scheme Report
                            </span>
                        )}
                    </div>
                )}
                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (schemeOpen || isSearching) ? '200px' : '0px',
                            opacity: (schemeOpen || isSearching) ? 1 : 0,
                            transform: (schemeOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                            transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("schemeReport", "schemeReport") && subMatches('Scheme Report') && (
                            <div onClick={() => { navigate('/scheme/report') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Scheme Report
                            </div>
                        )}
                        {false && canSub("schemeReport", "warehouseReport") && subMatches('Warehouse Report') && (
                            <div onClick={() => { navigate('/warehouse/scheme/report') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Warehouse Report
                            </div>
                        )}

                    </div>
                )}

                {can("return", "view") && menuMatches('Return', ['Return', 'Manage Return']) && (

                    <div onMouseEnter={setTip} onClick={() => setreturnOpen(!returnOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer hover:border-slate-600 transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/return', '/manage/return']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/return', '/manage/return']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <Repeat2 className="text-slate-100 shrink-0   group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Return</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${returnOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Return
                            </span>
                        )}
                    </div>
                )}

                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (returnOpen || isSearching) ? '200px' : '0px',
                            opacity: (returnOpen || isSearching) ? 1 : 0,
                            transform: (returnOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                            transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("return", "return") && subMatches('Return') && (
                            <div onClick={() => { navigate('/return') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Return
                            </div>
                        )}
                        {canSub("return", " ") && subMatches('Manage Return') && (
                            <div onClick={() => { navigate('/manage/return') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Return
                            </div>
                        )}

                    </div>
                )}


                {can("distributorOrder", "view") && menuMatches('Distributor Order', ['Manage Hafiz Order']) && (

                    <div onMouseEnter={setTip} onClick={() => setdistributorOpen(!distributorOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer hover:border-slate-600 transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/manage/distributor/order']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/manage/distributor/order']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <ClipboardList className="text-slate-100 shrink-0   group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Distributor Order</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${distributorOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Distributor Order
                            </span>
                        )}
                    </div>
                )}
                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (distributorOpen || isSearching) ? '200px' : '0px',
                            opacity: (distributorOpen || isSearching) ? 1 : 0,
                            transform: (distributorOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                            transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("distributorOrder", "manageHafizOrders") && subMatches('Manage Hafiz Orders') && (
                            <div onClick={() => { navigate('/manage/distributor/order') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Hafiz Order
                            </div>
                        )}
                    </div>
                )}
                {can("report", "view") && menuMatches('Report', ['Today customer Report', 'User Wise Reciept Report', 'Supplier Reciept', 'Sale Report', 'Sale Report (Product Wise)']) && (
                    <div onMouseEnter={setTip} onClick={() => setreportOpen(!reportOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer hover:border-slate-600 transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/PATH_HERE_1', '/PATH_HERE_2', '/PATH_HERE_3', '/PATH_HERE_4', '/PATH_HERE_5']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/PATH_HERE_1', '/PATH_HERE_2', '/PATH_HERE_3', '/PATH_HERE_4', '/PATH_HERE_5']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <Flag className="text-slate-100 shrink-0   group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Report</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${reportOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Report
                            </span>
                        )}
                    </div>
                )}
                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (reportOpen || isSearching) ? '200px' : '0px',
                            opacity: (reportOpen || isSearching) ? 1 : 0,
                            transform: (reportOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                            transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("report", "todayCustomerReport") && subMatches('Today customer Report') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Today customer Report
                            </div>
                        )}
                        {canSub("report", "userWiseReceiptReport") && subMatches('User Wise Reciept Report') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                User Wise Reciept Report
                            </div>
                        )}
                        {canSub("report", "supplierReceipt") && subMatches('Supplier Reciept') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Supplier Reciept
                            </div>
                        )}
                        {canSub("report", "saleReport") && subMatches('Sale Report') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Sale Report
                            </div>
                        )}
                        {canSub("report", "saleReportProductWise") && subMatches('Sale Report (Product Wise)') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Sale Report (Product Wise)
                            </div>
                        )}
                    </div>
                )}

                {can("accounts", "view") && menuMatches('Accounts', ['Supplier Payment', 'Supplier Tally Ledger', 'Customer Tally Ledger', 'Customer Recieve', 'Assets Payment', ' Fund Transfer', 'Cash Adjustment', 'Reports']) && (
                    <div onMouseEnter={setTip} onClick={() => setaccountOpen(!accountOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer hover:border-slate-600 transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/SupplierPaymentPage', '/SupplierLedgerPage', '/CustomerLedgerPage', '/CustomerPaymentPage', '/PATH_ASSETS_PAYMENT', '/PATH_CASH_ADJUSTMENT', '/PATH_REPORTS']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/SupplierPaymentPage', '/SupplierLedgerPage', '/CustomerLedgerPage', '/CustomerPaymentPage', '/PATH_ASSETS_PAYMENT', '/PATH_CASH_ADJUSTMENT', '/PATH_REPORTS']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <Wallet className="text-slate-100  shrink-0  group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Accounts</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${accountOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Accounts
                            </span>
                        )}
                    </div>
                )}
                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (accountOpen || isSearching) ? '300px' : '0px',
                            opacity: (accountOpen || isSearching) ? 1 : 0,
                            transform: (accountOpen || isSearching) ? 'translateY(0px) scaleY(1)' : 'translateY(-12px) scaleY(0.95)',
                            transformOrigin: 'top',
                            filter: (accountOpen || isSearching) ? 'blur(0px)' : 'blur(2px)',
                            transition: 'max-height 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {false && canSub("accounts", "supplierPayment") && subMatches('Supplier Payment', 'Accounts') && (
                            <div onClick={() => { navigate('/supplier/payments') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Supplier Payment
                            </div>
                        )}
                        {canSub("accounts", "transaction") && subMatches('Fund Transfer', 'Accounts') && (

                            <div onClick={() => { navigate('/make/transaction') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Make a Transaction
                            </div>
                        )}
                        {canSub("accounts", "supplierTallyLedger") && subMatches('Supplier Tally Ledger', 'Accounts') && (

                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Supplier Tally Ledger
                            </div>
                        )}
                        {canSub("accounts", "customerTallyLedger") && subMatches('Customer Tally Ledger', 'Accounts') && (

                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Customer Tally Ledger
                            </div>
                        )}
                        {false && canSub("accounts", "customerRecieve") && subMatches('Customer Recieve', 'Accounts') && (

                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Customer Recieve
                            </div>
                        )}
                        {canSub("accounts", "assetsPayment") && subMatches('Assets Payment', 'Accounts') && (

                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Assets Payment
                            </div>
                        )}

                        {false && canSub("accounts", "reports") && subMatches('Reports', 'Accounts') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Reports
                            </div>
                        )}
                    </div>
                )}


                {can("cashBank", "view") && menuMatches('Cash & Bank Book', ['Cash Book', 'Bank Book']) && (
                    <div onMouseEnter={setTip} onClick={() => setcashBankOpen(!cashBankOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/cash-book', '/bank-book']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/cash/book', '/bank/book']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <BookOpen className="text-slate-100 shrink-0" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Cash & Bank Book</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100 w-3.5 h-3.5 transition-transform duration-300 ${cashBankOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Cash & Bank Book
                            </span>
                        )}
                    </div>
                )}

                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (cashBankOpen || isSearching) ? '200px' : '0px',
                            opacity: (cashBankOpen || isSearching) ? 1 : 0,
                            transform: (cashBankOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                            transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("cashBank", "cashBook") && subMatches('Cash Book') && (
                            <div onClick={() => { navigate('/cash/book') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Cash Book
                            </div>
                        )}
                        {false && canSub("cashBank", "bankBook") && subMatches('Bank Book') && (
                            <div onClick={() => { navigate('/bank/book') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Bank Book
                            </div>
                        )}
                        {canSub("cashBank", "cashAdjustment") && subMatches('Cash Adjustment') && (

                            <div onClick={()=>{navigate('/cash/adjustment')}} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Cash Adjustment
                            </div>
                        )}
                    </div>
                )}

                {can("bank", "view") && menuMatches('Bank', ['Add New', 'Add New Transaction', 'Manage Bank', 'Bank Ledger']) && (

                    <div onMouseEnter={setTip} onClick={() => setbankOpen(!bankOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/new/bank', '/add/new/transaction', '/manage/bank', '/bank/ledger']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/new/bank', '/add/new/transaction', '/manage/bank', '/bank/ledger']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <Landmark className="text-slate-100 shrink-0   group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Bank</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${bankOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Bank
                            </span>
                        )}
                    </div>
                )}
                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (bankOpen || isSearching) ? '200px' : '0px',
                            opacity: (bankOpen || isSearching) ? 1 : 0,
                            transform: (bankOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                            transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("bank", "addNew") && subMatches('Add New') && (
                            <div onClick={() => { navigate('/new/bank') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Add New
                            </div>
                        )}
                        {canSub("bank", "addNewTransaction") && subMatches('Add New Transaction') && (
                            <div onClick={() => { navigate('/add/new/transaction') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Add New Transaction
                            </div>
                        )}
                        {canSub("bank", "manageBank") && subMatches('Manage Bank') && (
                            <div onClick={() => { navigate('/manage/bank') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Bank
                            </div>
                        )}
                        {canSub("bank", "bankLedger") && subMatches('Bank Ledger') && (
                            <div onClick={() => { navigate('/bank/ledger') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Bank Ledger
                            </div>
                        )}
                    </div>
                )}

                {can("salary", "view") && menuMatches('Salary', ['Employee', 'Add Employee', 'Manage Employee', 'Manage Employee Salary', 'Attendence', 'Attendance', 'Attendance Report', 'Salary', 'Employee Salary', 'Ledger']) && (
                    <div onMouseEnter={setTip} onClick={() => setsalaryOpen(!salaryOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''}
     ${isParentActive(['/salary', '/attendence', '/attendence/report', '/add/employee', '/manage/employee', '/manage/employee/salary']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/salary', '/attendence', '/attendence/report', '/add/employee', '/manage/employee', '/manage/employee/salary']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <HandCoins className="text-slate-100 shrink-0   group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Salary</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${salaryOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Salary
                            </span>
                        )}
                    </div>
                )}
                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (salaryOpen || isSearching) ? '480px' : '0px',
                            opacity: (salaryOpen || isSearching) ? 1 : 0,
                            transform: (salaryOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                            transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {(canSub("salary", "addEmployee") || canSub("salary", "manageEmployee") || canSub("salary", "manageEmployeeSalary")) && subMatches('Employee') && (
                            <div onClick={() => setemployeeOpen(!employeeOpen)} className="flex items-center justify-between text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                <span>Employee</span>
                                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${employeeOpen ? 'rotate-180' : ''}`} />
                            </div>
                        )}
                        {(employeeOpen || isSearching) && (
                            <div
                                style={{
                                    maxHeight: (employeeOpen || isSearching) ? '150px' : '0px',
                                    opacity: (employeeOpen || isSearching) ? 1 : 0,
                                    transform: (employeeOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                                    transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                                }}
                                className="ml-4 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                            >
                                {canSub("salary", "addEmployee") && subMatches('Add Employee') && (
                                    <div onClick={() => navigate('/add/employee')} className="text-[11.5px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                        Add Employee
                                    </div>
                                )}
                                {canSub("salary", "manageEmployee") && subMatches('Manage Employee') && (
                                    <div onClick={() => navigate('/manage/employee')} className="text-[11.5px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                        Manage Employee
                                    </div>
                                )}
                                {canSub("salary", "manageEmployeeSalary") && subMatches('Manage Employee Salary') && (
                                    <div onClick={() => navigate('/manage/employee/salary')} className="text-[11.5px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                        Manage Employee Salary
                                    </div>
                                )}
                            </div>
                        )}

                        {(canSub("salary", "attendance") || canSub("salary", "attendanceReport")) && subMatches('Attendence') && (
                            <div onClick={() => setattendanceOpen(!attendanceOpen)} className="flex items-center justify-between text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                <span>Attendence</span>
                                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${attendanceOpen ? 'rotate-180' : ''}`} />
                            </div>
                        )}
                        {(attendanceOpen || isSearching) && (
                            <div
                                style={{
                                    maxHeight: (attendanceOpen || isSearching) ? '110px' : '0px',
                                    opacity: (attendanceOpen || isSearching) ? 1 : 0,
                                    transform: (attendanceOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                                    transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                                }}
                                className="ml-4 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                            >
                                {canSub("salary", "attendance") && subMatches('Attendance') && (
                                    <div onClick={() => { navigate('/attendence') }} className="text-[11.5px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                        Attendance
                                    </div>
                                )}
                                {canSub("salary", "attendanceReport") && subMatches('Attendance Report') && (
                                    <div onClick={() => { navigate('/attendence/report') }} className="text-[11.5px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                        Attendance Report
                                    </div>
                                )}
                            </div>
                        )}

                        {canSub("salary", "employeeSalary") && subMatches('Salary') && (
                            <div onClick={() => setsalaryDetailOpen(!salaryDetailOpen)} className="flex items-center justify-between text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                <span>Salary</span>
                                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${salaryDetailOpen ? 'rotate-180' : ''}`} />
                            </div>
                        )}
                        {(salaryDetailOpen || isSearching) && (
                            <div
                                style={{
                                    maxHeight: (salaryDetailOpen || isSearching) ? '110px' : '0px',
                                    opacity: (salaryDetailOpen || isSearching) ? 1 : 0,
                                    transform: (salaryDetailOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                                    transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                                }}
                                className="ml-4 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                            >
                                {canSub("salary", "employeeSalary") && subMatches('Employee Salary') && (
                                    <div onClick={() => { navigate('/salary') }} className="text-[11.5px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                        Employee Salary Ledger
                                    </div>
                                )}

                                {canSub("salary", "employeeAdvanceSalary") && subMatches('Employee Advance Salary') && (
                                    <div onClick={() => { navigate('/employee/advance/salary') }} className="text-[11.5px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                        Employee Advance Salary
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {(canSub("assets", "addAssets") || canSub("assets", "manageAssets") || canSub("assets", "assetsLedger")) && menuMatches('Assets', ['Add Assets', 'Manage Assets', 'Assets Ledger']) && (
                    <div onMouseEnter={setTip} onClick={() => setassetsOpen(!assetsOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start w-9 h-9 mx-auto' : ''} ${isParentActive(['/assets', '/manage/assets', '/assets/ledger']) ? 'bg-(--nav-active)' : 'hover:bg-(--nav-active)'}`}>
                        {isParentActive(['/assets', '/manage/assets', '/assets/ledger']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--nav-strip) rounded-r-full" />
                        )}
                        <BriefcaseBusiness className="text-slate-100 shrink-0   group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Assets</span>}
                        {!collapsed && <ChevronDown className={`text-slate-100  w-3.5 h-3.5 transition-transform duration-300 ${assetsOpen ? 'rotate-180' : ''}`} />}
                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Assets
                            </span>
                        )}
                    </div>
                )}

                {!collapsed && (
                    <div
                        style={{
                            maxHeight: (assetsOpen || isSearching) ? '200px' : '0px',
                            opacity: (assetsOpen || isSearching) ? 1 : 0,
                            transform: (assetsOpen || isSearching) ? 'translateY(0px)' : 'translateY(-8px)',
                            transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                        }}
                        className="ml-7 border-l border-slate-700 pl-3 flex flex-col gap-0.5 overflow-hidden"
                    >
                        {canSub("assets", "addAssets") && subMatches('Add Assets') && (
                            <div onClick={() => { navigate('/assets') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Add Assets
                            </div>
                        )}
                        {canSub("assets", "manageAssets") && subMatches('Manage Assets') && (
                            <div onClick={() => { navigate('/manage/assets') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Assets
                            </div>
                        )}
                        {canSub("assets", "assetsLedger") && subMatches('Assets Ledger') && (
                            <div onClick={() => { navigate('/assets/ledger') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Assets Ledger
                            </div>
                        )}
                    </div>
                )}


            </div>

        </div>
    )
}

export default React.memo(SideMenus)