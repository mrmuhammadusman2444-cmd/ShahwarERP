import { Landmark, Search, BookOpen, Building2, CalendarDays, TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table'
import { useState, useMemo } from 'react'

const BankBook = () => {

    const [sorting, setSorting] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

    const columns = useMemo(() => [
        { accessorKey: 'sl', header: 'SL.', size: 60 },
        { accessorKey: 'date', header: 'Date', size: 110 },
        { accessorKey: 'voucherType', header: 'Voucher Type', size: 140 },
        { accessorKey: 'description', header: 'Description' },
        { accessorKey: 'credit', header: 'Credit', size: 120, cell: info => <span className="text-emerald-700 font-semibold">{info.getValue()}</span> },
        { accessorKey: 'debit', header: 'Debit', size: 120, cell: info => <span className="text-rose-600 font-semibold">{info.getValue()}</span> },
        { accessorKey: 'balance', header: 'Balance', size: 130, cell: info => <span className="font-bold">{info.getValue()}</span> },
    ], [])

    const data = useMemo(() => [], [])

    const table = useReactTable({
        data,
        columns,
        state: { sorting, globalFilter, pagination },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className="p-4 md:p-5">

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                        <Landmark className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-gray-800 text-lg font-bold">Accounts</h1>
                        <p className="text-gray-400 text-xs">Bank Book</p>
                    </div>
                </div>

            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-5 mb-4">
                <div className="flex flex-wrap items-end gap-4">

                    <div className="flex flex-col gap-1.5 flex-1 min-w-48">
                        <label className="text-gray-700 text-xs font-semibold flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                            Bank Name
                        </label>
                        <select className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-500 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                            <option value="">Select option</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-gray-700 text-xs font-semibold flex items-center gap-1.5">
                            <CalendarDays className="w-3.5 h-3.5 text-emerald-500" />
                            From Date
                        </label>
                        <input type="date" className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all cursor-pointer w-40" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-gray-700 text-xs font-semibold flex items-center gap-1.5">
                            <CalendarDays className="w-3.5 h-3.5 text-emerald-500" />
                            To Date
                        </label>
                        <input type="date" className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all cursor-pointer w-40" />
                    </div>

                    <button type="button" className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap">
                        <Search className="w-4 h-4" />
                        Find
                    </button>

                </div>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">





                <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-50 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs">Show</span>
                        <select value={table.getState().pagination.pageSize} onChange={e => table.setPageSize(Number(e.target.value))} className="bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1 text-gray-700 text-xs focus:outline-none cursor-pointer">
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span className="text-gray-500 text-xs">entries</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs">Search:</span>
                        <div className="relative">
                            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input value={globalFilter ?? ''} onChange={e => setGlobalFilter(e.target.value)} placeholder="Search..." className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-lg pl-8 pr-3 py-1.5 text-gray-700 text-xs focus:outline-none transition-all w-40" />
                        </div>

                    </div>

                </div>
                <div className="flex items-center justify-end gap-4 px-6 py-2.5 border-b border-emerald-50">
                    <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-emerald-400" />
                        <span className="text-gray-700 text-sm font-semibold">Opening Balance</span>
                    </div>
                    <span className="text-gray-500 text-sm font-semibold">0.00</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className="bg-linear-to-r from-emerald-600 to-emerald-700">
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} onClick={header.column.getToggleSortingHandler()} className="text-left text-white font-bold px-4 py-2.5 whitespace-nowrap cursor-pointer select-none">
                                            <div className="flex items-center gap-1">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getIsSorted() === 'asc' ? ' ↑' : header.column.getIsSorted() === 'desc' ? ' ↓' : ''}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="text-center py-14">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                                <BookOpen className="w-5 h-5 text-emerald-300" />
                                            </div>
                                            <p className="text-gray-400 text-xs font-medium">Select filters and click Find</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row, i) => (
                                    <tr key={row.id} className={`border-b border-emerald-50 hover:bg-emerald-50/40 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className="px-4 py-2.5 text-gray-700 text-xs">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot>
                            <tr className="bg-emerald-50 border-t border-emerald-100">
                                <td colSpan={4} className="px-4 py-2.5 text-gray-700 text-xs font-bold">Total</td>
                                <td className="px-4 py-2.5 text-right text-emerald-700 text-xs font-bold">
                                    <div className="flex items-center justify-end gap-1"><TrendingUp className="w-3.5 h-3.5" />0.00</div>
                                </td>
                                <td className="px-4 py-2.5 text-right text-rose-600 text-xs font-bold">
                                    <div className="flex items-center justify-end gap-1"><TrendingDown className="w-3.5 h-3.5" />0.00</div>
                                </td>
                                <td className="px-4 py-2.5 text-right text-emerald-700 text-xs font-bold">
                                    <div className="flex items-center justify-end gap-1"><Wallet className="w-3.5 h-3.5" />0.00</div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-emerald-50">
                    <p className="text-gray-400 text-xs">
                        Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of {table.getFilteredRowModel().rows.length} entries
                    </p>
                    <div className="flex items-center gap-1">
                        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-gray-500 text-xs font-semibold rounded-lg transition-all cursor-pointer border border-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
                        {table.getPageOptions().map(page => (
                            <button key={page} onClick={() => table.setPageIndex(page)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer border ${table.getState().pagination.pageIndex === page ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-emerald-50 hover:bg-emerald-100 text-gray-500 border-emerald-100'}`}>
                                {page + 1}
                            </button>
                        ))}
                        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-gray-500 text-xs font-semibold rounded-lg transition-all cursor-pointer border border-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BankBook