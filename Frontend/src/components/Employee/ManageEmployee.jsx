import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { can } from '../../Utils/Permissions.js'
import EmployeeUpdatePopup from './EmployeeUpdatePopup.jsx'
import EmployeeViewModal from './EmployeeViewModal.jsx'
import { Users, Copy, FileText, FileSpreadsheet, FileBarChart, Printer, Search, Eye, Pencil, Trash2, Phone } from 'lucide-react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender, } from '@tanstack/react-table'

const ManageEmployee = () => {

  const [fetchEmployee, setFetchEmployee] = useState([])
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [showUpdatePopup, setShowUpdatePopup] = useState(false)
  const [updateEmployee, setUpdateEmployee] = useState(null)
  const [showViewPopup, setShowViewPopup] = useState(false)
  const [viewEmployee, setViewEmployee] = useState(null)


  async function handleFetchAllEmployee() {
    try {
      let empRes = await axios.get('http://localhost:3000/find/employee')
      let userRes = await axios.get('http://localhost:3000/all/users')

      const users = userRes.data
        .filter((u) => u.role !== "Admin")
        .map((u) => ({
          _id: u._id,
          firstName: u.firstName,
          lastName: u.lastName,
          designation: u.designation || u.role || "System User",
          phone: u.phoneNo || "",
          email: u.email,
          rateType: u.rateType || "",
          hourRateSalary: u.hourRateSalary || 0,
          bloodGroup: u.bloodGroup || "",
          addressLine1: u.addressLine1 || "",
          addressLine2: u.addressLine2 || "",
          city: u.city || "",
          zipCode: u.zipCode || "",
          picture: u.image || "",
          isUser: true,
        }))

      setFetchEmployee([...users, ...empRes.data])
    } catch (err) {
      console.log("LOAD FAILED:", err.response?.data || err.message)
    }
  }

  useEffect(() => {
    handleFetchAllEmployee()
  }, [])

  async function handleDeleteEmployee(item) {

    try {
      if (item.isUser) {
        await axios.delete(`http://localhost:3000/delete/user/${item._id}`)
      } else {
        await axios.delete(`http://localhost:3000/delete/employee/${item._id}`)
      }
      handleFetchAllEmployee()
    } catch (err) {
      console.log("DELETE FAILED:", err.response?.data || err.message)
    }
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
      header: 'Name',
      id: 'name',
      accessorFn: (row) => `${row.firstName || ""} ${row.lastName || ""}`,
      cell: (info) => {
        const emp = info.row.original
        const name = `${emp.firstName || ""} ${emp.lastName || ""}`.trim()
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
            {emp.picture ? (
              <img src={`http://localhost:3000${emp.picture}`} alt={name} className="w-9 h-9 shrink-0 rounded-xl object-cover shadow-sm" />
            ) : (
              <div className={`w-9 h-9 shrink-0 rounded-xl bg-linear-to-br ${tone} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                {initial}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-gray-800 text-sm font-semibold truncate">{name || "—"}</p>
              <p className="text-gray-400 text-[11px] truncate">{emp.email || "—"}</p>
            </div>
          </div>
        )
      },
    },
    {
      header: 'Designation',
      accessorKey: 'designation',
      cell: (info) => {
        const d = info.getValue()
        return d ? (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md ring-1 bg-emerald-50 text-emerald-700 ring-emerald-200">
            {d}
          </span>
        ) : <span className="text-gray-300 text-xs">—</span>
      },
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
      cell: (info) => {
        const p = info.getValue()
        return p ? (
          <span className="inline-flex items-center gap-1.5 text-gray-600 text-xs">
            <Phone className="w-3 h-3 text-gray-400" />
            {p}
          </span>
        ) : <span className="text-gray-300 text-xs">—</span>
      },
    },
    {
      header: 'Rate Type',
      accessorKey: 'rateType',
      cell: (info) => {
        const r = info.getValue()
        return r ? (
          <span className="text-[11px] font-medium px-2 py-1 rounded-md bg-sky-50 text-sky-700 ring-1 ring-sky-100">
            {r}
          </span>
        ) : <span className="text-gray-300 text-xs">—</span>
      },
    },
    {
      header: 'Salary / Rate',
      accessorKey: 'hourRateSalary',
      cell: (info) => (
        <span className="text-gray-800 text-sm font-bold tabular-nums">
          <span className="text-gray-400 text-[10px] font-normal mr-0.5">Rs.</span>
          {Number(info.getValue() || 0).toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Action',
      id: 'action',
      enableSorting: false,
      cell: (info) => {
        const emp = info.row.original
        return (
          <div className="flex items-center gap-1">

            {can('salary', 'view') && (
              <button
                onClick={() => { setViewEmployee(emp); setShowViewPopup(true) }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-100 cursor-pointer transition-all hover:scale-110 active:scale-95">
                <Eye size={16} />
              </button>
            )}

            {can('salary', 'update') && (
              <button
                onClick={() => { setUpdateEmployee(emp); setShowUpdatePopup(true) }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-100 cursor-pointer transition-all hover:scale-110 active:scale-95">
                <Pencil size={16} />
              </button>
            )}

            {can('salary', 'delete') && (
              <button onClick={() => handleDeleteEmployee(emp)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-100 cursor-pointer transition-all hover:scale-110 active:scale-95">
                <Trash2 size={16} />
              </button>
            )}

          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: fetchEmployee,
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
    <div className="p-4 md:p-5 overflow-x-hidden">

      {showUpdatePopup && updateEmployee && (<EmployeeUpdatePopup setShowUpdatePopup={setShowUpdatePopup} updateData={updateEmployee} handleFetchAllEmployee={handleFetchAllEmployee} />)}
      {showViewPopup && viewEmployee && (<EmployeeViewModal setShowViewPopup={setShowViewPopup} viewData={viewEmployee} />)}

      <div className="flex items-center justify-between mb-4 pl-12 md:pl-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">Manage Employee</h1>
            <p className="text-gray-400 text-xs">Manage Employee Information</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-4 py-3 border-b border-emerald-50">
          <h2 className="text-gray-700 text-sm font-bold">Manage Employee</h2>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-emerald-50">

          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs">Show</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-lg px-2 py-1 text-gray-700 text-xs focus:outline-none cursor-pointer appearance-none">
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <span className="text-gray-500 text-xs">entries</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button type="button" className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white text-xs font-semibold rounded-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">Copy</button>
            <button type="button" className="px-3 py-1.5 bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold rounded-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">CSV</button>
            <button type="button" className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">Excel</button>
            <button type="button" className="px-3 py-1.5 bg-red-500 hover:bg-red-400 text-white text-xs font-semibold rounded-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">PDF</button>
            <button type="button" className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-white text-xs font-semibold rounded-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">Print</button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs">Search:</span>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search Employee"
                type="text"
                className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-lg pl-8 pr-3 py-1.5 text-gray-700 text-xs focus:outline-none transition-all w-36 sm:w-48"
              />
            </div>
          </div>

        </div>

        <div className="overflow-auto max-h-[60vh]">
          <table className="w-full min-w-220 text-sm">
            <thead className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-linear-to-r from-emerald-600 to-emerald-700 border-b border-emerald-100">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="text-left text-gray-50 font-bold px-4 py-2.5 whitespace-nowrap">
                      {header.column.getCanSort() ? (
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity select-none"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <span className="text-gray-50/70">
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
                  <td colSpan={columns.length} className="text-center py-14">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                        <Users className="w-7 h-7 text-emerald-300" />
                      </div>
                      <p className="text-gray-600 text-sm font-medium">No employees found</p>
                      <p className="text-gray-400 text-xs">Add your first employee to see them here</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t border-emerald-50 hover:bg-emerald-50/40 transition-colors">
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

        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-emerald-50">
          <p className="text-gray-500 text-xs">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {table.getFilteredRowModel().rows.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-700">
              {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}
            </span>{" "}
            of <span className="font-semibold text-gray-700">{table.getFilteredRowModel().rows.length}</span> entries
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-gray-500 text-xs font-semibold rounded-lg transition-all cursor-pointer border border-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed">
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
                    className={`w-8 h-8 text-xs font-semibold rounded-lg transition-all cursor-pointer ${current === pageIndex
                      ? "bg-linear-to-b from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-200"
                      : "bg-emerald-50 hover:bg-emerald-100 text-gray-500 border border-emerald-100"
                      }`}>
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
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-gray-500 text-xs font-semibold rounded-lg transition-all cursor-pointer border border-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ManageEmployee