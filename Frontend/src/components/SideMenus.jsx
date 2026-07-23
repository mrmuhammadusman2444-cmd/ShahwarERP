import React from 'react'
import './SidebarMenus.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Inbox, Bell, LayoutDashboard, Wallet, HandCoins, BriefcaseBusiness, ClipboardList, Landmark, Gift, ChartNoAxesCombined, Repeat2, Flag, BarChart2, LayoutGrid, Package, FileText, Users, Truck, ChevronDown, BadgeDollarSign, Handshake, PackageOpen, ShoppingCart, PackageCheck, Blocks } from "lucide-react";

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
    const [searchQuery, setSearchQuery] = useState('')

    const [pendingInvoiceCount, setPendingInvoiceCount] = useState(0)

    useEffect(() => {
        async function loadPendingCount() {
            try {
                let res = await axios.get('http://localhost:3000/find/pending/sale')
                setPendingInvoiceCount(res.data.length)
            } catch (err) {
                console.log("PENDING COUNT LOAD FAILED:", err.response?.data || err.message)
            }
        }

        loadPendingCount()

        const interval = setInterval(loadPendingCount, 30000)

        window.addEventListener('saleCreated', loadPendingCount)

        return () => {
            clearInterval(interval)
            window.removeEventListener('saleCreated', loadPendingCount)
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

    const subMatches = (subLabel) => {
        if (!isSearching) return true
        return subLabel.toLowerCase().includes(searchQuery.toLowerCase())
    }



    const setTip = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--tooltip-y', rect.top + rect.height / 2 + 'px');
    }

    const navigate = useNavigate()
    const location = useLocation()
    const isAnalytics = location.pathname === '/analyticspage'
    const isDashboard = location.pathname === '/dashboard'


    const isActivePath = (path) => location.pathname.toLowerCase() === path.toLowerCase()

    const isParentActive = (paths) => paths.some((p) => isActivePath(p))



    return (
        <div>

            {!collapsed && (
                <div className="px-2 pt-2.5 pb-2">
                    <div className="flex  items-center gap-2 h-8.75 rounded-full px-1.5 border  bg-slate-800 cursor-text">
                        <Search className="text-slate-100 ml-2" size={18} />
                        <input
                            type="text"
                            placeholder="Quick search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="text-[12px] placeholder:text-slate-500 text-slate-100 flex-1 bg-transparent border-none focus:outline-none"
                        />

                    </div>
                </div>
            )}

            <div className="px-2 pb-2.5 ">

                {menuMatches('Inbox', []) && (
                    <div onMouseEnter={setTip} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer  border-transparent hover:bg-emerald-800 transition-all mb-px ${collapsed ? 'justify-start' : ''}`}>

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

                    <div onMouseEnter={setTip} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer  border-transparent hover:bg-emerald-800 ransition-all ${collapsed ? 'justify-start' : ''}`}>
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
                <span className="text-[10px] font-semibold text-slate-200  uppercase tracking-widest px-1">Menu</span>
            </div>

            <div className="px-2">

                {menuMatches('Dashboard', []) && (
                    <div onClick={() => { navigate('/dashboard') }} onMouseEnter={setTip} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 hover:bg-emerald-800 rounded-lg px-2 cursor-pointer   overflow-hidden  mb-px ${collapsed ? 'justify-start' : ''}${isDashboard ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {!collapsed && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-800  rounded-r-full" />}
                        <LayoutGrid className="text-slate-100 shrink-0   group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-blue-100 font-medium">Dashboard</span>}

                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Dashboard
                            </span>
                        )}
                    </div>
                )}


                {menuMatches('Analytics', []) && (

                    <div onClick={() => { navigate('/analytics') }} onMouseEnter={setTip} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer  hover:bg-emerald-800  transition-all mb-px ${collapsed ? 'justify-start' : ''}${isAnalytics ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
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

                    <div onMouseEnter={setTip} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer  hover:bg-emerald-800  transition-all mb-px ${collapsed ? 'justify-start' : ''}`}>
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

                    <div onMouseEnter={setTip} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer  hover:bg-emerald-800  transition-all mb-px ${collapsed ? 'justify-start' : ''}`}>
                        <FileText className="text-slate-100  shrink-0  group-hover:-rotate-12 transition-transform duration-300" size={23} />
                        {!collapsed && <span className="text-[12.5px] text-slate-100">Invoices</span>}

                        {collapsed && (
                            <span style={{ top: 'var(--tooltip-y, 50%)', transform: 'translateY(-50%)' }} className="fixed left-16 ml-1 bg-blue-500 text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-999">
                                Invoices
                            </span>
                        )}
                    </div>
                )} */}

                {menuMatches('Customers', ['New Customers', 'Manage Customers', 'Manage Factory Customers', 'Customers Ledger', 'Customers Advance']) && (
                    <div onMouseEnter={setTip} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/newcustomer', '/manageCustomer', '/factoryCustomer', '/CustomerLedgerPage', '/CustomerAdvancePage']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}
                        onClick={() => setCustomerOpen(!customerOpen)}
                    >
                        {isParentActive(['/newcustomer', '/manageCustomer', '/factoryCustomer', '/CustomerLedgerPage', '/CustomerAdvancePage']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('New Customers') && (
                            <div onClick={() => navigate('/newcustomer')} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                New Customers
                            </div>
                        )}
                        {subMatches('Manage Customers') && (
                            <div onClick={() => navigate('/manageCustomer')} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Customers
                            </div>
                        )}
                        {subMatches('Manage Factory Customers') && (
                            <div onClick={() => navigate('/factoryCustomer')} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Factory Customers
                            </div>
                        )}
                        {subMatches('Customers Ledger') && (
                            <div onClick={() => navigate('/customerledgerpage')} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Customers Ledger
                            </div>
                        )}
                        {subMatches('Customers Advance') && (
                            <div onClick={() => navigate('/customeradvancepage')} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Customers Advance
                            </div>
                        )}
                    </div>
                )}

                {menuMatches('Orders', ['New Orders', 'Manage Orders', 'Orders Reports', 'Dispatch Orders']) && (
                    <div onMouseEnter={setTip} onClick={() => setOrderOpen(!orderOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/NewOrdersPage', '/ManageOrdersPage', '/OrderReportPage', '/DispatchOrderPage']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/NewOrdersPage', '/ManageOrdersPage', '/OrderReportPage', '/DispatchOrderPage']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('New Orders') && (
                            <div onClick={() => { navigate('/neworderspage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                New Orders
                            </div>
                        )}
                        {subMatches('Manage Orders') && (
                            <div onClick={() => { navigate('/ManageOrdersPage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Orders
                            </div>
                        )}
                        {subMatches('Orders Reports') && (
                            <div onClick={() => { navigate('/orderreportpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Orders Reports
                            </div>
                        )}
                        {subMatches('Dispatch Orders') && (
                            <div onClick={() => { navigate('/dispatchorderpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Dispatch Orders
                            </div>
                        )}
                    </div>
                )}





                {menuMatches('Sales', ['New Sales', 'Manage Sales']) && (
                    <div onMouseEnter={setTip} onClick={() => setsaleOpen(!saleOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/newSale', '/manageSale']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/newSale', '/manageSale']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('New Sales') && (
                            <div onClick={() => { navigate('/newSale') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                New Sales
                            </div>
                        )}
                        {subMatches('Manage Sales') && (
                            <div onClick={() => { navigate('/manageSale') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Sales
                            </div>
                        )}
                    </div>
                )}

                {menuMatches('Approval', ['Invoice Approval', 'Purchase Approval', 'Customer Payment Approval', 'Supplier Payment Approval']) && (

                    <div onMouseEnter={setTip} onClick={() => setapprovalOpen(!approvalOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/invoiceapprovalpage', '/purchaseapprovalpage', '/customerpaymentpage', '/supplierpaymentpage']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/invoiceapprovalpage', '/purchaseapprovalpage', '/customerpaymentpage', '/supplierpaymentpage']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
                        )}
                        <div className="relative shrink-0">
                            <Handshake className="text-slate-100 group-hover:translate-x-1.5 transition-transform duration-300" size={23} />
                            {collapsed && pendingInvoiceCount > 0 && (
                                <span className="absolute -top-1 -right-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-emerald-500 px-0.5 text-[9px] font-bold text-white animate-pulse ring-2 ring-emerald-900">
                                    {pendingInvoiceCount > 9 ? "9+" : pendingInvoiceCount}
                                </span>
                            )}
                        </div>

                        {!collapsed && <span className="text-[12.5px] text-slate-100 flex-1">Approval</span>}

                        {!collapsed && pendingInvoiceCount > 0 && (
                            <span className="relative flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 px-1 text-[10px] font-bold text-white shadow-sm shadow-emerald-500/50 ring-2 ring-emerald-900/40">
                                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
                                <span className="relative">{pendingInvoiceCount}</span>
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
                        {subMatches('Invoice Approval') && (
                            <div onClick={() => { navigate('/invoiceapprovalpage') }} className="flex items-center justify-between text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                <span>Invoice Approval</span>
                                {pendingInvoiceCount > 0 && (
                                    <span className="relative flex h-4.5 min-w-4.5 items-center animate-pulse justify-center rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 px-1 text-[10px] font-bold text-white shadow-sm shadow-emerald-500/50 ring-2 ring-emerald-900/40">
                                        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
                                        <span className="relative">{pendingInvoiceCount}</span>
                                    </span>
                                )}
                            </div>
                        )}
                        {subMatches('Purchase Approval') && (
                            <div onClick={() => { navigate('/purchaseapprovalpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Purchase Approval
                            </div>
                        )}
                        {subMatches('Customer Payment Approval') && (
                            <div onClick={() => { navigate('/customerpaymentpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Customer Payment Approval
                            </div>
                        )}
                        {subMatches('Supplier Payment Approval') && (
                            <div onClick={() => { navigate('/supplierpaymentpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Supplier Payment Approval
                            </div>
                        )}
                    </div>
                )}


                {menuMatches('Products', ['New Products', 'Manage Products', 'Category', 'Unit', 'Main Category', 'Scheme Products', 'Products Price List']) && (

                    <div onMouseEnter={setTip} onClick={() => setproductOpen(!productOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/newProduct', '/manageproductpage', '/productcategorypage', '/unitpage', '/maincategorypage', '/schemeproductspage']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/newProduct', '/manageproductpage', '/productcategorypage', '/unitpage', '/maincategorypage', '/schemeproductspage']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('New Products') && (
                            <div onClick={() => { navigate('/newProduct') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                New Product
                            </div>
                        )}
                        {subMatches('Manage Products') && (
                            <div onClick={() => { navigate('/manageproductpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Products
                            </div>
                        )}
                        {subMatches('Category') && (
                            <div onClick={() => { navigate('/productcategorypage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Category
                            </div>
                        )}
                        {subMatches('Unit') && (
                            <div onClick={() => { navigate('/unitpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Unit
                            </div>
                        )}
                        {/* {subMatches('Main Category') && (
                            <div onClick={() => { navigate('/maincategorypage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Main Category
                            </div>
                        )} */}
                        {subMatches('Scheme Products') && (
                            <div onClick={() => { navigate('/schemeproductspage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Scheme Products
                            </div>
                        )}
                        {subMatches('Products Price List') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Products Price List
                            </div>
                        )}
                    </div>
                )}

                {menuMatches('Suppliers', ['Add New Suppliers', 'Manage Suppliers', 'Suppliers Ledger', 'Suppliers Advance']) && (

                    <div onMouseEnter={setTip} onClick={() => setsupplierOpen(!supplierOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/addSupplierPage', '/ManageSupplierPage', '/SupplierLedgerPage', '/SupplierAdvancePage']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/addSupplierPage', '/ManageSupplierPage', '/SupplierLedgerPage', '/SupplierAdvancePage']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('Add New Suppliers') && (
                            <div onClick={() => { navigate('/addsupplierpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Add New Suppliers
                            </div>
                        )}
                        {subMatches('Manage Suppliers') && (
                            <div onClick={() => { navigate('/managesupplierpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Suppliers
                            </div>
                        )}
                        {subMatches('Suppliers Ledger') && (
                            <div onClick={() => { navigate('/supplierledgerpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Suppliers Ledger
                            </div>
                        )}
                        {subMatches('Suppliers Advance') && (
                            <div onClick={() => { navigate('/supplieradvancepage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Suppliers Advance
                            </div>
                        )}
                    </div>
                )}

                {menuMatches('Purchase', ['Add Purchase', 'Manage Purchase', 'Add Purchase Order', 'Manage Purchase Order']) && (

                    <div onMouseEnter={setTip} onClick={() => setpurchaseOpen(!purchaseOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/AddPurchasePage', '/ManagePurchasePage', '/AddPurchaseOrderPage', '/ManagePurchaseOrder']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/AddPurchasePage', '/ManagePurchasePage', '/AddPurchaseOrderPage', '/ManagePurchaseOrder']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('Add Purchase') && (
                            <div onClick={() => { navigate('/addpurchasepage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Add Purchase
                            </div>
                        )}
                        {subMatches('Manage Purchase') && (
                            <div onClick={() => { navigate('/managepurchasepage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Purchase
                            </div>
                        )}
                        {subMatches('Add Purchase Order') && (
                            <div onClick={() => { navigate('/addpurchaseorderpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Add Purchase Order
                            </div>
                        )}
                        {subMatches('Manage Purchase Order') && (
                            <div onClick={() => { navigate('/managepurchaseorder') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Purchase Order
                            </div>
                        )}
                    </div>
                )}

                {menuMatches('Warehouse Finish Product', ['New Finish Product', 'Manage Finish Product', 'Finish Product Stock']) && (

                    <div onMouseEnter={setTip} onClick={() => setwarehouseOpen(!warehouseOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/NewFinishProductPage', '/ManageFinishProductPage', '/FinishProductStockPage']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/NewFinishProductPage', '/ManageFinishProductPage', '/FinishProductStockPage']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('New Finish Product') && (
                            <div onClick={() => { navigate('/newfinishproductpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                New Finish Product
                            </div>
                        )}
                        {subMatches('Manage Finish Product') && (
                            <div onClick={() => { navigate('/managefinishproductpage') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Finish Product
                            </div>
                        )}
                        {subMatches('Finish Product Stock') && (
                            <div onClick={() => { navigate('/finishstock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Finish Product Stock
                            </div>
                        )}
                    </div>
                )}

                {menuMatches('Stock', ['Finish Stock', 'Raw Material Stock', 'Reel Stock', 'Beverage Stock', 'Tea Stock', 'Out of Stock', 'Raw Packing Stock', ' Assign User to Stock']) && (

                    <div onMouseEnter={setTip} onClick={() => setstockOpen(!stockOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/finish/stock', '/raw/material/stock', '/reel/stock', '/Beverage/stock', '/tea/stock', '/out/of/stock', '/raw/packing/stock', '/assign/user/stock']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/finish/stock', '/raw/material/stock', '/reel/stock', '/Beverage/stock', '/tea/stock', '/out/of/stock', '/raw/packing/stock', '/assign/user/stock']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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

                        {subMatches('Finish Stock') && (
                            <div onClick={() => { navigate('/finish/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Finish Stock
                            </div>
                        )}
                        {subMatches('Raw Material Stock') && (
                            <div onClick={() => { navigate('/raw/material/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Raw Material Stock
                            </div>
                        )}
                        {subMatches(' Reel Stock') && (
                            <div onClick={() => { navigate('/reel/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Reel Stock
                            </div>

                        )}
                        {subMatches(' Beverage Stock') && (

                            <div onClick={() => { navigate('/beverage/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Beverage Stock
                            </div>
                        )}
                        {subMatches(' Tea Stock') && (

                            <div onClick={() => { navigate('/tea/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Tea Stock
                            </div>
                        )}
                        {subMatches(' Raw Packing Stock') && (

                            <div onClick={() => { navigate('/raw/packing/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Raw Packing Stock
                            </div>
                        )}
                        {subMatches(' Out of Stock') && (

                            <div onClick={() => { navigate('/out/of/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Out of Stock
                            </div>
                        )}
                        {subMatches('  Assign User to Stock') && (

                            <div onClick={() => { navigate('/assign/user/stock') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Assign User to Stock
                            </div>
                        )}
                    </div>
                )}
                {menuMatches('Warehouse Wise Sale', ['New Stock', 'Manage Stock', 'New Sale', 'Manage Warehouse Sale', 'Warehouse Stock']) && (

                    <div onMouseEnter={setTip} onClick={() => setwarehouseSaleOpen(!warehouseSaleOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/PATH_HERE_1', '/PATH_HERE_2']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/PATH_HERE_1', '/PATH_HERE_2']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('New Stock') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                New Stock
                            </div>
                        )}
                        {subMatches('Manage Stock') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Stock
                            </div>
                        )}
                        {subMatches('New Sale') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                New Sale
                            </div>
                        )}
                        {subMatches('Manage Warehouse Sale') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Warehouse Sale
                            </div>
                        )}
                        {subMatches('Warehouse Stock') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Warehouse Stock
                            </div>
                        )}
                    </div>
                )}

                {menuMatches('Scheme Report', ['Scheme Report', 'Warehouse Report']) && (

                    <div onMouseEnter={setTip} onClick={() => setschemeOpen(!schemeOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/scheme/report', '/warehouse/scheme/report']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/scheme/report', '/warehouse/scheme/report']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('Scheme Report') && (
                            <div onClick={() => { navigate('/scheme/report') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Scheme Report
                            </div>
                        )}
                        {subMatches('Warehouse Report') && (
                            <div onClick={() => { navigate('/warehouse/scheme/report') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Warehouse Report
                            </div>
                        )}

                    </div>
                )}

                {menuMatches('Return', ['Return', 'Manage Return']) && (

                    <div onMouseEnter={setTip} onClick={() => setreturnOpen(!returnOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer hover:border-slate-600 transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/return', '/manage/return']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/return', '/manage/return']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('Return') && (
                            <div onClick={() => { navigate('/return') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Return
                            </div>
                        )}
                        {subMatches('Manage Return') && (
                            <div onClick={() => { navigate('/manage/return') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Return
                            </div>
                        )}

                    </div>
                )}


                {menuMatches('Distributor Order', ['Manage Hafiz Order']) && (

                    <div onMouseEnter={setTip} onClick={() => setdistributorOpen(!distributorOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer hover:border-slate-600 transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/manage/distributor/order']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/manage/distributor/order']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('Manage Hafiz Orders') && (
                            <div onClick={() => { navigate('/manage/distributor/order') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Hafiz Order
                            </div>
                        )}
                    </div>
                )}
                {menuMatches('Report', ['Today customer Report', 'User Wise Reciept Report', 'Supplier Reciept', 'Sale Report', 'Sale Report (Product Wise)']) && (

                    <div onMouseEnter={setTip} onClick={() => setreportOpen(!reportOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer hover:border-slate-600 transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/PATH_HERE_1', '/PATH_HERE_2', '/PATH_HERE_3', '/PATH_HERE_4', '/PATH_HERE_5']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/PATH_HERE_1', '/PATH_HERE_2', '/PATH_HERE_3', '/PATH_HERE_4', '/PATH_HERE_5']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('Today customer Report') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Today customer Report
                            </div>
                        )}
                        {subMatches('User Wise Reciept Report') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                User Wise Reciept Report
                            </div>
                        )}
                        {subMatches('Supplier Reciept') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Supplier Reciept
                            </div>
                        )}
                        {subMatches('Sale Report') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Sale Report
                            </div>
                        )}
                        {subMatches('Sale Report (Product Wise)') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Sale Report (Product Wise)
                            </div>
                        )}
                    </div>
                )}

                {menuMatches('Accounts', ['Supplier Payment', 'Supplier Tally Ledger', 'Customer Tally Ledger', 'Customer Recieve', 'Assets Payment', 'Cash Adjustment', 'Reports']) && (

                    <div onMouseEnter={setTip} onClick={() => setaccountOpen(!accountOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer hover:border-slate-600 transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/SupplierPaymentPage', '/SupplierLedgerPage', '/CustomerLedgerPage', '/CustomerPaymentPage', '/PATH_ASSETS_PAYMENT', '/PATH_CASH_ADJUSTMENT', '/PATH_REPORTS']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/SupplierPaymentPage', '/SupplierLedgerPage', '/CustomerLedgerPage', '/CustomerPaymentPage', '/PATH_ASSETS_PAYMENT', '/PATH_CASH_ADJUSTMENT', '/PATH_REPORTS']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('Supplier Payment') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Supplier Payment
                            </div>
                        )}
                        {subMatches('Supplier Tally Ledger') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Supplier Tally Ledger
                            </div>
                        )}
                        {subMatches('Customer Tally Ledger') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Customer Tally Ledger
                            </div>
                        )}
                        {subMatches('Customer Recieve') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Customer Recieve
                            </div>
                        )}
                        {subMatches('Assets Payment') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Assets Payment
                            </div>
                        )}
                        {subMatches('Cash Adjustment') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Cash Adjustment
                            </div>
                        )}
                        {subMatches('Reports') && (
                            <div className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Reports
                            </div>
                        )}
                    </div>
                )}

                {menuMatches('Bank', ['Add New', 'Add New Transaction', 'Manage Bank', 'Bank Ledger']) && (

                    <div onMouseEnter={setTip} onClick={() => setbankOpen(!bankOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/new/bank', '/add/new/transaction', '/manage/bank', '/bank/ledger']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/new/bank', '/add/new/transaction', '/manage/bank', '/bank/ledger']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('Add New') && (
                            <div onClick={() => { navigate('/new/bank') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Add New
                            </div>
                        )}
                        {subMatches('Add New Transaction') && (
                            <div onClick={() => { navigate('/add/new/transaction') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Add New Transaction
                            </div>
                        )}
                        {subMatches('Manage Bank') && (
                            <div onClick={() => { navigate('/manage/bank') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Bank
                            </div>
                        )}
                        {subMatches('Bank Ledger') && (
                            <div onClick={() => { navigate('/bank/ledger') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Bank Ledger
                            </div>
                        )}
                    </div>
                )}

                {menuMatches('Salary', ['Employee', 'Add Employee', 'Manage Employee', 'Manage Employee Salary', 'Attendence', 'Attendance', 'Attendance Report', 'Salary', 'Employee Salary', 'Ledger']) && (

                    <div onMouseEnter={setTip} onClick={() => setsalaryOpen(!salaryOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/salary', '/attendence', '/attendence/report', '/add/employee', '/manage/employee', '/manage/employee/salary']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/salary', '/attendence', '/attendence/report', '/add/employee', '/manage/employee', '/manage/employee/salary']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('Employee') && (
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
                                {subMatches('Add Employee') && (
                                    <div onClick={() => navigate('/add/employee')} className="text-[11.5px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                        Add Employee
                                    </div>
                                )}
                                {subMatches('Manage Employee') && (
                                    <div onClick={() => navigate('/manage/employee')} className="text-[11.5px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                        Manage Employee
                                    </div>
                                )}
                                {subMatches('Manage Employee Salary') && (
                                    <div onClick={() => navigate('/manage/employee/salary')} className="text-[11.5px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                        Manage Employee Salary
                                    </div>
                                )}
                            </div>
                        )}

                        {subMatches('Attendence') && (
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
                                {subMatches('Attendance') && (
                                    <div onClick={() => { navigate('/attendence') }} className="text-[11.5px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                        Attendance
                                    </div>
                                )}
                                {subMatches('Attendance Report') && (
                                    <div onClick={() => { navigate('/attendence/report') }} className="text-[11.5px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                        Attendance Report
                                    </div>
                                )}
                            </div>
                        )}

                        {subMatches('Salary') && (
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
                                {subMatches('Employee Salary') && (
                                    <div onClick={() => { navigate('/salary') }} className="text-[11.5px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                        Employee Salary Ledger
                                    </div>
                                )}

                            </div>
                        )}
                    </div>
                )}

                {menuMatches('Assets', ['Add Assets', 'Manage Assets', 'Assets Ledger']) && (
                    <div onMouseEnter={setTip} onClick={() => setassetsOpen(!assetsOpen)} className={`relative group group/tooltip flex items-center gap-2.5 h-8.75 rounded-lg px-2 cursor-pointer transition-all mb-px ${collapsed ? 'justify-start' : ''} ${isParentActive(['/assets', '/manage/assets', '/assets/ledger']) ? 'bg-emerald-800' : 'hover:bg-emerald-800'}`}>
                        {isParentActive(['/assets', '/manage/assets', '/assets/ledger']) && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-emerald-400 rounded-r-full" />
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
                        {subMatches('Add Assets') && (
                            <div onClick={() => { navigate('/assets') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Add Assets
                            </div>
                        )}
                        {subMatches('Manage Assets') && (
                            <div onClick={() => { navigate('/manage/assets') }} className="text-[12px] text-slate-500 hover:text-blue-100 hover:bg-slate-800 px-2 py-1.5 rounded-md cursor-pointer transition-colors">
                                Manage Assets
                            </div>
                        )}
                        {subMatches('Assets Ledger') && (
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

export default SideMenus