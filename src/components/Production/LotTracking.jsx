import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'
import { GitBranch, Search, Eye, Package, X, Calendar, AlertTriangle, ArrowRight } from 'lucide-react'

const LotTracking = () => {
    const [lots, setLots] = useState([])
    const [sorting, setSorting] = useState([])
    const [search, setSearch] = useState("")
    const [entries, setEntries] = useState(10)
    const [viewLot, setViewLot] = useState(null)

    async function fetchLots() {
        try {
            let res = await axios.get('http://localhost:3000/find/lots')
            setLots(res.data)
        } catch (err) {
            console.log("LOTS FAILED:", err.response?.data || err.message)
        }
    }

    useEffect(() => {
        fetchLots()
    }, [])

    function fmtDate(d) {
        return d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"
    }

    function expiryInfo(d) {
        if (!d) return { label: "—", tone: "text-slate-400", warn: false }
        let days = Math.ceil((new Date(d) - new Date()) / (1000 * 60 * 60 * 24))
        if (days < 0) return { label: "Expired", tone: "text-rose-600", warn: true }
        if (days <= 30) return { label: `${days}d left`, tone: "text-amber-600", warn: true }
        return { label: fmtDate(d), tone: "text-slate-600", warn: false }
    }

    const columns = useMemo(() => [
        { id: 'sl', header: 'SL', enableSorting: false, cell: ({ row, table }) => table.getState().pagination.pageIndex * table.getState().pagination.pageSize + row.index + 1 },
        { accessorKey: 'lotNo', header: 'Lot No' },
        { accessorKey: 'fgItemName', header: 'Finished Good' },
        { id: 'qty', header: 'Quantity', accessorFn: (r) => `${r.quantity || 0} ${r.unit || ''}` },
        { id: 'prodDate', accessorFn: (r) => r.productionDate ? new Date(r.productionDate).getTime() : 0, header: 'Produced', cell: ({ row }) => fmtDate(row.original.productionDate) },
        { id: 'expiry', header: 'Expiry', enableSorting: false },
        { id: 'action', header: 'Trace', enableSorting: false },
    ], [])

    const table = useReactTable({
        data: lots,
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

            <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-md shadow-emerald-200">
                    <GitBranch className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="text-slate-800 text-lg font-bold">Lot Tracking</h1>
                    <p className="text-slate-400 text-xs">Production lots &amp; full traceability</p>
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
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search lots..."
                            className="bg-transparent text-xs text-slate-600 placeholder-slate-400 focus:outline-none w-40" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            {table.getHeaderGroups().map((hg) => (
                                <tr key={hg.id} className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white">
                                    {hg.headers.map((header) => {
                                        const align = header.column.id === 'action' || header.column.id === 'expiry' ? 'text-center' : 'text-left'
                                        const canSort = header.column.getCanSort()
                                        const sorted = header.column.getIsSorted()
                                        return (
                                            <th key={header.id} onClick={header.column.getToggleSortingHandler()}
                                                className={`${align} text-[12px] font-bold  tracking-wide px-4 py-3 whitespace-nowrap ${canSort ? 'cursor-pointer select-none' : ''}`}>
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
                                            <GitBranch className="w-10 h-10 text-emerald-100" />
                                            <p className="text-slate-400 text-sm">No lots yet</p>
                                            <p className="text-slate-300 text-xs">Complete a production order to generate a lot</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row, i) => {
                                    const lot = row.original
                                    const exp = expiryInfo(lot.expiryDate)
                                    return (
                                        <tr key={row.id} className={`hover:bg-emerald-50/40 transition-colors ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                                            {row.getVisibleCells().map((cell) => {
                                                if (cell.column.id === 'expiry') {
                                                    return (
                                                        <td key={cell.id} className="px-4 py-3 text-center">
                                                            <span className={`inline-flex items-center gap-1 text-xs font-semibold ${exp.tone}`}>
                                                                {exp.warn && <AlertTriangle className="w-3 h-3" />}
                                                                {exp.label}
                                                            </span>
                                                        </td>
                                                    )
                                                }
                                                if (cell.column.id === 'action') {
                                                    return (
                                                        <td key={cell.id} className="px-4 py-3 text-center">
                                                            <button onClick={() => setViewLot(lot)} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer">
                                                                <Eye size={13} /> Trace
                                                            </button>
                                                        </td>
                                                    )
                                                }
                                                return (
                                                    <td key={cell.id} className={`px-4 py-3 text-xs whitespace-nowrap ${cell.column.id === 'lotNo' ? 'font-mono font-bold text-emerald-600' : cell.column.id === 'fgItemName' ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
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
                        Showing {lots.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of {table.getFilteredRowModel().rows.length} entries
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

            {viewLot && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setViewLot(null)}>
                    <div className="relative w-full max-w-lg max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between gap-4 bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white"><GitBranch className="w-5 h-5" /></div>
                                <div>
                                    <h2 className="text-white text-base font-bold font-mono">{viewLot.lotNo}</h2>
                                    <p className="text-emerald-100 text-xs">{viewLot.fgItemName} · {viewLot.quantity} {viewLot.unit}</p>
                                </div>
                            </div>
                            <button onClick={() => setViewLot(null)} className="cursor-pointer rounded-xl p-2 text-white/80 transition-all hover:rotate-90 hover:bg-white/15 hover:text-white"><X size={18} /></button>
                        </div>

                        <div className="grid grid-cols-3 gap-3 px-6 py-4 border-b border-slate-100 shrink-0">
                            {[
                                { label: "Order", value: viewLot.productionOrderNo || "—" },
                                { label: "Produced", value: fmtDate(viewLot.productionDate) },
                                { label: "Expiry", value: fmtDate(viewLot.expiryDate) },
                            ].map((f) => (
                                <div key={f.label} className="rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2">
                                    <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{f.label}</p>
                                    <p className="text-xs font-semibold text-slate-800 mt-0.5 truncate">{f.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="overflow-auto p-6 flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="h-4 w-1 rounded-full bg-emerald-500" />
                                <h3 className="text-sm font-bold text-slate-800">Consumed Raw Material Batches</h3>
                            </div>
                            {(viewLot.consumedBatches || []).length === 0 ? (
                                <p className="text-center text-xs text-slate-400 py-8">No batch info</p>
                            ) : (
                                <div className="rounded-2xl border border-slate-100 overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-slate-50 text-slate-500">
                                                <th className="text-left text-[10px] font-bold uppercase px-4 py-2.5">Item</th>
                                                <th className="text-left text-[10px] font-bold uppercase px-4 py-2.5">Batch No</th>
                                                <th className="text-right text-[10px] font-bold uppercase px-4 py-2.5">Used</th>
                                                <th className="text-right text-[10px] font-bold uppercase px-4 py-2.5">Expiry</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {viewLot.consumedBatches.map((b, i) => (
                                                <tr key={i} className="hover:bg-emerald-50/40">
                                                    <td className="px-4 py-2.5">
                                                        <span className="text-xs font-semibold text-slate-800">{b.itemName}</span>
                                                        <span className="ml-2 font-mono text-[10px] text-slate-400">{b.itemCode}</span>
                                                    </td>
                                                    <td className="px-4 py-2.5"><span className="font-mono text-[11px] font-bold text-emerald-600">{b.batchNo}</span></td>
                                                    <td className="px-4 py-2.5 text-right text-xs font-bold text-slate-700 tabular-nums">{Number(b.qtyUsed || 0).toLocaleString()} {b.unit}</td>
                                                    <td className="px-4 py-2.5 text-right text-[11px] text-slate-500">{fmtDate(b.expiryDate)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default LotTracking