import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BankUpdatePopup from './BankUpdatePopup.jsx'
import { can } from '../../Utils/Permissions.js'
import BankViewPopup from './BankViewPopup.jsx'
import hblLogo from '../../assets/BankLogos/HBL.svg'
import ublLogo from '../../assets/BankLogos/UBL.svg'
import mcbLogo from '../../assets/BankLogos/MCB.png'
import faisalLogo from '../../assets/BankLogos/Faisal.png'
import ablLogo from '../../assets/BankLogos/ABL.png'
import npbLogo from '../../assets/BankLogos/nbp.jpg'
import alfalahLogo from '../../assets/BankLogos/alfalah.svg'
import meezanLogo from '../../assets/BankLogos/meezan.svg'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender, } from '@tanstack/react-table'
import { Landmark, Plus, ListOrdered, Copy, FileText, FileSpreadsheet, FileBarChart, Printer, Search, Eye, Pencil, Trash2 } from 'lucide-react';



const ManageBank = () => {
  const navigate = useNavigate();
  const [fetchBank, setFetchBank] = useState([])
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [showUpdatePopup, setShowUpdatePopup] = useState(false)
  const [updateBank, setUpdateBank] = useState(null)
  const [showViewPopup, setShowViewPopup] = useState(false)
  const [viewBank, setViewBank] = useState(null)


  async function handleFetchBank() {
    let res = await axios.get('http://localhost:3000/find/bank')
    setFetchBank(res.data)
  }
  useEffect(() => {
    handleFetchBank()
  }, [])

  async function handleDeleteBank(id) {
    try {
      await axios.delete(`http://localhost:3000/delete/bank/${id}`)
      handleFetchBank()   // table refresh
    } catch (err) {
      console.log("BANK DELETE FAILED:", err.response?.data || err.message)
    }
  }
  const columns = [
    {
      header: 'SL',
      id: 'sl',
      enableSorting: false,
      cell: (info) => (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-500 text-[11px] font-bold font-mono tabular-nums">
          {String(info.row.index + 1).padStart(2, "0")}
        </span>
      ),
    },
    {
      header: 'Bank Name',
      accessorKey: 'bankName',
      cell: (info) => {
        const bank = info.row.original
        const name = bank.bankName || ""
        const logo = getBankLogo(name)
        const tones = [
          "from-emerald-400 to-emerald-600",
          "from-sky-400 to-sky-600",
          "from-amber-400 to-amber-600",
          "from-violet-400 to-violet-600",
          "from-rose-400 to-rose-600",
        ]
        const tone = tones[name.length % tones.length]
        const initial = (name || "?").trim().charAt(0).toUpperCase()

        return (
          <div className="flex items-center gap-3">
            {logo ? (
              <img
                src={logo}
                alt={name}
                className="w-9 h-9 shrink-0 rounded-xl object-contain border border-slate-100 bg-white p-1 shadow-sm"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
            ) : null}
            <div
              className={`w-9 h-9 shrink-0 rounded-xl bg-linear-to-br ${tone} items-center justify-center text-white text-sm font-bold shadow-sm`}
              style={{ display: logo ? 'none' : 'flex' }}
            >
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-slate-800 text-sm font-semibold truncate">{name || "—"}</p>
              <p className="text-slate-400 text-[11px] truncate">{bank.branch || "—"}</p>
            </div>
          </div>
        )
      },
    },


    {
      header: 'A/C Name',
      accessorKey: 'accountName',
      cell: (info) => (
        <span className="text-slate-700 text-xs font-medium">
          {info.getValue() || <span className="text-slate-300">—</span>}
        </span>
      ),
    },
    {
      header: 'A/C Number',
      accessorKey: 'accountNumber',
      cell: (info) => {
        const num = info.getValue()
        return num ? (
          <span className="font-mono text-[11px] text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-100">
            {num}
          </span>
        ) : <span className="text-slate-300 text-xs">—</span>
      },
    },
    {
      header: 'Branch',
      accessorKey: 'branch',
      cell: (info) => {
        const br = info.getValue()
        return br ? (
          <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-medium bg-emerald-50 ring-1 ring-emerald-100 px-2 py-1 rounded-md">
            {br}
          </span>
        ) : <span className="text-slate-300 text-xs">—</span>
      },
    },
    {
      header: 'Balance',
      accessorKey: 'balance',
      cell: (info) => (
        <span className="text-slate-900 text-sm font-bold tabular-nums">
          <span className="text-slate-400 text-[10px] font-normal mr-0.5">Rs.</span>
          {Number(info.getValue() || 0).toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Action',
      id: 'action',
      enableSorting: false,
      cell: (info) => {
        const bank = info.row.original
        return (
          <div className="flex items-center justify-center gap-1">
            {can('bank', 'view') && (
              <button
                onClick={() => { setViewBank(bank); setShowViewPopup(true) }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-100 cursor-pointer transition-all hover:scale-110 active:scale-95">
                <Eye size={16} />
              </button>
            )}
            {can('bank', 'update') && (
              <button
                onClick={() => { setUpdateBank(bank); setShowUpdatePopup(true) }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-100 cursor-pointer transition-all hover:scale-110 active:scale-95">
                <Pencil size={16} />
              </button>
            )}
            {can('bank', 'delete') && (
              <button
                onClick={() => handleDeleteBank(bank._id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-100 cursor-pointer transition-all hover:scale-110 active:scale-95">
                <Trash2 size={16} />
              </button>
            )}
          </div>
        )
      },
    },
  ]

  const bankLogos = {
    "HBL": hblLogo,
    "UBL": ublLogo,
    "Faisal": faisalLogo,
    "ABL": ablLogo,
    "MCB": mcbLogo,
    "nbp": npbLogo,
    "alfalah": alfalahLogo,
    "meezan": meezanLogo,
  }

  const getBankLogo = (name) => {
    if (!name) return null
    const key = Object.keys(bankLogos).find(k =>
      name.toLowerCase().includes(k.toLowerCase())
    )
    return key ? bankLogos[key] : null
  }
  const table = useReactTable({
    data: fetchBank,
    columns: columns,
    state: {
      sorting: sorting,
      globalFilter: globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  })

  return (
    <div className="p-4 bg-slate-50 min-h-screen overflow-x-hidden">

      {showUpdatePopup && updateBank && (<BankUpdatePopup setShowUpdatePopup={setShowUpdatePopup} updateData={updateBank} handleFetchBank={handleFetchBank} />)}
      {showViewPopup && viewBank && (<BankViewPopup setShowViewPopup={setShowViewPopup} viewData={viewBank} />)}

      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2.5 pl-12 md:pl-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
            <Landmark className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-[15.5px] font-bold text-slate-900 leading-tight">Bank List</h1>
            <p className="text-[11px] text-slate-400 leading-tight">Bank List</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap mb-3.5">
        <button onClick={() => { navigate('/new/bank') }} type="button" className="flex items-center gap-1.5 bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white text-[12.5px] font-semibold rounded-lg px-4 py-2.5 shadow-sm shadow-teal-200 transition-all hover:-translate-y-0.5 cursor-pointer">
          <Plus className="w-4 h-4" />
          Add New Bank
        </button>
        <button onClick={() => { navigate('/add/new/transaction') }} type="button" className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-4 py-2.5 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
          <ListOrdered className="w-4 h-4" />
          Bank Transaction
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-[13px] font-bold text-slate-900">Bank List</p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 px-4 py-3 border-b border-slate-100">

          <div className="flex items-center gap-2 text-[12px] text-slate-500">
            <span>Show</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="border border-slate-200 rounded-md px-2 py-1 text-[12px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 cursor-pointer">
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button type="button" className="flex items-center gap-1 bg-slate-500 hover:bg-slate-600 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors cursor-pointer">
              <Copy className="w-3 h-3" />
              Copy
            </button>
            <button type="button" className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors cursor-pointer">
              <FileText className="w-3 h-3" />
              CSV
            </button>
            <button type="button" className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors cursor-pointer">
              <FileSpreadsheet className="w-3 h-3" />
              Excel
            </button>
            <button type="button" className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors cursor-pointer">
              <FileBarChart className="w-3 h-3" />
              PDF
            </button>
            <button type="button" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors cursor-pointer">
              <Printer className="w-3 h-3" />
              Print
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] text-slate-500">Search:</span>
            <div className="flex items-center gap-1.5 border border-slate-200 rounded-md px-2.5 py-1.5 bg-emerald-50/60 focus-within:border-emerald-400 transition-all">
              <Search className="w-3.5 h-3.5 text-slate-600" />
              <input
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search..." type="text" className="text-[12px] bg-transparent border-none focus:outline-none w-28" />
            </div>
          </div>
        </div>

        <div className="overflow-auto max-h-[60vh]">
          <table className="w-full min-w-205 text-left">
            <thead className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-linear-to-br from-emerald-600 to-emerald-700">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="text-[10.5px] font-semibold text-slate-100 tracking-wide px-4 py-2.5">
                      {header.column.getCanSort() ? (
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity select-none uppercase"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <span className="text-slate-300">
                            {header.column.getIsSorted() === "asc" ? (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                            ) : header.column.getIsSorted() === "desc" ? (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                            ) : (
                              <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                            )}
                          </span>
                        </button>
                      ) : (
                        <span className="uppercase tracking-wide">{flexRender(header.column.columnDef.header, header.getContext())}</span>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                        <Landmark className="w-7 h-7 text-emerald-300" />
                      </div>
                      <p className="text-slate-600 text-sm font-medium">No banks yet</p>
                      <p className="text-slate-400 text-xs">Add your first bank to see it here</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t border-slate-50 hover:bg-emerald-50/40 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-[11.5px] text-slate-400 flex-wrap gap-2.5">
          <span>
            Showing{" "}
            <span className="font-semibold text-slate-600">
              {table.getFilteredRowModel().rows.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-600">
              {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}
            </span>{" "}
            of <span className="font-semibold text-slate-600">{table.getFilteredRowModel().rows.length}</span> entries
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
              Previous
            </button>

            {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => {
              const current = table.getState().pagination.pageIndex
              if (pageIndex === 0 || pageIndex === table.getPageCount() - 1 || (pageIndex >= current - 1 && pageIndex <= current + 1)) {
                return (
                  <button
                    key={pageIndex}
                    type="button"
                    onClick={() => table.setPageIndex(pageIndex)}
                    className={`w-7 h-7 rounded-md text-xs font-semibold transition-all cursor-pointer ${current === pageIndex
                      ? "bg-emerald-600 text-white"
                      : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}>
                    {pageIndex + 1}
                  </button>
                )
              }
              if (pageIndex === current - 2 || pageIndex === current + 2) {
                return <span key={pageIndex} className="px-0.5 text-slate-400">...</span>
              }
              return null
            })}

            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ManageBank