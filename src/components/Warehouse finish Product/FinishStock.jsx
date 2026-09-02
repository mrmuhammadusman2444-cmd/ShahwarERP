import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Users, Plus, Copy, FileText, Sheet, File, Printer, Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table'

const FinishStock = () => {
    const navigate = useNavigate()
    const [rows, setRows] = useState([])
    const [categoryOrder, setCategoryOrder] = useState([])

    const columns = [
        {
            header: 'Pack',
            accessorKey: 'cartonSize',
            cell: (info) => info.getValue() || '—',
        },
        {
            header: 'Product Name',
            accessorKey: 'productName',
        },
        {
            header: 'Carton',
            accessorKey: 'carton',
            cell: (info) => Number(info.getValue() || 0).toLocaleString(),
        },
        {
            header: 'Dozen No',
            accessorKey: 'dozen',
            cell: (info) => Number(info.getValue() || 0).toLocaleString(),
        },
        {
            header: 'Date',
            accessorKey: 'date',
            cell: (info) =>
                info.getValue()
                    ? new Date(info.getValue()).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    })
                    : '—',
        },
    ]

    const [globalFilter, setGlobalFilter] = useState('')
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    useEffect(() => {
        async function fetchStock() {
            try {
                let res = await axios.get('http://localhost:3000/finish-stock')
                setRows(res.data)
                let catRes = await axios.get('http://localhost:3000/find/category')
                setCategoryOrder(catRes.data.map((c) => c.CategoryName))
            } catch (err) {
                console.log("FINISH STOCK FAILED:", err.response?.data || err.message)
            }
        }
        fetchStock()
    }, [])

    const grouped = rows.reduce((acc, r) => {
        let cat = r.mainCategory || "Uncategorized"
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(r)
        return acc
    }, {})

    const sortedCats = Object.keys(grouped).sort((a, b) => {
        let ia = categoryOrder.indexOf(a)
        let ib = categoryOrder.indexOf(b)
        if (ia === -1) return 1
        if (ib === -1) return -1
        return ia - ib
    })



    const table = useReactTable({
        data: rows,
        columns,
        state: {
            globalFilter,
            pagination,
        },
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })



    const paginatedRows = table.getRowModel().rows

    const groupedPage = paginatedRows.reduce((acc, row) => {
        let cat = row.original.mainCategory || "Uncategorized"
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(row)
        return acc
    }, {})

    const sortedCatsPage = Object.keys(groupedPage).sort((a, b) => {
        let ia = categoryOrder.indexOf(a)
        let ib = categoryOrder.indexOf(b)
        if (ia === -1) return 1
        if (ib === -1) return -1
        return ia - ib
    })




    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50 p-4 md:p-6">


            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-gray-800 text-xl font-bold">Manage Finish Stock</h1>
                        <p className="text-gray-400 text-xs">Manage your Finish Stock</p>
                    </div>
                </div>



            </div>


            <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-5">


                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">


                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-sm">Show</span>
                            <select
                                value={pagination.pageSize}
                                onChange={(e) => setPagination((p) => ({ ...p, pageSize: Number(e.target.value), pageIndex: 0 }))}
                                className="bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1.5 text-gray-700 text-sm focus:outline-none focus:border-emerald-400 cursor-pointer"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <span className="text-gray-500 text-sm">entries</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button className="flex items-center gap-1.5 bg-gray-700 hover:bg-gray-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                                <Copy className="w-3.5 h-3.5" /> Copy
                            </button>
                            <button className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                                <FileText className="w-3.5 h-3.5" /> CSV
                            </button>
                            <button className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                                <Sheet className="w-3.5 h-3.5" /> Excel
                            </button>
                            <button className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                                <File className="w-3.5 h-3.5" /> PDF
                            </button>
                            <button className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                                <Printer className="w-3.5 h-3.5" /> Print
                            </button>
                        </div>
                    </div>


                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 focus-within:border-emerald-400 focus-within:bg-white transition-all">
                        <Search className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <input
                            type="text"
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                            className="bg-transparent text-xs text-gray-600 placeholder-gray-400 focus:outline-none w-40"
                        />
                    </div>
                </div>


                <div className="overflow-x-auto rounded-xl border border-emerald-100 h-115">
                    <table className="w-full text-sm">
                        <thead  className="sticky top-0 z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="bg-linear-to-b from-emerald-500 to-emerald-700 text-white">
                                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide rounded-tl-xl">SL</th>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="text-left px-4 py-3 font-semibold text-xs tracking-wide cursor-pointer select-none"
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {{ asc: ' ▲', desc: ' ▼' }[header.column.getIsSorted()] ?? ''}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {rows.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                                                <Users className="w-7 h-7 text-emerald-200" />
                                            </div>
                                            <p className="text-gray-500 text-sm font-medium">No finish stock found</p>
                                            <p className="text-gray-400 text-xs">Add a finish product to see stock</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                (() => {
                                    let sl = 0
                                    return sortedCatsPage.map((cat) => (
                                        <React.Fragment key={cat}>
                                            <tr className="bg-emerald-100/70">
                                                <td colSpan={7} className="px-4 py-2 text-[12px] font-bold text-emerald-800 uppercase tracking-wide">{cat}</td>
                                            </tr>
                                            {groupedPage[cat].map((row) => {
                                                sl += 1
                                                return (
                                                    <tr key={row.id} className="border-b border-gray-50 hover:bg-emerald-50/40 transition-colors">
                                                        <td className="px-4 py-3 text-gray-400 text-xs">{sl}</td>
                                                        {row.getVisibleCells().map((cell) => (
                                                            <td key={cell.id} className="px-4 py-3 text-xs">
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                )
                                            })}
                                        </React.Fragment>
                                    ))
                                })()
                            )}
                        </tbody>
                    </table>
                </div>


                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
                    <p className="text-gray-400 text-xs">
                        Showing {table.getFilteredRowModel().rows.length === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1} to{" "}
                        {Math.min((pagination.pageIndex + 1) * pagination.pageSize, table.getFilteredRowModel().rows.length)} of{" "}
                        {table.getFilteredRowModel().rows.length} entries
                    </p>
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 bg-blue-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-3.5 h-3.5" /> Previous
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center cursor-pointer">
                            {pagination.pageIndex + 1}
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-600 bg-blue-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Next <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FinishStock
