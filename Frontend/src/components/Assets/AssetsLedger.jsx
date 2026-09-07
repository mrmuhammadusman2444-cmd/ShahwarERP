import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'
const AssetsLedger = () => {
  const [assets, setAssets] = useState([])
  const [selectedAsset, setSelectedAsset] = useState("")
  const [entries, setEntries] = useState([])
  const [sorting, setSorting] = useState([])
  const [search, setSearch] = useState("")
  const [pageSize, setPageSize] = useState(10)

  function fmtDate(d) {
    return d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"
  }

  const columns = useMemo(() => [
    { id: 'sl', header: 'SL.', enableSorting: false, cell: ({ row, table }) => table.getState().pagination.pageIndex * table.getState().pagination.pageSize + row.index + 1 },
    { id: 'date', accessorFn: (r) => r.date ? new Date(r.date).getTime() : 0, header: 'Date', cell: ({ row }) => fmtDate(row.original.date) },
    { accessorKey: 'description', header: 'Description', cell: (i) => i.getValue() || "—" },
    { accessorKey: 'debit', header: 'Debit', cell: (i) => `Rs. ${Number(i.getValue() || 0).toLocaleString()}` },
    { accessorKey: 'balance', header: 'Balance', cell: (i) => `Rs. ${Number(i.getValue() || 0).toLocaleString()}` },
  ], [])

  const table = useReactTable({
    data: entries,
    columns,
    state: { sorting, globalFilter: search, pagination: { pageIndex: 0, pageSize: pageSize } },
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  useEffect(() => {
    table.setPageSize(pageSize)
  }, [pageSize])

  useEffect(() => {
    async function fetchAssets() {
      try {
        let res = await axios.get('http://localhost:3000/find/asset')
        setAssets(res.data)
      } catch (err) {
        console.log("ASSETS FAILED:", err.response?.data || err.message)
      }
    }
    fetchAssets()
  }, [])

  async function handleSearch() {
    if (!selectedAsset) { alert("Asset select karo"); return }
    try {
      let res = await axios.get(`http://localhost:3000/asset/ledger/${selectedAsset}`)
      setEntries(res.data.entries || [])
    } catch (err) {
      console.log("LEDGER FAILED:", err.response?.data || err.message)
    }
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 p-4 md:p-6">

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-b from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-blue-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-xl font-bold">Assets Ledger</h1>
            <p className="text-gray-400 text-xs">Manage your Assets Ledger</p>
          </div>
        </div>

      </div>


      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
          <div>
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Select Asset</label>
            <select value={selectedAsset} onChange={(e) => setSelectedAsset(e.target.value)}
              className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all cursor-pointer min-w-48">
              <option value="">Select asset</option>
              {assets.map((a) => (
                <option key={a._id} value={a.assetName}>{a.assetName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Start Date</label>
            <input type="date"
              className="bg-blue-50 border border-blue-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>
          <div>
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">End Date</label>
            <input type="date"
              className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>
          <button onClick={handleSearch} className="px-6 py-2.5 cursor-pointer bg-linear-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5">
            Search
          </button>

        </div>
      </div>

      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-5 py-3 border-b border-blue-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Show</span>
              <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1.5 text-gray-600 text-xs focus:outline-none focus:border-emerald-400 transition-all cursor-pointer">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span>entries</span>
            </div>

            <div className="flex items-center gap-1.5 ">
              {[
                { label: "Copy", bg: "bg-slate-500 cursor-pointer  hover:bg-slate-600" },
                { label: "CSV", bg: "bg-green-500  cursor-pointer  hover:bg-green-600" },
                { label: "Excel", bg: "bg-emerald-600 cursor-pointer hover:bg-emerald-700" },
                { label: "PDF", bg: "bg-red-500  cursor-pointer   hover:bg-red-600" },
                { label: "Print", bg: "bg-blue-500 cursor-pointer   hover:bg-blue-600" },
              ].map((btn) => (
                <button key={btn.label}
                  className={`${btn.bg} text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors`}>
                  {btn.label}
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
                    const canSort = header.column.getCanSort()
                    const sorted = header.column.getIsSorted()
                    return (
                      <th key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`text-left text-xs font-semibold px-4 py-3 whitespace-nowrap ${canSort ? 'cursor-pointer select-none' : ''}`}>
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
                  <td colSpan={5} className="text-center py-16">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-10 h-10 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="text-gray-400 text-sm">No Records Found</p>
                      <p className="text-gray-300 text-xs">Select an asset and search</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, i) => (
                  <tr key={row.id} className={`hover:bg-emerald-50/40 transition-colors ${i % 2 === 1 ? "bg-gray-50/30" : ""}`}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className={`px-4 py-3 text-xs whitespace-nowrap ${cell.column.id === 'debit' ? 'text-rose-600 font-semibold' : cell.column.id === 'balance' ? 'text-gray-800 font-bold' : 'text-gray-600'}`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-emerald-50 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/20">
          <p className="text-xs text-gray-400">
            Showing {entries.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of {table.getFilteredRowModel().rows.length} entries
          </p>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}
              className="px-3 py-1.5 text-xs text-gray-500 bg-white border border-emerald-100 rounded-lg hover:border-emerald-300 hover:text-emerald-600 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
              Previous
            </button>
            {table.getPageOptions().map((pg) => (
              <button key={pg} type="button" onClick={() => table.setPageIndex(pg)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer border ${table.getState().pagination.pageIndex === pg ? 'text-white bg-linear-to-b from-emerald-500 to-emerald-700 border-emerald-600' : 'text-gray-500 bg-white border-emerald-100 hover:border-emerald-300 hover:text-emerald-600'}`}>
                {pg + 1}
              </button>
            ))}
            <button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}
              className="px-3 py-1.5 text-xs text-gray-500 bg-white border border-emerald-100 rounded-lg hover:border-emerald-300 hover:text-emerald-600 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AssetsLedger
