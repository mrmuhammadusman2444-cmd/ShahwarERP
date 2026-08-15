import React, { useState } from 'react'
import axios from 'axios'
import { Wallet2, Search, Printer, FileSearch, Loader2 } from 'lucide-react'
import EmployeeSelect from '../Attendence/EmployeeSelect.jsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender, } from '@tanstack/react-table'

const Salary = () => {

  const [employeeId, setEmployeeId] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [employeeName, setEmployeeName] = useState("")

  function daysInMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate()
  }

  async function handleSearch() {
    if (!employeeId || !from || !to) {
      alert("Employee, From aur To date select karo")
      return
    }
    setLoading(true)
    try {
      // employee info
      const empRes = await axios.get('http://localhost:3000/find/employee')
      const userRes = await axios.get('http://localhost:3000/all/users')
      const emp = empRes.data.find((e) => e._id === employeeId)
      const user = userRes.data.find((u) => u._id === employeeId)
      const monthlySalary = Number(emp?.hourRateSalary || user?.hourRateSalary || 0)
      const empName = emp ? `${emp.firstName} ${emp.lastName}` : user ? `${user.firstName} ${user.lastName}` : ""
      setEmployeeName(empName)

      // attendance range me — salary earned nikaalne ke liye
      const attRes = await axios.get(`http://localhost:3000/attendance/report?from=${from}&to=${to}`)
      const empAtt = attRes.data.filter((a) => a.employeeId === employeeId)

      // advances/fines
      const advRes = await axios.get(`http://localhost:3000/find/salary-advances/${employeeId}?from=${from}&to=${to}`)
      const advances = advRes.data

      // ledger entries banao
      let entries = []

      // salary earned — month wise group karke Credit
      const monthsInRange = new Set(empAtt.map((a) => a.date.slice(0, 7)))
      monthsInRange.forEach((monthKey) => {
        const [y, m] = monthKey.split("-")
        const year = parseInt(y)
        const monthIndex = parseInt(m) - 1
        const totalDays = daysInMonth(year, monthIndex)
        const perDay = totalDays > 0 ? monthlySalary / totalDays : 0

        const monthAtt = empAtt.filter((a) => a.date.startsWith(monthKey))
        const present = monthAtt.filter((a) => a.status === "present").length
        const leave = monthAtt.filter((a) => a.status === "leave").length
        const overtime = monthAtt.reduce((sum, a) => sum + (Number(a.overtime) || 0), 0)
        const overtimePay = overtime * (perDay / 8.5)
        const earned = monthAtt.length === 0 ? 0 : Math.round((present + leave) * perDay + overtimePay)

        if (earned > 0) {
          entries.push({
            date: `${monthKey}-01`,
            description: `Salary Earned (${new Date(monthKey + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })})`,
            debit: 0,
            credit: earned,
          })
        }
      })

      // advances/fines — Debit
      advances.forEach((adv) => {
        entries.push({
          date: adv.date,
          description: `${adv.category}${adv.details ? ' - ' + adv.details : ''}`,
          debit: adv.amount,
          credit: 0,
        })
      })

      // date se sort
      entries.sort((a, b) => new Date(a.date) - new Date(b.date))

      // running balance
      let balance = 0
      const finalRows = entries.map((entry) => {
        balance = balance + entry.credit - entry.debit
        return { ...entry, balance }
      })

      setRows(finalRows)
    } catch (err) {
      console.log("LEDGER FETCH FAILED:", err.response?.data || err.message)
    }
    setLoading(false)
  }

  const columns = [
    {
      header: 'Date', accessorKey: 'date', size: 110,
      cell: (info) => <span className="text-[12.5px] text-slate-700">{new Date(info.getValue()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>,
    },
    {
      header: 'Description', accessorKey: 'description', size: 280,
      cell: (info) => <span className="text-[12.5px] font-medium text-slate-800">{info.getValue()}</span>,
    },
    {
      header: 'Debit', accessorKey: 'debit', size: 110,
      cell: (info) => <span className="text-[12.5px] font-semibold text-rose-600">{info.getValue() > 0 ? `Rs. ${info.getValue().toLocaleString()}` : '—'}</span>,
    },
    {
      header: 'Credit', accessorKey: 'credit', size: 110,
      cell: (info) => <span className="text-[12.5px] font-semibold text-emerald-700">{info.getValue() > 0 ? `Rs. ${info.getValue().toLocaleString()}` : '—'}</span>,
    },
    {
      header: 'Balance', accessorKey: 'balance', size: 110,
      cell: (info) => <span className="text-[13px] font-bold text-slate-900">Rs. {info.getValue().toLocaleString()}</span>,
    },
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

  const totalDebit = rows.reduce((sum, r) => sum + r.debit, 0)
  const totalCredit = rows.reduce((sum, r) => sum + r.credit, 0)
  const finalBalance = rows.length > 0 ? rows[rows.length - 1].balance : 0

  function handlePrint() {
    if (rows.length === 0) {
      alert("Pehle Search karo")
      return
    }

    const doc = new jsPDF()

    // header
    doc.setFillColor(5, 150, 105)
    doc.rect(0, 0, 210, 32, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("SHAHWAR FOODS", 14, 15)

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.text("Employee Salary Ledger", 14, 22)
    doc.text(`Employee: ${employeeName || "-"}`, 14, 27)

    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("LEDGER", 196, 15, { align: "right" })
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.text(`Printed: ${new Date().toLocaleDateString()}`, 196, 22, { align: "right" })

    // summary
    doc.setTextColor(100, 100, 100)
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.text(`Period: ${from || "-"} to ${to || "-"}`, 14, 40)

    doc.setFontSize(9)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(60, 60, 60)
    doc.text(`Total Debit: Rs. ${totalDebit.toLocaleString()}`, 14, 47)
    doc.setTextColor(5, 150, 105)
    doc.text(`Total Credit: Rs. ${totalCredit.toLocaleString()}`, 80, 47)
    doc.setTextColor(30, 30, 30)
    doc.text(`Balance: Rs. ${finalBalance.toLocaleString()}`, 150, 47)

    // table
    const tableRows = rows.map((r) => [
      new Date(r.date).toLocaleDateString(),
      r.description,
      r.debit > 0 ? `Rs. ${r.debit.toLocaleString()}` : "-",
      r.credit > 0 ? `Rs. ${r.credit.toLocaleString()}` : "-",
      `Rs. ${r.balance.toLocaleString()}`,
    ])

    autoTable(doc, {
      startY: 55,
      head: [["Date", "Description", "Debit", "Credit", "Balance"]],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [5, 150, 105], textColor: 255, fontSize: 9, fontStyle: "bold" },
      bodyStyles: { fontSize: 9, textColor: [60, 60, 60] },
      alternateRowStyles: { fillColor: [240, 253, 244] },
      columnStyles: {
        2: { halign: "right" },
        3: { halign: "right" },
        4: { halign: "right" },
      },
    })

    // footer
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(150, 150, 150)
    doc.text("www.shahwarfoods.com.pk", 105, 285, { align: "center" })

    const pdfBlob = doc.output('blob')
    const pdfUrl = URL.createObjectURL(pdfBlob)
    window.open(pdfUrl, '_blank')
  }


  return (
    <div className="p-4 bg-slate-50 min-h-screen overflow-x-hidden">

      {/* header */}
      <div className="flex items-center gap-2.5 mb-4 pl-12 md:pl-0">
        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
          <Wallet2 className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <h1 className="text-[15.5px] font-bold text-slate-900 leading-tight">Employee Salary Ledger</h1>
          <p className="text-[11px] text-slate-400 leading-tight">Salary, advances & fines record</p>
        </div>
      </div>

      {/* filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[220px]">
            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
              Employee Name <span className="text-red-500">*</span>
            </label>
            <EmployeeSelect value={employeeId} onChange={(id) => setEmployeeId(id)} />
          </div>

          <div>
            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">From</label>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="text-[12.5px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all w-40" />
          </div>

          <div>
            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">To</label>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="text-[12.5px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all w-40" />
          </div>

          <button onClick={handleSearch} disabled={loading} className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-6 py-2.5 shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-60">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Search
          </button>
        </div>
      </div>

      {/* summary cards */}
      {rows.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4 max-w-xl">
          <div className="bg-white border border-rose-100 rounded-xl p-3 text-center">
            <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wide mb-1">Total Debit</p>
            <p className="text-base font-bold text-rose-700">Rs. {totalDebit.toLocaleString()}</p>
          </div>
          <div className="bg-white border border-emerald-100 rounded-xl p-3 text-center">
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wide mb-1">Total Credit</p>
            <p className="text-base font-bold text-emerald-700">Rs. {totalCredit.toLocaleString()}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Balance</p>
            <p className="text-base font-bold text-slate-900">Rs. {finalBalance.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 flex-wrap gap-3">
          <p className="text-[13px] font-bold text-slate-900">Salary Ledger</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 border border-slate-200 rounded-md px-2.5 py-1.5 bg-emerald-50/60 focus-within:border-emerald-400 transition-all">
              <Search className="w-3.5 h-3.5 text-slate-600" />
              <input value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." className="text-[12px] bg-transparent border-none focus:outline-none w-28" />
            </div>
            <button onClick={handlePrint} type="button" className="group relative flex items-center gap-2 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12px] font-semibold rounded-lg px-4 py-2 shadow-md shadow-emerald-200/60 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden">
              <span className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-700 skew-x-12" />
              <Printer className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Print</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-190 text-left table-fixed">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="bg-linear-to-r from-emerald-600 to-emerald-700">
                  {hg.headers.map((header) => (
                    <th key={header.id} className="text-[12px] font-bold text-slate-50 px-3 py-3" style={{ width: header.column.id === 'date' ? 110 : header.column.id === 'description' ? 280 : 110 }}>
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
                        <FileSearch className="w-6 h-6 text-emerald-300" />
                      </div>
                      <p className="text-[13px] text-slate-700">{loading ? "Loading..." : "Select employee and click Search"}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-emerald-50/40 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3 py-2.5" style={{ width: cell.column.id === 'date' ? 110 : cell.column.id === 'description' ? 280 : 110 }}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
            {rows.length > 0 && (
              <tfoot>
                <tr className="bg-emerald-50 border-t border-emerald-100">
                  <td className="px-3 py-2.5 text-slate-700 text-[12px] font-bold" style={{ width: 390 }} colSpan={2}>Total</td>
                  <td className="px-3 py-2.5 text-right text-rose-700 text-[12px] font-bold" style={{ width: 110 }}>Rs. {totalDebit.toLocaleString()}</td>
                  <td className="px-3 py-2.5 text-right text-emerald-700 text-[12px] font-bold" style={{ width: 110 }}>Rs. {totalCredit.toLocaleString()}</td>
                  <td className="px-3 py-2.5 text-right text-slate-900 text-[13px] font-bold" style={{ width: 110 }}>Rs. {finalBalance.toLocaleString()}</td>
                </tr>
              </tfoot>
            )}
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

export default Salary