import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { ShoppingCart, Pencil, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'



const ManageReturn = () => {
  const navigate = useNavigate()
  const [returns, setReturns] = useState([])
  const [sorting, setSorting] = useState([])
  const [search, setSearch] = useState("")
  const [entries, setEntries] = useState(10)
  const [detailReturn, setDetailReturn] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
    const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [allReturns, setAllReturns] = useState([])

  async function handleDelete() {
    try {
      await axios.delete(`http://localhost:3000/delete/return/${deleteTarget._id}`)
      setReturns((prev) => prev.filter((r) => r._id !== deleteTarget._id))
      setDeleteTarget(null)
    } catch (err) {
      console.log("DELETE FAILED:", err.response?.data || err.message)
    }
  }

  useEffect(() => {
    async function fetchReturns() {
      try {
        let res = await axios.get('http://localhost:3000/find/returns')
        setReturns(res.data)
        setAllReturns(res.data)
      } catch (err) {
        console.log("RETURNS FETCH FAILED:", err.response?.data || err.message)
      }
    }
    fetchReturns()
  }, [])

  function fmtDate(d) {
    return d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"
  }

  function ActionButton({ icon: Icon, label, gradient, shadow, onClick }) {
    const [hovered, setHovered] = useState(false)
    return (
      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-semibold px-2 py-1 rounded-md whitespace-nowrap shadow-lg z-20"
            >
              {label}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          onClick={onClick}
          whileTap={{ scale: 0.95 }}
          className={`w-8 h-8 bg-linear-to-br ${gradient} rounded-lg flex items-center justify-center shadow-sm ${shadow} transition-colors duration-200 cursor-pointer`}
        >
          <Icon className="w-4 h-4 text-white" />
        </motion.button>
      </div>
    )
  }

  const columns = useMemo(() => [
    { id: 'sl', header: 'SL', enableSorting: false, cell: ({ row, table }) => table.getState().pagination.pageIndex * table.getState().pagination.pageSize + row.index + 1 },
    { accessorKey: 'returnNo', header: 'Return No' },
    { accessorKey: 'saleBy', header: 'Sale By', cell: (i) => i.getValue() || "—" },
    { accessorKey: 'customerName', header: 'Customer Name', cell: (i) => i.getValue() || "—" },
    { id: 'date', accessorFn: (r) => r.date ? new Date(r.date).getTime() : 0, header: 'Date', cell: ({ row }) => fmtDate(row.original.date) },
    { accessorKey: 'grandTotal', header: 'Total Amount', cell: (i) => `Rs. ${Number(i.getValue() || 0).toLocaleString()}` },
    { id: 'action', header: 'Action', enableSorting: false },
  ], [])

  const table = useReactTable({
    data: returns,
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


    function handleFind() {
    if (!startDate && !endDate) { setReturns(allReturns); return }
    let filtered = allReturns.filter((r) => {
      if (!r.date) return false
      let d = new Date(r.date)
      let from = startDate ? new Date(startDate) : null
      let to = endDate ? new Date(endDate) : null
      if (to) to.setHours(23, 59, 59, 999)
      if (from && d < from) return false
      if (to && d > to) return false
      return true
    })
    setReturns(filtered)
  }







  return (


    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50 p-4 md:p-6">

      {detailReturn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setDetailReturn(null)}>
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center justify-between gap-4 bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11a4 4 0 010 8h-1m-8-8L3 7m0 3l2 3" /></svg>
                </div>
                <div>
                  <h2 className="text-white text-base font-bold">Return Detail</h2>
                  <p className="text-emerald-100 text-xs font-mono">{detailReturn.returnNo}</p>
                </div>
              </div>
              <button onClick={() => setDetailReturn(null)} className="cursor-pointer rounded-xl p-2 text-white/80 transition-all hover:rotate-90 hover:bg-white/15 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-6 py-4 border-b border-emerald-50 shrink-0">
              {[
                { label: "Customer", value: detailReturn.customerName || "—" },
                { label: "Return Type", value: detailReturn.returnType || "—" },
                { label: "Date", value: detailReturn.date ? new Date(detailReturn.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
              ].map((f) => (
                <div key={f.label} className="rounded-xl border border-emerald-100 bg-emerald-50/40 px-3 py-2.5">
                  <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">{f.label}</p>
                  <p className="text-gray-800 text-sm font-semibold mt-0.5 truncate">{f.value}</p>
                </div>
              ))}
            </div>

            <div className="overflow-auto p-6 flex-1">
              <div className="rounded-2xl border border-emerald-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-emerald-50 text-emerald-800">
                      <th className="text-left text-[11px] font-bold uppercase px-4 py-2.5">Item</th>
                      <th className="text-center text-[11px] font-bold uppercase px-4 py-2.5">Carton</th>
                      <th className="text-center text-[11px] font-bold uppercase px-4 py-2.5">Qty</th>
                      <th className="text-right text-[11px] font-bold uppercase px-4 py-2.5">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(detailReturn.items || []).map((it, i) => (
                      <tr key={i} className="hover:bg-emerald-50/40">
                        <td className="px-4 py-2.5 text-gray-800 text-xs font-medium">{it.name}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600 text-xs">{Number(it.carton || 0).toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600 text-xs">{Number(it.qty || 0).toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-right text-emerald-700 text-xs font-bold">{Number(it.total || 0).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-emerald-100 bg-emerald-50/40 px-6 py-4 shrink-0">
              <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">Grand Total</span>
              <span className="text-emerald-700 text-lg font-bold">Rs. {Number(detailReturn.grandTotal || 0).toLocaleString()}</span>
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
              <h3 className="text-gray-800 text-lg font-bold">Delete Return?</h3>
              <p className="text-gray-500 text-sm mt-1.5">
                <span className="font-semibold text-gray-700">{deleteTarget.returnNo}</span> ko delete karna hai? Ye wapas nahi aayega.
              </p>
              <div className="mt-6 flex w-full gap-3">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 cursor-pointer rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50">
                  Cancel
                </button>
                <button onClick={handleDelete} className="flex-1 cursor-pointer rounded-xl bg-linear-to-r from-rose-500 to-rose-600 py-2.5 text-sm font-bold text-white shadow-md shadow-rose-200 transition-all hover:from-rose-600 hover:to-rose-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}











      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-b from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-xl font-bold">Manage Return</h1>
            <p className="text-gray-400 text-xs">Manage your Return</p>
          </div>
        </div>

      </div>



      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
          <div>
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Start Date</label>
            <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date"
              className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>
          <div>
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">End Date</label>
            <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date"
              className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>
          <button onClick={handleFind} className="px-6 py-2.5 cursor-pointer bg-linear-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5">
            Find
          </button>
          <button onClick={() => { navigate('/return') }} className="flex items-center cursor-pointer gap-2 px-4 py-2.5 bg-linear-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Return
          </button>
        </div>
      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-5 py-3 border-b border-emerald-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Show</span>
              <select className="bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1.5 text-gray-600 text-xs focus:outline-none focus:border-emerald-400 transition-all">
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
                { label: "Print", bg: "bg-emerald-500 cursor-pointer   hover:bg-emerald-600" },
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
            <input type="text" placeholder="Search..."
              className="bg-transparent text-xs text-gray-600 placeholder-gray-400 focus:outline-none w-36" />
          </div>
        </div>

        <div className="overflow-x-auto h-97 ">
          <table className="w-full text-sm border-collapse">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="bg-linear-to-b from-emerald-500 to-emerald-700 text-white">
                  {hg.headers.map((header) => {
                    const align = header.column.id === 'action' ? 'text-center' : 'text-left'
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
                      <svg className="w-10 h-10 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h11a4 4 0 010 8h-1m-8-8L3 7m0 3l2 3" />
                      </svg>
                      <p className="text-gray-400 text-sm">No Returns Found</p>
                      <p className="text-gray-300 text-xs">Create a return to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, i) => {
                  const ret = row.original
                  return (
                    <tr key={row.id} className={`hover:bg-emerald-50/40 transition-colors ${i % 2 === 1 ? "bg-gray-50/30" : ""}`}>
                      {row.getVisibleCells().map((cell) => {
                        if (cell.column.id === 'action') {
                          return (
                            <td key={cell.id} className="px-4 py-3">
                              <div className="flex items-center justify-center gap-2">
                                <ActionButton
                                  icon={ShoppingCart}
                                  label="Sale"
                                  gradient="from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                                  shadow="shadow-emerald-200 hover:shadow-md hover:shadow-emerald-300"
                                  onClick={() => setDetailReturn(ret)}
                                />
                                <ActionButton
                                  icon={Pencil}
                                  label="Update"
                                  gradient="from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600"
                                  shadow="shadow-amber-200 hover:shadow-md hover:shadow-amber-300"
                                  onClick={() => navigate('/return', { state: { editReturn: ret } })}
                                />
                                <ActionButton
                                  icon={Trash2}
                                  label="Delete"
                                  gradient="from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                                  shadow="shadow-red-200 hover:shadow-md hover:shadow-red-300"
                                  onClick={() => setDeleteTarget(ret)}
                                />
                              </div>
                            </td>
                          )
                        }
                        return (
                          <td key={cell.id} className={`px-4 py-3 text-xs whitespace-nowrap ${cell.column.id === 'returnNo' ? 'text-emerald-600 font-semibold' : 'text-gray-600'}`}>
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

        <div className="px-5 py-3 border-t border-emerald-50 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/20">
          <p className="text-xs text-gray-400">
            Showing {returns.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of {table.getFilteredRowModel().rows.length} entries
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1.5 text-xs text-gray-500 bg-white border border-emerald-100 rounded-lg hover:border-emerald-300 hover:text-emerald-600 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
              Previous
            </button>
            {table.getPageOptions().map((pg) => (
              <button
                key={pg}
                type="button"
                onClick={() => table.setPageIndex(pg)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer border ${table.getState().pagination.pageIndex === pg ? 'text-white bg-linear-to-b from-emerald-500 to-emerald-700 border-emerald-600' : 'text-gray-500 bg-white border-emerald-100 hover:border-emerald-300 hover:text-emerald-600'}`}>
                {pg + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1.5 text-xs text-gray-500 bg-white border border-emerald-100 rounded-lg hover:border-emerald-300 hover:text-emerald-600 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ManageReturn
