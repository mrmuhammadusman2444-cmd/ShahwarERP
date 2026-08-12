import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { HandCoins, Search, Loader2, Users } from 'lucide-react'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender, } from '@tanstack/react-table'

const ManageEmployeeSalary = () => {

  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7))
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  function daysInMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate()
  }
  async function handleFind() {
    if (!month) {
      alert("Salary Month select karo")
      return
    }
    setLoading(true)
    try {
      const [yearStr, monthStr] = month.split("-")
      const year = parseInt(yearStr)
      const monthIndex = parseInt(monthStr) - 1
      const totalDays = daysInMonth(year, monthIndex)

      const from = `${month}-01`
      const to = `${month}-${String(totalDays).padStart(2, "0")}`

      const empRes = await axios.get('http://localhost:3000/find/employee')
      const userRes = await axios.get('http://localhost:3000/all/users')

      const users = userRes.data
        .filter((u) => u.role !== "Admin")
        .map((u) => ({
          _id: u._id,
          firstName: u.firstName,
          lastName: u.lastName,
          designation: u.designation || u.role || "System User",
          hourRateSalary: u.hourRateSalary || 0,
        }))
      const emps = empRes.data.map((e) => ({
        _id: e._id,
        firstName: e.firstName,
        lastName: e.lastName,
        designation: e.designation || "",
        hourRateSalary: e.hourRateSalary || 0,
      }))
      const allEmployees = [...users, ...emps]

      const attRes = await axios.get(`http://localhost:3000/attendance/report?from=${from}&to=${to}`)
      const attendance = attRes.data

      const holRes = await axios.get('http://localhost:3000/find/holidays')
      const holidays = holRes.data.filter((h) => h.date >= from && h.date <= to).map((h) => h.date)

      // aaj ki date
      const today = new Date()
      const lastDay = (year === today.getFullYear() && monthIndex === today.getMonth())
        ? today.getDate()     // current month — aaj tak
        : totalDays           // purana month — poore din

      let fridayCount = 0
      for (let d = 1; d <= lastDay; d++) {
        if (new Date(year, monthIndex, d).getDay() === 5) fridayCount++
      }
      const eidNonFriday = holidays.filter((hd) => {
        const hDate = new Date(hd)
        return hDate.getDay() !== 5 && hDate.getDate() <= lastDay
      }).length
      const totalHolidays = fridayCount + eidNonFriday

      const result = allEmployees.map((emp) => {
        const empAtt = attendance.filter((a) => a.employeeId === emp._id)

        const present = empAtt.filter((a) => a.status === "present").length
        const absent = empAtt.filter((a) => a.status === "absent").length
        const leave = empAtt.filter((a) => a.status === "leave").length
        const overtime = empAtt.reduce((sum, a) => sum + (Number(a.overtime) || 0), 0)

        const monthlySalary = Number(emp.hourRateSalary) || 0
        const perDay = totalDays > 0 ? monthlySalary / totalDays : 0


        const overtimePay = overtime * (perDay / 8.5)
        const finalSalary = empAtt.length === 0
          ? 0
          : Math.round((present + leave) * perDay + overtimePay)

        return {
          _id: emp._id,
          name: `${emp.firstName || ""} ${emp.lastName || ""}`.trim(),
          designation: emp.designation || "—",
          totalDays,
          present,
          absent,
          leave,
          holidays: totalHolidays,
          overtime,
          monthlySalary,
          finalSalary,
        }
      })

      setRows(result)
    } catch (err) {
      console.log("SALARY CALC FAILED:", err.response?.data || err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    handleFind()
  }, [])

  const columns = [
    {
      header: 'SL', id: 'sl', enableSorting: false,
      cell: (info) => (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-500 text-[11px] font-bold font-mono tabular-nums">
          {String(info.row.index + 1).padStart(2, "0")}
        </span>
      ),
    },

    {
      header: 'Name', accessorKey: 'name',
      cell: (info) => {
        const name = info.getValue() || ""
        const emp = info.row.original
        const tones = ["from-emerald-400 to-emerald-600", "from-sky-400 to-sky-600", "from-amber-400 to-amber-600", "from-violet-400 to-violet-600", "from-rose-400 to-rose-600"]
        const tone = tones[name.length % tones.length]
        const initials = name.split(" ").map((n) => n.charAt(0)).join("").slice(0, 2).toUpperCase()
        return (
          <div onClick={() => generateSlip(emp)} className="flex items-center gap-2.5 cursor-pointer group">
            <div className={`w-8 h-8 shrink-0 rounded-lg bg-linear-to-br ${tone} flex items-center justify-center text-white text-[11px] font-bold shadow-sm`}>{initials || "?"}</div>
            <span className="text-slate-800 text-[12.5px] font-semibold group-hover:text-emerald-600 group-hover:underline transition-colors">{name || "—"}</span>
          </div>
        )
      },
    },



    { header: 'Designation', accessorKey: 'designation', cell: (info) => <span className="text-[12px] text-slate-600">{info.getValue()}</span> },
    { header: 'T-Days', accessorKey: 'totalDays', cell: (info) => <span className="text-[12px] text-slate-600">{info.getValue()}</span> },
    { header: 'Present', accessorKey: 'present', cell: (info) => <span className="text-[12px] font-semibold text-emerald-700">{info.getValue()}</span> },
    { header: 'Absent', accessorKey: 'absent', cell: (info) => <span className="text-[12px] font-semibold text-rose-600">{info.getValue()}</span> },
    { header: 'Leave', accessorKey: 'leave', cell: (info) => <span className="text-[12px] font-semibold text-amber-600">{info.getValue()}</span> },
    { header: 'Holidays', accessorKey: 'holidays', cell: (info) => <span className="text-[12px] text-slate-600">{info.getValue()}</span> },
    { header: 'OT (hrs)', accessorKey: 'overtime', cell: (info) => <span className="text-[12px] text-slate-600">{info.getValue()}</span> },
    { header: 'Monthly', accessorKey: 'monthlySalary', cell: (info) => <span className="text-[12px] text-slate-500">Rs. {Number(info.getValue()).toLocaleString()}</span> },
    { header: 'Net Salary', accessorKey: 'finalSalary', cell: (info) => <span className="text-[13px] font-bold text-emerald-700">Rs. {Number(info.getValue()).toLocaleString()}</span> },
  ]

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 7 } },
  })

  function generateSlip(emp) {
    const monthName = new Date(month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    const perDay = emp.totalDays > 0 ? emp.monthlySalary / emp.totalDays : 0
    const absentAmount = Math.round(emp.absent * perDay)
    const overtimeAmount = Math.round(emp.overtime * (perDay / 8.5))

    const html = `
    <html>
    <head>
    <meta charset="utf-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            width: 300px;
            margin: 0 auto;
            padding: 16px 12px;
            color: #000;
            background: #fff;
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .line { border-top: 1px dashed #000; margin: 8px 0; }
        .row { display: flex; justify-content: space-between; margin: 3px 0; }
        .title { font-size: 15px; font-weight: bold; text-align: center; margin-bottom: 2px; }
        .sub { font-size: 11px; text-align: center; color: #333; }
        .net { font-size: 14px; font-weight: bold; }
        .print-btn {
            display: block; width: 100%; margin-top: 12px;
            padding: 6px; background: #000; color: #fff;
            border: none; font-family: 'Courier New', monospace;
            font-size: 12px; cursor: pointer;
        }
        @media print { .print-btn { display: none; } }
    </style>
    </head>
    <body>
        <p class="title">SHAHWAR FOODS</p>
        <p class="sub">Salary Slip</p>
        <p class="sub">${monthName}</p>

        <div class="line"></div>

        <p class="bold">${emp.name}</p>
        <p style="font-size:11px">${emp.designation}</p>

        <div class="line"></div>

        <div class="row"><span>Working Days</span><span>${emp.totalDays}</span></div>
        <div class="row"><span>Present</span><span>${emp.present}</span></div>
        <div class="row"><span>Absent</span><span>${emp.absent}</span></div>
        <div class="row"><span>Leave</span><span>${emp.leave}</span></div>
        <div class="row"><span>Overtime</span><span>${emp.overtime} hrs</span></div>

        <div class="line"></div>

        <div class="row"><span>Basic Salary</span><span>Rs. ${emp.monthlySalary.toLocaleString()}</span></div>
        <div class="row"><span>Overtime Pay</span><span>Rs. ${overtimeAmount.toLocaleString()}</span></div>
        <div class="row"><span>Absent Deduction</span><span>-Rs. ${absentAmount.toLocaleString()}</span></div>

        <div class="line"></div>

        <div class="row net">
            <span>NET PAYABLE</span>
            <span>Rs. ${emp.finalSalary.toLocaleString()}</span>
        </div>

        <div class="line"></div>

        <p class="sub" style="margin-top:16px">________________</p>
        <p class="sub">Authorized Signature</p>
        <p class="sub" style="margin-top:12px">Thank You!</p>
        <p class="sub" style="font-size:10px;margin-top:4px">Shahwar Foods ERP</p>

        <button class="print-btn" onclick="window.print()">PRINT</button>
    </body>
    </html>
    `

    const w = window.open('', '_blank', 'width=340,height=600')
    w.document.write(html)
    w.document.close()
  }

  return (
    <div className="p-4 bg-slate-50 min-h-screen overflow-x-hidden">

      <div className="flex items-center gap-2.5 mb-4 pl-12 md:pl-0">
        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
          <HandCoins className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <h1 className="text-[15.5px] font-bold text-slate-900 leading-tight">Manage Employee Salary</h1>
          <p className="text-[11px] text-slate-400 leading-tight">Fixed salary, absent-based deduction</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-4">
        <div className="flex items-end gap-3 flex-wrap">
          <div>
            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Salary Month <span className="text-red-500">*</span></label>
            <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="text-[12.5px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all w-48" />
          </div>
          <button onClick={handleFind} disabled={loading} className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-6 py-2.5 shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-60">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Find
          </button>
        </div>
      </div>

      {/* table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 flex-wrap gap-3">
          <p className="text-[13px] font-bold text-slate-900">Employee Salary</p>
          <div className="flex items-center gap-1.5 border border-slate-200 rounded-md px-2.5 py-1.5 bg-emerald-50/60 focus-within:border-emerald-400 transition-all">
            <Search className="w-3.5 h-3.5 text-slate-600" />
            <input value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." className="text-[12px] bg-transparent border-none focus:outline-none w-28" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-250 text-left">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="bg-linear-to-r from-emerald-600 to-emerald-700">
                  {hg.headers.map((header) => (
                    <th key={header.id} className="text-[12px] font-bold text-slate-50 px-3 py-3">
                      {header.column.getCanSort() ? (
                        <button onClick={header.column.getToggleSortingHandler()} className="flex items-center gap-1 cursor-pointer hover:opacity-80 select-none">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <span className="text-slate-200">
                            {header.column.getIsSorted() === "asc" ? (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                            ) : header.column.getIsSorted() === "desc" ? (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                            ) : (
                              <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                            )}
                          </span>
                        </button>
                      ) : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-100">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-16">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                        <Users className="w-6 h-6 text-emerald-300" />
                      </div>
                      <p className="text-[13px] text-slate-700">{loading ? "Calculating..." : "Select month and click Find"}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-emerald-50/40 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3 py-2.5">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {rows.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-[11.5px] text-slate-400 flex-wrap gap-2.5">
            <span>
              Showing <span className="font-semibold text-slate-600">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span>
              {" "}to <span className="font-semibold text-slate-600">{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}</span>
              {" "}of <span className="font-semibold text-slate-600">{table.getFilteredRowModel().rows.length}</span> entries
            </span>
            <div className="flex items-center gap-1.5">
              <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
              {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pi) => {
                const cur = table.getState().pagination.pageIndex
                if (pi === 0 || pi === table.getPageCount() - 1 || (pi >= cur - 1 && pi <= cur + 1)) {
                  return <button key={pi} onClick={() => table.setPageIndex(pi)} className={`w-7 h-7 rounded-md text-xs font-semibold cursor-pointer ${cur === pi ? "bg-emerald-600 text-white" : "border border-slate-200 text-slate-500 hover:bg-slate-50"}`}>{pi + 1}</button>
                }
                if (pi === cur - 2 || pi === cur + 2) return <span key={pi} className="px-0.5 text-slate-400">...</span>
                return null
              })}
              <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageEmployeeSalary