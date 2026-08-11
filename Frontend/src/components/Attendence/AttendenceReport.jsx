import React, { useState } from 'react'
import axios from 'axios'
import DateWiseReportPopup from './DateWiseReportPopup'
import EmployeeWiseReportPopup from './EmployeeWiseReportPopup'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { FileBarChart, Calendar, ChevronDown, Search, X, Printer, FileSearch } from 'lucide-react'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender, } from '@tanstack/react-table'

const AttendenceReport = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [showEmployeePopup, setShowEmployeePopup] = useState(false)

  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [showPrint, setShowPrint] = useState(false)

  async function handleSearch() {
    if (!from || !to) {
      alert("From aur To date select karo")
      return
    }
    setLoading(true)
    try {
      let res = await axios.get(`http://localhost:3000/attendance/report?from=${from}&to=${to}`)
      setRecords(res.data)
    } catch (err) {
      console.log("REPORT FETCH FAILED:", err.response?.data || err.message)
    }
    setLoading(false)
  }

  function handlePrint() {
    if (records.length === 0) {

      return
    }

    const doc = new jsPDF()

    // ===== HEADER =====
    doc.setFillColor(5, 150, 105)
    doc.rect(0, 0, 210, 32, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("SHAHWAR FOODS", 14, 15)

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.text("Attendance Report", 14, 22)
    doc.text("info@shahwarfoods.com", 14, 27)

    // right side — date range
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("ATTENDANCE", 196, 15, { align: "right" })
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.text(`${from || "-"}  to  ${to || "-"}`, 196, 22, { align: "right" })
    doc.text(`Printed: ${new Date().toLocaleDateString()}`, 196, 27, { align: "right" })

    // ===== SUMMARY =====
    const presentCount = records.filter(r => r.status === "present").length
    const absentCount = records.filter(r => r.status === "absent").length
    const leaveCount = records.filter(r => r.status === "leave").length

    doc.setTextColor(60, 60, 60)
    doc.setFontSize(9)
    doc.setFont("helvetica", "bold")
    doc.text(`Total: ${records.length}`, 14, 45)
    doc.setTextColor(5, 150, 105)
    doc.text(`Present: ${presentCount}`, 45, 45)
    doc.setTextColor(190, 18, 60)
    doc.text(`Absent: ${absentCount}`, 80, 45)
    doc.setTextColor(180, 83, 9)
    doc.text(`Leave: ${leaveCount}`, 115, 45)

    // ===== TABLE =====
    const rows = records.map((rec, idx) => [
      idx + 1,
      new Date(rec.date).toLocaleDateString(),
      rec.employeeName || "-",
      (rec.status || "").charAt(0).toUpperCase() + (rec.status || "").slice(1),
      rec.halfDay ? "Yes" : "-",
      rec.shortDay ? "Yes" : "-",
      rec.overtime || 0,
    ])

    autoTable(doc, {
      startY: 52,
      head: [["S.No", "Date", "Name", "Status", "Half Day", "Short Day", "Overtime"]],
      body: rows,
      theme: "grid",
      headStyles: {
        fillColor: [5, 150, 105],
        textColor: 255,
        fontSize: 9,
        fontStyle: "bold",
      },
      bodyStyles: { fontSize: 9, textColor: [60, 60, 60] },
      alternateRowStyles: { fillColor: [240, 253, 244] },
      columnStyles: {
        0: { cellWidth: 14, halign: "left" },
        1: { halign: "left" },
        2: { halign: "left" },
        3: { halign: "center" },
        4: { halign: "center" },
        5: { halign: "center" },
        6: { halign: "center" },
      },
    })

    // ===== FOOTER =====
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(150, 150, 150)
    doc.text("www.shahwarfoods.com.pk", 105, 285, { align: "center" })

    // ===== OPEN =====
    const pdfBlob = doc.output('blob')
    const pdfUrl = URL.createObjectURL(pdfBlob)
    window.open(pdfUrl, '_blank')
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
      header: 'Date',
      accessorKey: 'date',
      cell: (info) => (
        <span className="text-[12.5px] text-slate-700">
          {new Date(info.getValue()).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
        </span>
      ),
    },
    {
      header: 'Name',
      accessorKey: 'employeeName',
      cell: (info) => {
        const name = info.getValue() || ""
        const tones = ["from-emerald-400 to-emerald-600", "from-sky-400 to-sky-600", "from-amber-400 to-amber-600", "from-violet-400 to-violet-600", "from-rose-400 to-rose-600"]
        const tone = tones[name.length % tones.length]
        const initials = name.split(" ").map((n) => n.charAt(0)).join("").slice(0, 2).toUpperCase()
        return (
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 shrink-0 rounded-lg bg-linear-to-br ${tone} flex items-center justify-center text-white text-[11px] font-bold shadow-sm`}>
              {initials || "?"}
            </div>
            <span className="text-slate-800 text-[12.5px] font-semibold">{name || "—"}</span>
          </div>
        )
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info) => {
        const status = info.getValue()
        const tone = {
          present: "bg-emerald-50 text-emerald-700 ring-emerald-200",
          absent: "bg-rose-50 text-rose-700 ring-rose-200",
          leave: "bg-amber-50 text-amber-700 ring-amber-200",
        }
        return (
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ring-1 capitalize ${tone[status] || "bg-slate-50 text-slate-600 ring-slate-200"}`}>
            {status}
          </span>
        )
      },
    },
    {
      header: 'Half Day',
      accessorKey: 'halfDay',
      cell: (info) => info.getValue()
        ? <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">Yes</span>
        : <span className="text-slate-300 text-xs">—</span>,
    },
    {
      header: 'Short Day',
      accessorKey: 'shortDay',
      cell: (info) => info.getValue()
        ? <span className="text-[11px] font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded">Yes</span>
        : <span className="text-slate-300 text-xs">—</span>,
    },
    {
      header: 'Overtime (hrs)',
      accessorKey: 'overtime',
      cell: (info) => (
        <span className="text-slate-800 text-[12.5px] font-semibold tabular-nums">{info.getValue() || 0}</span>
      ),
    },
  ]

  const table = useReactTable({
    data: records,
    columns: columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  return (
    <div className="p-4 bg-slate-50 min-h-screen overflow-x-hidden">

      {showPopup && <DateWiseReportPopup showPopup={showPopup} setShowPopup={setShowPopup} />}
      {showEmployeePopup && <EmployeeWiseReportPopup showEmployeePopup={showEmployeePopup} setShowEmployeePopup={setShowEmployeePopup} />}

      {/* header */}
      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2.5 pl-12 md:pl-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
            <FileBarChart className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-[15.5px] font-bold text-slate-900 leading-tight">Attendance Report</h1>
            <p className="text-[11px] text-slate-400 leading-tight">View attendance records</p>
          </div>
        </div>
      </div>

      {/* report type buttons */}
      <div className="flex items-center gap-2.5 flex-wrap mb-3.5">
        <button onClick={() => setShowPopup(true)} type="button" className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 text-white text-[12.5px] font-semibold rounded-lg px-4 py-2.5 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
          <Calendar className="w-4 h-4" />
          Date Wise Report
        </button>
        <button onClick={() => setShowEmployeePopup(true)} type="button" className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 text-[12.5px] font-semibold rounded-lg px-4 py-2.5 hover:bg-slate-50 transition-all hover:-translate-y-0.5 cursor-pointer">
          <ChevronDown className="w-4 h-4 rotate-90" />
          Employee Wise Report
        </button>
      </div>

      {/* from-to filter */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 mb-3.5">
        <div className="flex items-end gap-3 flex-wrap">
          <div>
            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">From</label>
            <div className="relative">
              <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="text-[12.5px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">To</label>
            <div className="relative">
              <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="text-[12.5px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
            </div>
          </div>
          <button onClick={handleSearch} type="button" className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-4 py-2 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
            <Search className="w-3.5 h-3.5" />
            Search
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 flex-wrap gap-3">
          <p className="text-[13px] font-bold text-slate-900">Attendance Report</p>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 border border-slate-200 rounded-md px-2.5 py-1.5 bg-emerald-50/60 focus-within:border-emerald-400 transition-all">
              <Search className="w-3.5 h-3.5 text-slate-600" />
              <input value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." type="text" className="text-[12px] bg-transparent border-none focus:outline-none w-28" />
            </div>

            <button onClick={handlePrint} className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12px] font-semibold rounded-lg px-4 py-2 shadow-sm shadow-emerald-200 transition-all cursor-pointer">
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full min-w-205 text-left">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-linear-to-br from-emerald-500 to-emerald-700 border-b border-slate-100">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="text-[12.5px] font-bold text-slate-50 tracking-wide px-3 py-3">
                      {header.column.getCanSort() ? (
                        <button onClick={header.column.getToggleSortingHandler()} className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity select-none">
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
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
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
                      <p className="text-[13px] text-slate-700">{loading ? "Loading..." : "No record found"}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-emerald-50/40 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3 py-2.5">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {records.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-[11.5px] text-slate-400 flex-wrap gap-2.5">
            <span>
              Showing <span className=" text-slate-600">{table.getFilteredRowModel().rows.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span>
              {" "}to <span className=" text-slate-600">{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}</span>
              {" "}of <span className=" text-slate-600">{table.getFilteredRowModel().rows.length}</span> entries
            </span>
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
              {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => {
                const current = table.getState().pagination.pageIndex
                if (pageIndex === 0 || pageIndex === table.getPageCount() - 1 || (pageIndex >= current - 1 && pageIndex <= current + 1)) {
                  return (
                    <button key={pageIndex} type="button" onClick={() => table.setPageIndex(pageIndex)} className={`w-7 h-7 rounded-md text-xs font-semibold transition-all cursor-pointer ${current === pageIndex ? "bg-emerald-600 text-white" : "border border-slate-200 text-slate-500 hover:bg-slate-50"}`}>{pageIndex + 1}</button>
                  )
                }
                if (pageIndex === current - 2 || pageIndex === current + 2) {
                  return <span key={pageIndex} className="px-0.5 text-slate-400">...</span>
                }
                return null
              })}
              <button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
            </div>
          </div>
        )}

      </div>
      {/* PRINT PREVIEW MODAL */}
      {showPrint && (
        <div className="fixed inset-0 z-[100] bg-slate-900/50 flex items-center justify-center p-4 print:p-0 print:bg-white print:relative print:inset-auto">

          {/* print styles — sirf report print ho */}
          <style>{`
            @media print {
                body * { visibility: hidden; }
                #print-area, #print-area * { visibility: visible; }
                #print-area { position: absolute; left: 0; top: 0; width: 100%; }
                .no-print { display: none !important; }
                @page { size: A4; margin: 14mm; }
            }
        `}</style>

          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden print:max-h-none print:shadow-none print:rounded-none print:max-w-none">

            {/* modal toolbar — print pe chhup jayega */}
            <div className="no-print flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
              <p className="text-[13px] font-bold text-slate-700">Print Preview</p>
              <div className="flex items-center gap-2">
                <button onClick={() => window.print()} className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12px] font-semibold rounded-lg px-4 py-2 shadow-sm shadow-emerald-200 transition-all cursor-pointer">
                  <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                </button>
                <button onClick={() => setShowPrint(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* scrollable preview */}
            <div className="overflow-y-auto flex-1 p-6 print:p-0 print:overflow-visible">

              <div id="print-area" className="text-slate-800">

                {/* letterhead */}
                <div className="flex items-center justify-between border-b-2 border-emerald-600 pb-3 mb-4">
                  <div>
                    <h1 className="text-xl font-bold text-emerald-700">SHAHWAR FOODS</h1>
                    <p className="text-[11px] text-slate-500">Attendance Report</p>
                  </div>
                  <div className="text-right text-[11px] text-slate-500">
                    <p>From: <span className="font-semibold text-slate-700">{from || "—"}</span></p>
                    <p>To: <span className="font-semibold text-slate-700">{to || "—"}</span></p>
                    <p>Printed: {new Date().toLocaleDateString("en-GB")}</p>
                  </div>
                </div>

                {/* summary line */}
                <div className="flex gap-4 mb-4 text-[12px]">
                  <span>Total: <b>{records.length}</b></span>
                  <span className="text-emerald-700">Present: <b>{records.filter(r => r.status === "present").length}</b></span>
                  <span className="text-rose-700">Absent: <b>{records.filter(r => r.status === "absent").length}</b></span>
                  <span className="text-amber-700">Leave: <b>{records.filter(r => r.status === "leave").length}</b></span>
                </div>

                {/* table */}
                <table className="w-full border-collapse text-[11.5px]">
                  <thead>
                    <tr className="bg-emerald-600 text-white">
                      <th className="border border-emerald-700 px-2 py-1.5 text-left">SL</th>
                      <th className="border border-emerald-700 px-2 py-1.5 text-left">Date</th>
                      <th className="border border-emerald-700 px-2 py-1.5 text-left">Name</th>
                      <th className="border border-emerald-700 px-2 py-1.5 text-center">Status</th>
                      <th className="border border-emerald-700 px-2 py-1.5 text-center">Half Day</th>
                      <th className="border border-emerald-700 px-2 py-1.5 text-center">Short Day</th>
                      <th className="border border-emerald-700 px-2 py-1.5 text-center">Overtime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((rec, idx) => (
                      <tr key={rec._id} className={idx % 2 ? "bg-slate-50" : ""}>
                        <td className="border border-slate-200 px-2 py-1.5">{idx + 1}</td>
                        <td className="border border-slate-200 px-2 py-1.5">{new Date(rec.date).toLocaleDateString("en-GB")}</td>
                        <td className="border border-slate-200 px-2 py-1.5 font-medium">{rec.employeeName}</td>
                        <td className="border border-slate-200 px-2 py-1.5 text-center capitalize">{rec.status}</td>
                        <td className="border border-slate-200 px-2 py-1.5 text-center">{rec.halfDay ? "Yes" : "—"}</td>
                        <td className="border border-slate-200 px-2 py-1.5 text-center">{rec.shortDay ? "Yes" : "—"}</td>
                        <td className="border border-slate-200 px-2 py-1.5 text-center">{rec.overtime || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* footer */}
                <div className="flex justify-between items-end mt-10 text-[11px] text-slate-500">
                  <p>Generated by Shahwar Foods ERP</p>
                  <div className="text-center">
                    <div className="w-40 border-t border-slate-400 mb-1"></div>
                    <p>Authorized Signature</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AttendenceReport