import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { can } from '../../Utils/Permissions.js'
import { useNavigate } from 'react-router-dom';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'
import { Users, Eye, Pencil, Trash2, Plus, Copy, FileText, Sheet, File, Printer, Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

const ManageAssets = () => {
  const navigate = useNavigate()
  const [fetchAssets, setFetchAssets] = useState([])
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")

  useEffect(() => {

    async function handleFetchAsset() {
      let res = await axios.get('http://localhost:3000/find/asset')
      setFetchAssets(res.data)
    }

    handleFetchAsset()
  }, []);

  async function handleDeleteAsset(id) {

    await axios.post(`http://localhost:3000/delete/asset/${id}`)
    setFetchAssets((prev) => prev.filter((a) => a._id !== id))

  }

  const columns = [
    {
      header: 'SL',
      id: 'sl',
      enableSorting: false,
      cell: (info) => (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-gray-500 text-[11px] font-bold font-mono tabular-nums">
          {String(info.row.index + 1).padStart(2, "0")}
        </span>
      ),
    },
    {
      header: 'Assets Name',
      accessorKey: 'assetName',
      cell: (info) => {
        const asset = info.row.original
        const name = asset.assetName || ""
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
            <div className={`w-9 h-9 shrink-0 rounded-xl bg-linear-to-br ${tone} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-gray-800 text-sm font-semibold truncate">{name || "—"}</p>
              <p className="text-gray-400 text-[11px] truncate">
                {asset.purchaseDate ? new Date(asset.purchaseDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
              </p>
            </div>
          </div>
        )
      },
    },
    {
      header: 'Type',
      accessorKey: 'assetType',
      cell: (info) => {
        const type = info.getValue()
        const toneMap = {
          Furniture: "bg-amber-50 text-amber-700 ring-amber-200",
          Vehicle: "bg-sky-50 text-sky-700 ring-sky-200",
          Machinery: "bg-violet-50 text-violet-700 ring-violet-200",
          Electronics: "bg-emerald-50 text-emerald-700 ring-emerald-200",
          Building: "bg-rose-50 text-rose-700 ring-rose-200",
        }
        return type ? (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ring-1 ${toneMap[type] || "bg-gray-50 text-gray-600 ring-gray-200"}`}>
            {type}
          </span>
        ) : <span className="text-gray-300 text-xs">—</span>
      },
    },
    {
      header: 'Cost',
      accessorKey: 'cost',
      cell: (info) => (
        <span className="text-gray-800 text-sm font-bold tabular-nums">
          <span className="text-gray-400 text-[10px] font-normal mr-0.5">Rs.</span>
          {Number(info.getValue() || 0).toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Location',
      accessorKey: 'location',
      cell: (info) => {
        const loc = info.getValue()
        return loc ? (
          <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-medium bg-emerald-50 ring-1 ring-emerald-100 px-2 py-1 rounded-md">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {loc}
          </span>
        ) : <span className="text-gray-300 text-xs">—</span>
      },
    },
    {
      header: 'Description',
      accessorKey: 'description',
      enableSorting: false,
      cell: (info) => (
        <span className="text-gray-500 text-xs line-clamp-2 max-w-40 inline-block">
          {info.getValue() || <span className="text-gray-300">—</span>}
        </span>
      ),
    },
    {
      header: 'Action',
      id: 'action',
      enableSorting: false,
      cell: (info) => {
        const asset = info.row.original
        return (
          <div className="flex items-center gap-1">
            {can('assets', 'view') && (
              <button className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-100 cursor-pointer transition-all hover:scale-110 active:scale-95">
                <Eye size={16} />
              </button>
            )}
            {can('assets', 'update') && (
              <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-100 cursor-pointer transition-all hover:scale-110 active:scale-95">
                <Pencil size={16} />
              </button>
            )}
            {can('assets', 'delete') && (
              <button onClick={() => handleDeleteAsset(asset._id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-100 cursor-pointer transition-all hover:scale-110 active:scale-95">
                <Trash2 size={16} />
              </button>
            )}
          </div>
        )
      },
    },
  ]
  const table = useReactTable({
    data: fetchAssets,
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 p-4 md:p-6">


      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-blue-200">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-gray-800 text-xl font-bold">Manage Assets</h1>
            <p className="text-gray-400 text-xs">Manage your Assets</p>
          </div>
        </div>

        <button onClick={() => { navigate('/assets') }} className="flex items-center gap-2 bg-linear-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white  shadow-blue-200  text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 font-semibold px-4 py-2.5 rounded-xl shadow-md stransition-all cursor-pointer">
          <Plus className="w-4 h-4" />
          Add Assets
        </button>

      </div>


      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-5">


        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">


          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Show</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className="bg-blue-50 border border-blue-100 rounded-lg px-2 py-1.5 text-gray-600 text-xs focus:outline-none focus:border-emerald-400 cursor-pointer"
              >
                {[10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <span>entries</span>
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


          <div className="flex items-center gap-2 bg-white border border-blue-100 rounded-xl px-3 py-2 focus-within:border-emerald-400 transition-all w-full sm:w-72">
            <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search assets..."
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-full"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">



        </div>
        <div className="overflow-auto rounded-xl border border-blue-100 h-115">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-linear-to-b from-emerald-500 to-emerald-700 text-white">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="text-left px-4 py-3 font-semibold text-sm uppercase tracking-wide">
                      {header.column.getCanSort() ? (
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer select-none"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <span className="text-white/70">
                            {header.column.getIsSorted() === "asc" ? (
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                            ) : header.column.getIsSorted() === "desc" ? (
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                            ) : (
                              <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                            )}
                          </span>
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
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
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                        <Users className="w-7 h-7 text-blue-200" />
                      </div>
                      <p className="text-gray-500 text-sm font-medium">No Assets record found</p>
                      <p className="text-gray-400 text-xs">Click Add Assets</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t border-blue-50 hover:bg-emerald-50/50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-gray-700 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>


        <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">

          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className=" text-gray-500">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            </span>{" "}
            to{" "}
            <span className=" text-gray-500">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}
            </span>{" "}
            of{" "}
            <span className=" text-gray-500">{table.getFilteredRowModel().rows.length}</span>{" "}
            entries
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-blue-100 bg-white text-gray-500 hover:border-emerald-300 hover:text-emerald-600 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => {
              const current = table.getState().pagination.pageIndex
              if (
                pageIndex === 0 ||
                pageIndex === table.getPageCount() - 1 ||
                (pageIndex >= current - 1 && pageIndex <= current + 1)
              ) {
                return (
                  <button
                    key={pageIndex}
                    onClick={() => table.setPageIndex(pageIndex)}
                    className={`w-8 h-8 text-xs font-semibold rounded-lg transition-all cursor-pointer ${current === pageIndex
                      ? "bg-linear-to-b from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-200"
                      : "border border-blue-100 bg-white text-gray-500 hover:border-emerald-300 hover:text-emerald-600"
                      }`}
                  >
                    {pageIndex + 1}
                  </button>
                )
              }
              if (pageIndex === current - 2 || pageIndex === current + 2) {
                return <span key={pageIndex} className="px-1 text-gray-400 text-xs">...</span>
              }
              return null
            })}

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-blue-100 bg-white text-gray-500 hover:border-emerald-300 hover:text-emerald-600 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ManageAssets
