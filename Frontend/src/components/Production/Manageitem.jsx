import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'
import { Package, Search, Pencil, Trash2, Boxes } from 'lucide-react'

const catStyle = {
    RM: { label: 'Raw Material', soft: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
    PM: { label: 'Packing Material', soft: 'bg-sky-50 text-sky-700 ring-sky-200' },
    WIP: { label: 'Semi-Finished', soft: 'bg-amber-50 text-amber-700 ring-amber-200' },
    FG: { label: 'Finished Good', soft: 'bg-violet-50 text-violet-700 ring-violet-200' },
}

const ManageItem = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [sorting, setSorting] = useState([])
    const [search, setSearch] = useState("")
    const [entries, setEntries] = useState(10)
    const [deleteTarget, setDeleteTarget] = useState(null)

    async function fetchItems() {
        try {
            let res = await axios.get('http://localhost:3000/find/items')
            setItems(res.data)
        } catch (err) {
            console.log("ITEMS FAILED:", err.response?.data || err.message)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])

    async function handleDelete() {
        try {
            await axios.delete(`http://localhost:3000/delete/item/${deleteTarget._id}`)
            setItems((prev) => prev.filter((i) => i._id !== deleteTarget._id))
            setDeleteTarget(null)
        } catch (err) {
            console.log("DELETE FAILED:", err.response?.data || err.message)
        }
    }

    const columns = useMemo(() => [
        { id: 'sl', header: 'SL', enableSorting: false, cell: ({ row, table }) => table.getState().pagination.pageIndex * table.getState().pagination.pageSize + row.index + 1 },
        { accessorKey: 'itemCode', header: 'Code' },
        { accessorKey: 'itemName', header: 'Item Name' },
        { accessorKey: 'category', header: 'Category' },
        { accessorKey: 'unitOfMeasure', header: 'Unit', cell: (i) => i.getValue() || "—" },
        { accessorKey: 'currentStock', header: 'Stock' },
        { accessorKey: 'costPerUnit', header: 'Cost', cell: (i) => `Rs ${Number(i.getValue() || 0).toLocaleString()}` },
        { id: 'action', header: 'Action', enableSorting: false },
    ], [])

    const table = useReactTable({
        data: items,
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
                <button onClick={() => navigate('/new/item')} className="px-6 py-2 rounded-lg cursor-pointer text-emerald-600 text-sm font-medium hover:bg-emerald-50 transition-all">
                    New Item
                </button>
                <button className="px-6 py-2 rounded-lg bg-linear-to-b from-emerald-500 to-emerald-700 cursor-pointer text-white text-sm font-semibold shadow-md shadow-emerald-200">
                    Manage Items
                </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-md shadow-emerald-200">
                    <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="text-slate-800 text-lg font-bold">Item Master</h1>
                    <p className="text-slate-400 text-xs">All raw materials, packing &amp; finished goods</p>
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
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search items..."
                            className="bg-transparent text-xs text-slate-600 placeholder-slate-400 focus:outline-none w-40" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            {table.getHeaderGroups().map((hg) => (
                                <tr key={hg.id} className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white">
                                    {hg.headers.map((header) => {
                                        const align = header.column.id === 'action' ? 'text-center' : 'text-left'
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
                                    <td colSpan={8} className="text-center py-16">
                                        <div className="flex flex-col items-center gap-2">
                                            <Boxes className="w-10 h-10 text-emerald-100" />
                                            <p className="text-slate-400 text-sm">No items yet</p>
                                            <p className="text-slate-300 text-xs">Add a raw material or finished good</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row, i) => {
                                    const it = row.original
                                    const low = Number(it.currentStock) <= Number(it.reorderLevel) && Number(it.reorderLevel) > 0
                                    return (
                                        <tr key={row.id} className={`hover:bg-emerald-50/40 transition-colors ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                                            {row.getVisibleCells().map((cell) => {
                                                if (cell.column.id === 'category') {
                                                    const c = catStyle[it.category] || catStyle.RM
                                                    return (
                                                        <td key={cell.id} className="px-4 py-3">
                                                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ring-1 ${c.soft}`}>{c.label}</span>
                                                        </td>
                                                    )
                                                }
                                                if (cell.column.id === 'currentStock') {
                                                    return (
                                                        <td key={cell.id} className="px-4 py-3">
                                                            <span className={`inline-flex items-center gap-1.5 text-xs font-bold tabular-nums ${low ? 'text-rose-600' : 'text-slate-700'}`}>
                                                                {Number(it.currentStock || 0).toLocaleString()} {it.unitOfMeasure}
                                                                {low && <span className="rounded-md bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold text-rose-600 ring-1 ring-rose-200">LOW</span>}
                                                            </span>
                                                        </td>
                                                    )
                                                }
                                                if (cell.column.id === 'action') {
                                                    return (
                                                        <td key={cell.id} className="px-4 py-3">
                                                            <div className="flex items-center justify-center gap-1.5">
                                                                <button onClick={() => navigate('/new/item', { state: { editItem: it } })} className="w-8 h-8 flex items-center justify-center rounded-lg bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white transition-colors cursor-pointer"><Pencil size={14} /></button>
                                                                <button onClick={() => setDeleteTarget(it)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"><Trash2 size={14} /></button>
                                                            </div>
                                                        </td>
                                                    )
                                                }
                                                return (
                                                    <td key={cell.id} className={`px-4 py-3 text-xs whitespace-nowrap ${cell.column.id === 'itemCode' ? 'font-mono font-bold text-emerald-600' : cell.column.id === 'itemName' ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
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
                        Showing {items.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of {table.getFilteredRowModel().rows.length} entries
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

            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setDeleteTarget(null)}>
                    <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col items-center px-6 pt-8 pb-6 text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 ring-8 ring-rose-50">
                                <Trash2 className="w-8 h-8 text-rose-500" />
                            </div>
                            <h3 className="text-slate-800 text-lg font-bold">Delete Item?</h3>
                            <p className="text-slate-500 text-sm mt-1.5"><span className="font-semibold text-slate-700">{deleteTarget.itemName}</span> ({deleteTarget.itemCode}) delete karna hai?</p>
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

export default ManageItem