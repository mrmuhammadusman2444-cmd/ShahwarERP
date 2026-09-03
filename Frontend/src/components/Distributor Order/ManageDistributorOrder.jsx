import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'



const ManageDistributorOrder = () => {
    const navigate = useNavigate()
    const [distributorOrders, setDistributorOrders] = useState([])
    const [detailOrder, setDetailOrder] = useState(null)
    const [deleteTarget, setDeleteTarget] = useState(null)
    const [sorting, setSorting] = useState([])
    const [search, setSearch] = useState("")
    const [entries, setEntries] = useState(10)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [allOrders, setAllOrders] = useState([])

    async function setStatus(id, status) {
        try {
            await axios.put(`http://localhost:3000/distributor/order/status/${id}`, { status })
            let res = await axios.get('http://localhost:3000/distributor/all-orders')
            setDistributorOrders(res.data)
            setAllOrders(res.data)
        } catch (err) {
            console.log("STATUS FAILED:", err.response?.data || err.message)
        }
    }

    function handleFind() {
        if (!startDate && !endDate) {
            setDistributorOrders(allOrders)
            return
        }
        let filtered = allOrders.filter((o) => {
            if (!o.date) return false
            let d = new Date(o.date)
            let from = startDate ? new Date(startDate) : null
            let to = endDate ? new Date(endDate) : null
            if (to) to.setHours(23, 59, 59, 999)
            if (from && d < from) return false
            if (to && d > to) return false
            return true
        })
        setDistributorOrders(filtered)
    }


    async function handleDelete() {
        try {
            await axios.delete(`http://localhost:3000/distributor/order/${deleteTarget._id}`)
            setDistributorOrders((prev) => prev.filter((o) => o._id !== deleteTarget._id))
            setDeleteTarget(null)
        } catch (err) {
            console.log("DELETE FAILED:", err.response?.data || err.message)
        }
    }

    useEffect(() => {
        async function fetchOrders() {
            try {
                let res = await axios.get('http://localhost:3000/distributor/all-orders')
                setDistributorOrders(res.data)
            } catch (err) {
                console.log("DIST ORDERS FAILED:", err.response?.data || err.message)
            }
        }
        fetchOrders()
    }, [])

    async function openOrderDetail(order) {
        try {
            let res = await axios.get(`http://localhost:3000/distributor/order-with-stock/${order._id}`)
            setDetailOrder(res.data)
        } catch (err) {
            console.log("STOCK FAILED:", err.response?.data || err.message)
            setDetailOrder(order)
        }
    }


    function fmtDate(d) {
        return d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"
    }

    const columns = useMemo(() => [
        { id: 'sl', header: 'SL', enableSorting: false, cell: ({ row, table }) => table.getState().pagination.pageIndex * table.getState().pagination.pageSize + row.index + 1 },
        { accessorKey: 'orderNo', header: 'Order No' },
        { accessorKey: 'distributorName', header: 'Distributor Name', cell: (i) => i.getValue() || "—" },
        { id: 'date', accessorFn: (r) => r.date ? new Date(r.date).getTime() : 0, header: 'Date', cell: ({ row }) => fmtDate(row.original.date) },
        { accessorKey: 'grandTotal', header: 'Total', cell: (i) => `Rs. ${Number(i.getValue() || 0).toLocaleString()}` },
        { accessorKey: 'status', header: 'Status' },
        { id: 'action', header: 'Action', enableSorting: false },
    ], [])

    const table = useReactTable({
        data: distributorOrders,
        columns,
        state: { sorting, globalFilter: search, pagination: { pageIndex: 0, pageSize: entries } },
        onSortingChange: setSorting,
        onGlobalFilterChange: setSearch,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    useEffect(() => {
        table.setPageSize(entries)
    }, [entries])


    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 p-4 md:p-6">

            {detailOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/40 backdrop-blur-sm p-4" onClick={() => setDetailOrder(null)}>
                    <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-emerald-100 flex flex-col" onClick={(e) => e.stopPropagation()}>

                        <div className="flex items-center justify-between gap-4 bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                </div>
                                <div>
                                    <h2 className="text-white text-base font-bold">Order Details</h2>
                                    <p className="text-emerald-100 text-xs font-mono">{detailOrder.orderNo}</p>
                                </div>
                            </div>
                            <button onClick={() => setDetailOrder(null)} className="cursor-pointer rounded-xl p-2 text-white/80 transition-all hover:rotate-90 hover:bg-white/15 hover:text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-6 py-4 border-b border-emerald-50 shrink-0">
                            {[
                                { label: "Distributor", value: detailOrder.distributorName || "—" },
                                { label: "Date", value: detailOrder.date ? new Date(detailOrder.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
                                { label: "Status", value: detailOrder.status || "placed" },
                            ].map((f) => (
                                <div key={f.label} className="rounded-xl border border-emerald-100 bg-emerald-50/40 px-3 py-2.5">
                                    <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">{f.label}</p>
                                    <p className="text-gray-800 text-sm font-semibold mt-0.5 truncate capitalize">{f.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="overflow-auto p-6 flex-1">
                            <div className="rounded-2xl border border-emerald-100 overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr>
                                            <th className="bg-emerald-600 text-left text-white text-[11px] font-bold uppercase px-4 py-3">SL</th>
                                            <th className="bg-emerald-600 text-center text-white text-[11px] font-bold uppercase px-4 py-3">Pack</th>
                                            <th className="bg-emerald-600 text-left text-white text-[11px] font-bold uppercase px-4 py-3">Item Name</th>
                                            <th className="bg-emerald-600 text-center text-white text-[11px] font-bold uppercase px-4 py-3">Carton</th>
                                            <th className="bg-emerald-600 text-center text-white text-[11px] font-bold uppercase px-4 py-3">Weight</th>
                                            <th className="bg-emerald-600 text-center text-white text-[11px] font-bold uppercase px-4 py-3">Remaining</th>
                                            <th className="bg-emerald-600 text-center text-white text-[11px] font-bold uppercase px-4 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {(detailOrder.items || []).map((it, i) => (
                                            <tr key={i} className={`hover:bg-emerald-50/40 ${i % 2 === 1 ? "bg-gray-50/40" : ""}`}>
                                                <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="inline-block rounded-md bg-gray-100 px-2 py-0.5 text-gray-600 text-[11px] font-semibold">{it.cartonSize || "—"}</span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-800 text-xs font-semibold">{it.name}</td>
                                                <td className="px-4 py-3 text-center text-gray-700 text-xs font-bold">{Number(it.carton || 0).toLocaleString()}</td>
                                                <td className="px-4 py-3 text-center text-gray-600 text-xs">{Number(it.weight || 0).toLocaleString()} {it.weightUnit || "kg"}</td>
                                                <td className="px-4 py-3 text-center">
                                                    {Number(it.remaining || 0) > 0 ? (
                                                        <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-600 ring-1 ring-rose-200">{Number(it.remaining).toLocaleString()}</span>
                                                    ) : (
                                                        <span className="text-emerald-600 text-xs font-bold">0</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    {it.stockStatus === "complete" ? (
                                                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-1 ring-emerald-200">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-500 ring-1 ring-rose-200">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 border-t border-emerald-100 bg-emerald-50/40 px-6 py-4 shrink-0">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">Total Weight</span>
                                <span className="text-gray-700 text-sm font-bold">{Number(detailOrder.totalWeight || 0).toLocaleString()} kg</span>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">Grand Total</p>
                                <p className="text-emerald-700 text-lg font-bold">Rs. {Number(detailOrder.grandTotal || 0).toLocaleString()}</p>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setDeleteTarget(null)}>
                    <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col items-center px-6 pt-8 pb-6 text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 ring-8 ring-rose-50">
                                <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </div>
                            <h3 className="text-gray-800 text-lg font-bold">Delete Order?</h3>
                            <p className="text-gray-500 text-sm mt-1.5"><span className="font-semibold text-gray-700">{deleteTarget.orderNo}</span> delete karna hai?</p>
                            <div className="mt-6 flex w-full gap-3">
                                <button onClick={() => setDeleteTarget(null)} className="flex-1 cursor-pointer rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 cursor-pointer rounded-xl bg-linear-to-r from-rose-500 to-rose-600 py-2.5 text-sm font-bold text-white shadow-md shadow-rose-200 transition-all hover:from-rose-600 hover:to-rose-700">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-b from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-blue-200">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-gray-800 text-xl font-bold">Manage Distributor Orders</h1>
                        <p className="text-gray-400 text-xs">Manage your Distributor Orders</p>
                    </div>
                </div>

            </div>


            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-4 mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
                    <div>
                        <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Start Date</label>
                        <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date"
                            className="bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
                    </div>
                    <div>
                        <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">End Date</label>
                        <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date"
                            className="bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
                    </div>
                    <button onClick={handleFind} className="px-6 py-2.5 cursor-pointer bg-linear-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5">
                        Find
                    </button>

                </div>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">

                <div className="px-5 py-3 border-b border-blue-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-xl p-1">
                            {[10, 25, 50, 100].map((num) => (
                                <button key={num} type="button" onClick={() => setEntries(num)}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${entries === num ? 'bg-linear-to-b from-emerald-500 to-emerald-600 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700'}`}>
                                    {num}
                                </button>
                            ))}
                        </div>


                    </div>

                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-2 focus-within:border-emerald-400 transition-all">
                        <svg className="w-3.5 h-3.5 text-emerald-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search..."
                            className="bg-transparent text-xs text-gray-600 placeholder-gray-400 focus:outline-none w-36" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full  text-sm border-collapse">
                        <thead>
                            {table.getHeaderGroups().map((hg) => (
                                <tr key={hg.id} className="bg-linear-to-b from-emerald-500 to-emerald-700 text-white">
                                    {hg.headers.map((header) => {
                                        const align = header.column.id === 'action' || header.column.id === 'status' ? 'text-center' : 'text-left'
                                        const canSort = header.column.getCanSort()
                                        const sorted = header.column.getIsSorted()
                                        return (
                                            <th key={header.id}
                                                onClick={header.column.getToggleSortingHandler()}
                                                className={`${align} text-xs font-semibold px-4 py-3 whitespace-nowrap ${canSort ? 'cursor-pointer select-none' : ''}`}>
                                                <span className="inline-flex items-center gap-1">
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {canSort && (sorted === 'asc' ? ' ↑' : sorted === 'desc' ? ' ↓' : '')}
                                                </span>
                                            </th>
                                        )
                                    })}
                                </tr>
                            ))}
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {table.getRowModel().rows.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-16">
                                        <div className="flex flex-col items-center gap-2">
                                            <svg className="w-10 h-10 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                            <p className="text-gray-400 text-sm">No distributor orders yet</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row, i) => {
                                    const order = row.original
                                    return (
                                        <tr key={row.id} className={`hover:bg-emerald-50/40 transition-colors ${i % 2 === 1 ? "bg-gray-50/30" : ""}`}>
                                            {row.getVisibleCells().map((cell) => {
                                                if (cell.column.id === 'status') {
                                                    return (
                                                        <td key={cell.id} className="px-4 py-3 text-center">
                                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ring-1 ${order.status === 'completed' ? 'bg-emerald-50 text-emerald-600 ring-emerald-200' : order.status === 'processing' ? 'bg-sky-50 text-sky-600 ring-sky-200' : 'bg-amber-50 text-amber-600 ring-amber-200'}`}>{order.status || "placed"}</span>
                                                        </td>
                                                    )
                                                }
                                                if (cell.column.id === 'action') {
                                                    return (
                                                        <td key={cell.id} className="px-4 py-3">
                                                            <div className="flex items-center justify-center gap-1.5">
                                                                {[
                                                                    { label: "Order Details", cls: "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700", shadow: "shadow-emerald-200 hover:shadow-emerald-300", onClick: () => openOrderDetail(order), icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></> },
                                                                    { label: "Add to Invoice", cls: "from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600", shadow: "shadow-amber-200 hover:shadow-amber-300", onClick: () => navigate('/newSale', { state: { fromOrder: order } }), icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 14l2 2 4-4" /> },
                                                                    { label: "Delete", cls: "from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700", shadow: "shadow-rose-200 hover:shadow-rose-300", onClick: () => setDeleteTarget(order), icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /> },
                                                                ].map((btn, bi) => (
                                                                    <div key={bi} className="relative group/tip">
                                                                        <motion.button
                                                                            onClick={btn.onClick}
                                                                            whileHover={{ y: -3, scale: 1.15 }}
                                                                            whileTap={{ scale: 0.85 }}
                                                                            transition={{ type: "spring", stiffness: 500, damping: 18 }}
                                                                            className={`flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br ${btn.cls} text-white shadow-sm ${btn.shadow} hover:shadow-md cursor-pointer transition-shadow`}
                                                                        >
                                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{btn.icon}</svg>
                                                                        </motion.button>
                                                                        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 scale-90 opacity-0 group-hover/tip:opacity-100 group-hover/tip:scale-100 transition-all duration-200 whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg z-30">
                                                                            {btn.label}
                                                                            <span className="absolute left-1/2 top-full -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-800" />
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </td>
                                                    )
                                                }
                                                return (
                                                    <td key={cell.id} className={`px-4 py-3 text-xs whitespace-nowrap ${cell.column.id === 'orderNo' ? 'text-emerald-600 font-semibold' : 'text-gray-600'}`}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-5 py-3 border-t border-blue-50 flex flex-col sm:flex-row items-center justify-between gap-3 bg-blue-50/30">
                    <p className="text-xs text-gray-400">Showing 0 to 0 of 0 entries</p>
                    <div className="flex items-center gap-1">
                        <button className="px-3 py-1.5 text-xs text-gray-400 bg-white border border-blue-100 rounded-lg hover:border-emerald-300 hover:text-emerald-600 transition-all">Previous</button>
                        <button className="px-3 py-1.5 text-xs text-white bg-linear-to-b from-emerald-500 to-emerald-700 rounded-lg">1</button>
                        <button className="px-3 py-1.5 text-xs text-gray-400 bg-white border border-blue-100 rounded-lg hover:border-emerald-300 hover:text-emerald-600 transition-all">Next</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ManageDistributorOrder
