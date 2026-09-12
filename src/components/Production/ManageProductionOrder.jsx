import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'
import { Factory, Search, Eye, Trash2, CheckCircle2, X, Play } from 'lucide-react'

const statusStyle = {
    draft: 'bg-amber-50 text-amber-600 ring-amber-200',
    completed: 'bg-emerald-50 text-emerald-600 ring-emerald-200',
    cancelled: 'bg-rose-50 text-rose-500 ring-rose-200',
}

const ManageProductionOrder = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [sorting, setSorting] = useState([])
    const [search, setSearch] = useState("")
    const [entries, setEntries] = useState(10)
    const [viewOrder, setViewOrder] = useState(null)
    const [completeTarget, setCompleteTarget] = useState(null)
    const [deleteTarget, setDeleteTarget] = useState(null)
    const [busy, setBusy] = useState(false)

    async function fetchOrders() {
        try {
            let res = await axios.get('http://localhost:3000/find/production-orders')
            setOrders(res.data)
        } catch (err) {
            console.log("ORDERS FAILED:", err.response?.data || err.message)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    async function handleComplete() {
        setBusy(true)
        try {
            await axios.put(`http://localhost:3000/production-order/complete/${completeTarget._id}`)
            setCompleteTarget(null)
            fetchOrders()
        } catch (err) {
            console.log("COMPLETE FAILED:", err.response?.data || err.message)
            alert(err.response?.data?.message || "Complete failed")
        }
        setBusy(false)
    }

    async function handleDelete() {
        try {
            await axios.delete(`http://localhost:3000/delete/production-order/${deleteTarget._id}`)
            setOrders((prev) => prev.filter((o) => o._id !== deleteTarget._id))
            setDeleteTarget(null)
        } catch (err) {
            console.log("DELETE FAILED:", err.response?.data || err.message)
        }
    }

    function fmtDate(d) {
        return d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"
    }

    const columns = useMemo(() => [
        { id: 'sl', header: 'SL', enableSorting: false, cell: ({ row, table }) => table.getState().pagination.pageIndex * table.getState().pagination.pageSize + row.index + 1 },
        { accessorKey: 'orderNo', header: 'Order No' },
        { accessorKey: 'fgItemName', header: 'Finished Good' },
        { id: 'qty', header: 'Quantity', accessorFn: (r) => `${r.quantity || 0} ${r.unit || ''}` },
        { id: 'date', accessorFn: (r) => r.date ? new Date(r.date).getTime() : 0, header: 'Date', cell: ({ row }) => fmtDate(row.original.date) },
        { accessorKey: 'status', header: 'Status' },
        { id: 'action', header: 'Action', enableSorting: false },
    ], [])

    const table = useReactTable({
        data: orders,
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
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/40 p-4 md:p-6">

            <div className="mb-5 flex gap-1 bg-white border border-slate-200 shadow-sm p-1 rounded-xl w-fit">
                <button onClick={() => navigate('/production/orders')} className="px-6 py-2 rounded-lg cursor-pointer text-emerald-600 text-sm font-medium hover:bg-emerald-50 transition-all">
                    New Order
                </button>
                <button className="px-6 py-2 rounded-lg bg-linear-to-b from-emerald-500 to-emerald-700 cursor-pointer text-white text-sm font-semibold shadow-md shadow-emerald-200">
                    Manage Orders
                </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-md shadow-emerald-200">
                    <Factory className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="text-slate-800 text-lg font-bold">Production Orders</h1>
                    <p className="text-slate-400 text-xs">All production orders</p>
                </div>
            </div>

            <div className="bg-white border border-slate-200/70 rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden">

                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-100">
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
                        {[10, 25, 50, 100].map((num) => (
                            <button key={num} type="button" onClick={() => setEntries(num)}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${entries === num ? 'bg-linear-to-b from-emerald-500 to-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-emerald-700'}`}>
                                {num}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 focus-within:border-emerald-400 focus-within:bg-white transition-all">
                        <Search className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search orders..."
                            className="bg-transparent text-xs text-slate-600 placeholder-slate-400 focus:outline-none w-40" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            {table.getHeaderGroups().map((hg) => (
                                <tr key={hg.id} className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white">
                                    {hg.headers.map((header) => {
                                        const align = header.column.id === 'action' || header.column.id === 'status' ? 'text-center' : 'text-left'
                                        const canSort = header.column.getCanSort()
                                        const sorted = header.column.getIsSorted()
                                        return (
                                            <th key={header.id} onClick={header.column.getToggleSortingHandler()}
                                                className={`${align} text-[11px] font-bold uppercase tracking-wide px-4 py-3 whitespace-nowrap ${canSort ? 'cursor-pointer select-none' : ''}`}>
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
                        <tbody className="divide-y divide-slate-50">
                            {table.getRowModel().rows.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-16">
                                        <div className="flex flex-col items-center gap-2">
                                            <Factory className="w-10 h-10 text-emerald-100" />
                                            <p className="text-slate-400 text-sm">No production orders yet</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row, i) => {
                                    const o = row.original
                                    return (
                                        <tr key={row.id} className={`hover:bg-emerald-50/40 transition-colors ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                                            {row.getVisibleCells().map((cell) => {
                                                if (cell.column.id === 'status') {
                                                    return (
                                                        <td key={cell.id} className="px-4 py-3 text-center">
                                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ring-1 ${statusStyle[o.status] || statusStyle.draft}`}>{o.status}</span>
                                                        </td>
                                                    )
                                                }
                                                if (cell.column.id === 'action') {
                                                    return (
                                                        <td key={cell.id} className="px-4 py-3">
                                                            <div className="flex items-center justify-center gap-1.5">
                                                                <button onClick={() => setViewOrder(o)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"><Eye size={14} /></button>
                                                                {o.status === 'draft' && (
                                                                    <button onClick={() => setCompleteTarget(o)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white transition-colors cursor-pointer" title="Complete"><CheckCircle2 size={14} /></button>
                                                                )}
                                                                <button onClick={() => setDeleteTarget(o)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"><Trash2 size={14} /></button>
                                                            </div>
                                                        </td>
                                                    )
                                                }
                                                return (
                                                    <td key={cell.id} className={`px-4 py-3 text-xs whitespace-nowrap ${cell.column.id === 'orderNo' ? 'font-mono font-bold text-emerald-600' : cell.column.id === 'fgItemName' ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
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

                <div className="px-5 py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/20">
                    <p className="text-xs text-slate-400">
                        Showing {orders.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of {table.getFilteredRowModel().rows.length} entries
                    </p>
                    <div className="flex items-center gap-1">
                        <button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}
                            className="px-3 py-1.5 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg hover:border-emerald-300 hover:text-emerald-600 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
                        {table.getPageOptions().map((pg) => (
                            <button key={pg} type="button" onClick={() => table.setPageIndex(pg)}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer border ${table.getState().pagination.pageIndex === pg ? 'text-white bg-linear-to-b from-emerald-500 to-emerald-700 border-emerald-600' : 'text-slate-500 bg-white border-slate-200 hover:border-emerald-300 hover:text-emerald-600'}`}>
                                {pg + 1}
                            </button>
                        ))}
                        <button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}
                            className="px-3 py-1.5 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg hover:border-emerald-300 hover:text-emerald-600 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
                    </div>
                </div>

            </div>

            {viewOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setViewOrder(null)}>
                    <div className="relative w-full max-w-lg max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between gap-4 bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white"><Factory className="w-5 h-5" /></div>
                                <div>
                                    <h2 className="text-white text-base font-bold">{viewOrder.fgItemName}</h2>
                                    <p className="text-emerald-100 text-xs font-mono">{viewOrder.orderNo} · {viewOrder.quantity} {viewOrder.unit} · {viewOrder.bomCode}</p>
                                </div>
                            </div>
                            <button onClick={() => setViewOrder(null)} className="cursor-pointer rounded-xl p-2 text-white/80 transition-all hover:rotate-90 hover:bg-white/15 hover:text-white"><X size={18} /></button>
                        </div>
                        <div className="overflow-auto p-6 flex-1">
                            <div className="rounded-2xl border border-slate-100 overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-500">
                                            <th className="text-left text-[10px] font-bold uppercase px-4 py-2.5">Item</th>
                                            <th className="text-center text-[10px] font-bold uppercase px-4 py-2.5">Type</th>
                                            <th className="text-right text-[10px] font-bold uppercase px-4 py-2.5">Consumed</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {(viewOrder.requiredMaterials || []).map((m, i) => (
                                            <tr key={i} className="hover:bg-emerald-50/40">
                                                <td className="px-4 py-2.5">
                                                    <span className="text-xs font-semibold text-slate-800">{m.itemName}</span>
                                                    <span className="ml-2 font-mono text-[10px] text-slate-400">{m.itemCode}</span>
                                                </td>
                                                <td className="px-4 py-2.5 text-center">
                                                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold ring-1 ${m.category === 'RM' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-sky-50 text-sky-700 ring-sky-200'}`}>{m.category}</span>
                                                </td>
                                                <td className="px-4 py-2.5 text-right text-xs font-bold text-slate-700 tabular-nums">{Number(m.requiredQty || 0).toLocaleString()} {m.unit}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {completeTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setCompleteTarget(null)}>
                    <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col items-center px-6 pt-8 pb-6 text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 ring-8 ring-teal-50"><Play className="w-7 h-7 text-teal-600" /></div>
                            <h3 className="text-slate-800 text-lg font-bold">Complete Production?</h3>
                            <p className="text-slate-500 text-sm mt-1.5"><span className="font-semibold text-slate-700">{completeTarget.orderNo}</span> complete karne pe raw material stock se minus aur <span className="font-semibold">{completeTarget.fgItemName}</span> stock me add hoga.</p>
                            <div className="mt-6 flex w-full gap-3">
                                <button onClick={() => setCompleteTarget(null)} className="flex-1 cursor-pointer rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50">Cancel</button>
                                <button onClick={handleComplete} disabled={busy} className="flex-1 cursor-pointer rounded-xl bg-linear-to-r from-teal-500 to-teal-600 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-200 transition-all hover:from-teal-600 hover:to-teal-700 disabled:opacity-70">{busy ? 'Processing...' : 'Complete'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setDeleteTarget(null)}>
                    <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col items-center px-6 pt-8 pb-6 text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 ring-8 ring-rose-50"><Trash2 className="w-8 h-8 text-rose-500" /></div>
                            <h3 className="text-slate-800 text-lg font-bold">Delete Order?</h3>
                            <p className="text-slate-500 text-sm mt-1.5"><span className="font-semibold text-slate-700">{deleteTarget.orderNo}</span> delete karna hai?</p>
                            <div className="mt-6 flex w-full gap-3">
                                <button onClick={() => setDeleteTarget(null)} className="flex-1 cursor-pointer rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 cursor-pointer rounded-xl bg-linear-to-r from-rose-500 to-rose-600 py-2.5 text-sm font-bold text-white shadow-md shadow-rose-200 transition-all hover:from-rose-600 hover:to-rose-700">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ManageProductionOrder