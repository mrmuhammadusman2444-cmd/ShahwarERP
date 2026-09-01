import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'

const DispatchOrder = () => {
 
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()
  const [detailOrder, setDetailOrder] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
   const [sorting, setSorting] = useState([])
  const [search, setSearch] = useState("")
  const [entries, setEntries] = useState(10)

  function weightText(w) {
    w = Number(w) || 0
    return w >= 1000 ? `${Math.floor(w / 1000)} ton${w % 1000 > 0 ? ` ${w % 1000} kg` : ""}` : `${w} kg`
  }
  function fmtDate(d) {
    return d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"
  }

  const columns = useMemo(() => [
    { id: 'sl', header: 'SL.', enableSorting: false, cell: ({ row, table }) => table.getState().pagination.pageIndex * table.getState().pagination.pageSize + row.index + 1 },
    { accessorKey: 'orderNo', header: 'Order No' },
    { accessorKey: 'customerName', header: 'Customer Name', cell: (i) => i.getValue() || "—" },
    { id: 'orderDate', accessorFn: (r) => r.orderDate ? new Date(r.orderDate).getTime() : 0, header: 'Date', cell: ({ row }) => fmtDate(row.original.orderDate) },
    { id: 'deliveryDate', accessorFn: (r) => r.deliveryDate ? new Date(r.deliveryDate).getTime() : 0, header: 'Delivery Date', cell: ({ row }) => fmtDate(row.original.deliveryDate) },
    { id: 'weight', accessorFn: (r) => Number(r.totalWeight) || 0, header: 'Weight', cell: ({ row }) => weightText(row.original.totalWeight) },
    { id: 'status', header: 'Status', enableSorting: false },
    { id: 'action', header: 'Action', enableSorting: false },
  ], [copiedId])

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

  function handleCopy(order) {
    let lines = []
    lines.push(`Order: ${order.orderNo}`)
    lines.push(`Customer: ${order.customerName || "-"}`)
    lines.push(`Date: ${order.orderDate ? new Date(order.orderDate).toLocaleDateString("en-GB") : "-"}`)
    lines.push(`Delivery: ${order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString("en-GB") : "-"}`)
    lines.push(`--------------------`)
      ; (order.items || []).forEach((it) => {
        lines.push(`${it.name} — ${Number(it.carton || 0)} carton`)
      })
    lines.push(`--------------------`)
    lines.push(`Total Weight: ${Number(order.totalWeight || 0)} kg`)
    lines.push(`Grand Total: Rs. ${Number(order.grandTotal || 0).toLocaleString()}`)

    navigator.clipboard.writeText(lines.join("\n"))
    setCopiedId(order._id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        let res = await axios.get('http://localhost:3000/find/orders')
        setOrders(res.data)
      } catch (err) {
        console.log("DISPATCH ORDERS FAILED:", err.response?.data || err.message)
      }
    }
    fetchOrders()
  }, [])


  return (
    <div className="p-4 md:p-5">

      <div className="flex items-center justify-between mb-4 pl-12 md:pl-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-b from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-blue-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">Manage Dispatch Order</h1>
            <p className="text-gray-400 text-xs">Manage Dispatch Order</p>
          </div>
        </div>

      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">

        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-emerald-50">
          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={() => window.print()}
              type="button"
              className="w-9 h-9 bg-linear-to-br from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white rounded-lg flex items-center justify-center shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" />
              </svg>
            </button>
            <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-xl p-1">
              {[10, 25, 50, 100].map((num) => (
                <button key={num} type="button" onClick={() => setEntries(num)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${entries === num ? 'bg-linear-to-b from-emerald-500 to-emerald-600 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700'}`}>
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 focus-within:border-emerald-400 focus-within:bg-white transition-all">
            <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search orders..."
              className="bg-transparent text-xs text-gray-600 placeholder-gray-400 focus:outline-none w-40" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-sm">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="bg-linear-to-b from-emerald-500 to-emerald-700">
                  {hg.headers.map((header) => {
                    const canSort = header.column.getCanSort()
                    const sorted = header.column.getIsSorted()
                    return (
                      <th key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`text-left text-slate-100 font-bold px-4 py-2.5 whitespace-nowrap text-xs ${canSort ? 'cursor-pointer select-none' : ''}`}>
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
                        <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-14">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="text-gray-400 text-xs font-medium">No dispatch orders found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, i) => {
                  const order = row.original
                  return (
                    <tr key={row.id} className={`border-b border-emerald-50 hover:bg-emerald-50/40 transition-colors ${i % 2 === 1 ? "bg-gray-50/30" : ""}`}>
                      {row.getVisibleCells().map((cell) => {
                        if (cell.column.id === 'status') {
                          return (
                            <td key={cell.id} className="px-4 py-3">
                              <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 ring-1 ring-amber-200">Pending</span>
                            </td>
                          )
                        }
                        if (cell.column.id === 'action') {
                          return (
                            <td key={cell.id} className="px-4 py-3">
                              <div className="flex items-center gap-1.5">
                                {[
                                  { label: "Order Details", cls: "bg-emerald-600 hover:bg-emerald-700", onClick: () => setDetailOrder(order), icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></> },
                                  { label: "Add to Invoice", cls: "bg-amber-500 hover:bg-amber-600", onClick: () => navigate('/newSale', { state: { fromOrder: order } }), icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 14l2 2 4-4" /> },
                                  { label: copiedId === order._id ? "Copied!" : "Copy to Clipboard", cls: copiedId === order._id ? "bg-emerald-600" : "bg-sky-500 hover:bg-sky-600", onClick: () => handleCopy(order), icon: copiedId === order._id ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /> },
                                ].map((btn, bi) => (
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
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-emerald-50 bg-emerald-50/20">
          <p className="text-xs text-gray-400">
            Showing {orders.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of {table.getFilteredRowModel().rows.length} entries
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

export default DispatchOrder
