import React, { useState, useEffect } from 'react'
import SearchableSelect from './SearchableSelect.jsx'
import { User, Package } from 'lucide-react'
import axios from 'axios'
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table'
import { useMemo } from 'react'






const SchemeReport = () => {

    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [selectedCustomer, setSelectedCustomer] = useState('')
    const [selectedProduct, setSelectedProduct] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalPoints, setTotalPoints] = useState(0)
    const [entries, setEntries] = useState(7)



    useEffect(() => {
        async function fetchData() {
            try {
                let prodRes = await axios.get('http://localhost:3000/find/product')
                let saleOnly = prodRes.data.filter((p) => p.saleRawCategory !== "Raw")
                setProducts(saleOnly)

                let custRes = await axios.get('http://localhost:3000/find')
                setCustomers(custRes.data)
            } catch (err) {
                console.log("FETCH FAILED:", err.response?.data || err.message)
            }
        }
        fetchData()
    }, [])


    async function handleFind() {
        setLoading(true)
        try {
            let res = await axios.get('http://localhost:3000/scheme-report', {
                params: {
                    customerName: selectedCustomer,
                    startDate: startDate,
                    endDate: endDate,
                    productName: selectedProduct,

                }
            })
            setResults(res.data.rows)
            setTotalPoints(res.data.totalPoints)
        } catch (err) {
            console.log("SCHEME REPORT FAILED:", err.response?.data || err.message)
        }
        setLoading(false)
    }

    const [sorting, setSorting] = useState([])

    const columns = useMemo(() => [
        { id: 'sl', header: 'SL.', enableSorting: false, cell: ({ row }) => row.index + 1 },
        { accessorKey: 'productName', header: 'Product Name' },
        { accessorKey: 'qty', header: 'Qty', cell: (info) => Number(info.getValue() || 0).toLocaleString() },
        { accessorKey: 'points', header: 'Points', cell: (info) => Number(info.getValue() || 0).toLocaleString() },
    ], [])

    const table = useReactTable({
        data: results,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: entries } },
    })

    useEffect(() => {
        table.setPageSize(entries)
    }, [entries])

    return (
        <div className="p-4 md:p-5">

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-gray-800 text-lg font-bold">Scheme Report</h1>
                        <p className="text-gray-400 text-xs"> Generate scheme reports</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">

                </div>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-4 mb-4">
                <div className="flex flex-wrap items-end gap-3">

                    <div className="flex flex-col gap-1.5 min-w-0">
                        <label className="text-gray-700 text-xs font-semibold whitespace-nowrap">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}

                            defaultValue="2026-01-01"
                            className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2 text-gray-700 text-sm focus:outline-none transition-all cursor-pointer w-36"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 min-w-0">
                        <label className="text-gray-700 text-xs font-semibold whitespace-nowrap">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            defaultValue="2026-07-06"
                            className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2 text-gray-700 text-sm focus:outline-none transition-all cursor-pointer w-36"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1 min-w-40">
                        <label className="text-gray-700 text-xs font-semibold whitespace-nowrap">Customer Name</label>
                        <SearchableSelect
                            options={customers.map((c) => ({ value: c.customerName, label: c.customerName }))}
                            value={selectedCustomer}
                            onChange={setSelectedCustomer}
                            placeholder="Select customer"
                            icon={User}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1 min-w-40">
                        <label className="text-gray-700 text-xs font-semibold whitespace-nowrap">Product</label>
                        <SearchableSelect
                            options={products.map((p) => ({ value: p.productName, label: p.productName }))}
                            value={selectedProduct}
                            onChange={setSelectedProduct}
                            placeholder="Select product"
                            icon={Package}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleFind}
                        className="flex items-center gap-2 px-6 py-2 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Find
                    </button>

                </div>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-emerald-50 flex-wrap gap-3">
                    <h2 className="text-gray-700 text-sm font-bold">Report Results</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs">Show</span>
                        <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-xl p-1">
                            {[10, 25, 50, 100].map((num) => (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => setEntries(num)}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${entries === num ? 'bg-linear-to-b from-emerald-500 to-emerald-600 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700'}`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        <span className="text-gray-500 text-xs">entries</span>
                    </div>
                </div>
                <div className="overflow-x-auto h-110 ">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 z-10">
                            {table.getHeaderGroups().map((hg) => (
                                <tr key={hg.id} className="bg-linear-to-r from-emerald-600 to-emerald-700">
                                    {hg.headers.map((header) => {
                                        const align = header.column.id === 'qty' || header.column.id === 'points' ? 'text-right' : 'text-left'
                                        return (
                                            <th
                                                key={header.id}
                                                onClick={header.column.getToggleSortingHandler()}
                                                className={`${align} text-white font-bold px-4 py-2.5 whitespace-nowrap cursor-pointer select-none`}
                                            >
                                                <span className={`inline-flex items-center gap-1 ${align === 'text-right' ? 'flex-row-reverse' : ''}`}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {header.column.getIsSorted() === 'asc' ? ' ↑' : header.column.getIsSorted() === 'desc' ? ' ↓' : ''}
                                                </span>
                                            </th>
                                        )
                                    })}
                                </tr>
                            ))}
                        </thead>
                                                <tbody>
                            {results.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-10">
                                        <div className="flex flex-col items-center gap-2 mt-30">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-400 text-xs font-medium">{loading ? "Loading..." : "Select filters and click Find"}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (() => {
                                const maxPoints = Math.max(...results.map((r) => Number(r.points) || 0), 1)
                                return table.getRowModel().rows.map((row, i) => {
                                    const p = row.original
                                    const pts = Number(p.points) || 0
                                    const isTop = pts === maxPoints && pts > 0
                                    return (
                                        <tr key={row.id} className={`group border-b border-gray-50 border-l-2 transition-all ${isTop ? 'border-l-amber-400 bg-amber-50/30' : 'border-l-transparent hover:border-l-emerald-400 hover:bg-emerald-50/40'}`}>
                                            <td className="px-5 py-3">
                                                <span className={`inline-flex h-6 w-6 items-center justify-center rounded-lg text-[11px] font-bold tabular-nums transition-colors ${isTop ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-200' : 'bg-gray-100 text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-700'}`}>
                                                    {i + 1}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-800 text-[13px] font-semibold">{p.productName}</span>
                                                    {isTop && (
                                                        <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-700">
                                                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21.4 8 14 2 9.4h7.6z" /></svg>
                                                            Top
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 text-right">
                                                <span className="inline-flex items-center justify-center min-w-12 rounded-lg bg-gray-50 px-2.5 py-1 text-gray-600 text-xs font-semibold tabular-nums ring-1 ring-gray-100">
                                                    {Number(p.qty || 0).toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-right">
                                                <span className={`inline-flex items-center justify-center min-w-14 rounded-lg px-2.5 py-1 text-[13px] font-bold tabular-nums ${isTop ? 'bg-amber-100 text-amber-800' : 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'}`}>
                                                    {pts.toLocaleString()}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })
                            })()}
                        </tbody>
                        {results.length > 0 && (
                            <tfoot>
                                <tr className="sticky bottom-0">
                                    <td colSpan={4} className="bg-emerald-50 border-t-2 border-emerald-200 px-5 py-0.5">
                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex items-center gap-2 text-emerald-700 text-[11px] font-bold uppercase tracking-[0.14em]">
                                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21.4 8 14 2 9.4h7.6z" /></svg>
                                                Total Points
                                            </span>
                                            <span className="text-emerald-800 text-lg font-bold tabular-nums">{Number(totalPoints).toLocaleString()}</span>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>
                {results.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-emerald-50">
                        <p className="text-gray-400 text-xs">
                            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, results.length)} of {results.length} entries
                        </p>
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-gray-500 text-xs font-semibold rounded-lg transition-all cursor-pointer border border-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            {table.getPageOptions().map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => table.setPageIndex(page)}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer border ${table.getState().pagination.pageIndex === page ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-emerald-50 hover:bg-emerald-100 text-gray-500 border-emerald-100'}`}>
                                    {page + 1}
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-gray-500 text-xs font-semibold rounded-lg transition-all cursor-pointer border border-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed">
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default SchemeReport;
