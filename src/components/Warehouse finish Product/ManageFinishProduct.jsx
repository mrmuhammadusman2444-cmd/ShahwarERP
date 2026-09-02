import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'

const ManageFinishProduct = () => {
  const navigate = useNavigate()
  const [FinishOrders, setFinishOrders] = useState([])
  const [sorting, setSorting] = useState([])
  const [search, setSearch] = useState("")
  const [entries, setEntries] = useState(10)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [allFinish, setAllFinish] = useState([])
  const [posOrder, setPosOrder] = useState(null)

  useEffect(() => {
    async function fetchFinish() {
      try {
        let res = await axios.get('http://localhost:3000/find/finish-products')
        setFinishOrders(res.data)
        setAllFinish(res.data)
      } catch (err) {
        console.log("FINISH FETCH FAILED:", err.response?.data || err.message)
      }
    }
    fetchFinish()
  }, [])

  function fmtDate(d) {
    return d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"
  }

  function handleFind() {
    if (!startDate && !endDate) {
      setFinishOrders(allFinish)
      return
    }
    let filtered = allFinish.filter((fp) => {
      if (!fp.date) return false
      let d = new Date(fp.date)
      let from = startDate ? new Date(startDate) : null
      let to = endDate ? new Date(endDate) : null
      if (to) to.setHours(23, 59, 59, 999)
      if (from && d < from) return false
      if (to && d > to) return false
      return true
    })
    setFinishOrders(filtered)
  }

  const columns = useMemo(() => [
    { id: 'sl', header: 'SL.', enableSorting: false, cell: ({ row, table }) => table.getState().pagination.pageIndex * table.getState().pagination.pageSize + row.index + 1 },
    { accessorKey: 'finishNo', header: 'Finish No' },
    { accessorKey: 'saleBy', header: 'Sale By', cell: (i) => i.getValue() || "—" },
    { accessorKey: 'employeeName', header: 'Employee Name', cell: (i) => i.getValue() || "—" },
    { id: 'date', accessorFn: (r) => r.date ? new Date(r.date).getTime() : 0, header: 'Date', cell: ({ row }) => fmtDate(row.original.date) },
    { id: 'action', header: 'Action', enableSorting: false },
  ], [])

  const table = useReactTable({
    data: FinishOrders,
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
      {posOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setPosOrder(null)}>
          <div className="relative w-full max-w-xs" onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center justify-end gap-2 mb-2">
              <button onClick={() => window.print()} className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" /></svg>
                Print
              </button>
              <button onClick={() => setPosOrder(null)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-500 hover:bg-rose-50 hover:text-rose-500 cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div id="pos-receipt" className="bg-white rounded-lg shadow-2xl px-5 py-5 font-mono text-[11px] text-gray-800 leading-relaxed">
              <div className="text-center mb-3">
                <h3 className="text-base font-bold tracking-wide">SHAHWAR FOODS</h3>
                <p className="text-[10px] text-gray-500">Near PSO Depot, D I KHAN Road, Bannu</p>
                <p className="text-[10px] text-gray-500">Tel: 0300-0000000</p>
              </div>

              <div className="border-t border-dashed border-gray-300 pt-2 mb-2 text-[10px]">
                <div className="flex justify-between"><span>Bill No:</span><span className="font-bold">{posOrder.finishNo}</span></div>
                <div className="flex justify-between"><span>Date:</span><span>{new Date().toLocaleDateString("en-GB")}</span></div>
                <div className="flex justify-between"><span>Emp:</span><span>{posOrder.employeeName || "-"}</span></div>
              </div>

              <div className="border-t border-dashed border-gray-300 pt-2">
                <div className="flex justify-between font-bold border-b border-gray-200 pb-1 mb-1">
                  <span className="flex-1">Item</span>
                  <span className="w-8 text-center">Qty</span>
                  <span className="w-14 text-right">Amount</span>
                </div>
                {(posOrder.items || []).map((it, i) => (
                  <div key={i} className="flex justify-between py-0.5">
                    <span className="flex-1 truncate pr-1">{it.name}</span>
                    <span className="w-8 text-center">{Number(it.carton || 0)}</span>
                    <span className="w-14 text-right">{Number(it.total || (it.carton * it.cartonSize * (it.rate || 0)) || 0).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-gray-300 mt-2 pt-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>TOTAL</span>
                  <span>Rs. {(posOrder.items || []).reduce((s, it) => s + (Number(it.total || (it.carton * it.cartonSize * (it.rate || 0)) || 0)), 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="text-center mt-3 border-t border-dashed border-gray-300 pt-2">
                <p className="text-[10px] text-gray-500">Thank you for your business!</p>
                <p className="text-[9px] text-gray-400 mt-0.5">www.shahwarfoods.com.pk</p>
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
            <h1 className="text-gray-800 text-xl font-bold">Manage Finished Products</h1>
            <p className="text-gray-400 text-xs">Manage your Finished Products</p>
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
          <button onClick={() => { navigate('/newfinishproductpage') }} className="flex items-center cursor-pointer gap-2 px-4 py-2.5 bg-linear-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Finished Product
          </button>
        </div>
      </div>

      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-5 py-3 border-b border-blue-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Show</span>
              <select value={entries} onChange={(e) => setEntries(Number(e.target.value))} className="bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1.5 text-gray-600 text-xs focus:outline-none focus:border-emerald-400 transition-all cursor-pointer">
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

          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 focus-within:border-emerald-400 transition-all">
            <svg className="w-3.5 h-3.5 text-emerald-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..."
              className="bg-transparent text-xs text-gray-600 placeholder-gray-400 focus:outline-none w-36" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full  text-sm border-collapse">
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
                  <td colSpan={6} className="text-center py-16">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-10 h-10 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="text-gray-400 text-sm">No Records Found</p>
                      <p className="text-gray-300 text-xs">Add a new finished product to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, i) => {
                  const fp = row.original
                  return (
                    <tr key={row.id} className={`hover:bg-emerald-50/40 transition-colors ${i % 2 === 1 ? "bg-gray-50/30" : ""}`}>
                      {row.getVisibleCells().map((cell) => {
                        if (cell.column.id === 'action') {
                          return (
                            <td key={cell.id} className="px-4 py-3">
                              <div className="flex items-center justify-center gap-1.5">
                                {[
                                  { label: "POS Sale", cls: "bg-emerald-600 hover:bg-emerald-700", onClick: () => setPosOrder(fp), icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> },
                                  { label: "Update", cls: "bg-sky-500 hover:bg-sky-600", onClick: () => { console.log(">>> UPDATE CLICK:", fp); navigate('/newfinishproductpage', { state: { editFinish: fp } }) }, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /> },].map((btn, bi) => (
                                    <motion.button
                                      key={bi}
                                      onClick={btn.onClick}
                                      whileHover={{ y: -3, scale: 1.12 }}
                                      whileTap={{ scale: 0.85 }}
                                      transition={{ type: "spring", stiffness: 500, damping: 18 }}
                                      className={`group/tip relative flex h-7 w-7 items-center justify-center rounded-lg text-white shadow-sm cursor-pointer ${btn.cls}`}
                                    >
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{btn.icon}</svg>
                                      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 scale-90 opacity-0 group-hover/tip:opacity-100 group-hover/tip:scale-100 transition-all duration-200 whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg z-30">
                                        {btn.label}
                                        <span className="absolute left-1/2 top-full -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-800" />
                                      </span>
                                    </motion.button>
                                  ))}
                              </div>
                            </td>
                          )
                        }
                        return (
                          <td key={cell.id} className={`px-4 py-3 text-xs whitespace-nowrap ${cell.column.id === 'finishNo' ? 'text-emerald-600 font-semibold' : 'text-gray-600'}`}>
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
            Showing {FinishOrders.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of {table.getFilteredRowModel().rows.length} entries
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

export default ManageFinishProduct
