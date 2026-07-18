import React from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { BadgeDollarSign, IdCardLanyard, CreditCard, Download, SquarePen, Trash2 } from "lucide-react";



const ManageSale = () => {
  let navigate = useNavigate()
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState('')


  useEffect(() => {
    async function handleFindNewSale() {

      let res = await axios.get('http://localhost:3000/find/new/sale')
      console.log(res.data)
      setSales(res.data)

    }
    handleFindNewSale()
  }, [])


  async function handleDeleteSale(id) {
    try {
      let res = await axios.post('http://localhost:3000/delete/sale', { _id: id })

      if (res.data.success === false) {
        toast.error(res.data.msg || 'Sale not found', { position: 'bottom-right', autoClose: 800 })
        return
      }

      // UI se turant remove karo
      setSales((prev) => prev.filter((sale) => sale._id !== id))

      toast.success('Sale Deleted Successfully', { position: 'bottom-right', autoClose: 800 })
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong', { position: 'bottom-right', autoClose: 800 })
    }
  }




  const filteredSales = sales.filter((sale) => {
    const query = search.toLowerCase();
    return (
      sale.customerName?.toLowerCase().includes(query) ||
      sale.invoiceNo?.toLowerCase().includes(query)
    );
  });
  function handleDownloadInvoice(sale) {

    const doc = new jsPDF()

    // ===== HEADER — company =====
    doc.setFillColor(5, 150, 105)
    doc.rect(0, 0, 210, 32, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("SHAHWAR FOODS", 14, 15)

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.text("Distribution Management System", 14, 22)
    doc.text("info@shahwarfoods.com", 14, 27)

    // invoice number — right side
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("INVOICE", 196, 15, { align: "right" })
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(sale.invoiceNo || "-", 196, 22, { align: "right" })

    // ===== CUSTOMER INFO =====
    doc.setTextColor(60, 60, 60)
    doc.setFontSize(9)
    doc.setFont("helvetica", "bold")
    doc.text("BILL TO", 14, 45)

    doc.setFont("poppins", "normal")
    doc.setFontSize(11)
    doc.text(sale.customerName || "-", 14, 52)

    // date — right side
    doc.setFontSize(9)
    doc.setFont("helvetica", "bold")
    doc.text("DATE", 196, 45, { align: "right" })
    doc.setFont("helvetica", "normal")
    doc.text(
      sale.Date ? new Date(sale.Date).toLocaleDateString() : "-",
      196, 52, { align: "right" }
    )

    // ===== ITEMS TABLE =====
    const rows = (sale.items || []).map((item, i) => [
      i + 1,
      item.name,
      item.carton || 0,
      item.qty || 0,
      `Rs. ${Number(item.rate || 0).toLocaleString()}`,
      `Rs. ${Number(item.total || 0).toLocaleString()}`,
    ])

    autoTable(doc, {
      startY: 62,
      head: [["#", "Product", "Carton", "Qty", "Rate", "Total"]],
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
        0: { cellWidth: 12, halign: "center" },
        2: { halign: "center" },
        3: { halign: "center" },
        4: { halign: "right" },
        5: { halign: "right" },
      },
    })

    // ===== TOTALS =====
    let y = doc.lastAutoTable.finalY + 10

    doc.setFontSize(9)
    doc.setTextColor(100, 100, 100)
    doc.text("Freight Charges:", 140, y)
    doc.text(`Rs. ${Number(sale.freightCharges || 0).toLocaleString()}`, 196, y, { align: "right" })

    y += 6
    doc.text("Previous Amount:", 140, y)
    doc.text(`Rs. ${Number(sale.previousAmount || 0).toLocaleString()}`, 196, y, { align: "right" })

    y += 4
    doc.setDrawColor(200, 200, 200)
    doc.line(140, y, 196, y)

    y += 8
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(5, 150, 105)
    doc.text("GRAND TOTAL", 140, y)
    doc.text(`Rs. ${Number(sale.grandTotal || 0).toLocaleString()}`, 196, y, { align: "right" })

    // ===== FOOTER =====
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(150, 150, 150)
    doc.text("www.shahwarfood.com.pk", 105, 280, { align: "center" })

    // ===== SAVE =====
    doc.save(`${sale.invoiceNo || "invoice"}.pdf`)
  }

  function handlePOSPrint(sale) {
    const printWindow = window.open('', '_blank', 'width=400,height=600')

    const itemsHTML = (sale.items || [])
      .map(
        (item) => `
        <tr>
          <td>${item.name}</td>
          <td style="text-align:center">${item.qty || 0}</td>
          <td style="text-align:right">${Number(item.rate || 0).toLocaleString()}</td>
          <td style="text-align:right">${Number(item.total || 0).toLocaleString()}</td>
        </tr>
      `
      )
      .join('')

    const receiptHTML = `
    <html>
      <head>
        <title>${sale.invoiceNo || 'Receipt'}</title>
        <style>
          @page { size: 80mm auto; margin: 0; }
          * { box-sizing: border-box; }
          body {
            font-family: 'Courier New', monospace;
            width: 80mm;
            margin: 0 auto;
            padding: 10px;
            color: #000;
            font-size: 12px;
          }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          .line { border-top: 1px dashed #000; margin: 6px 0; }
          h1 { font-size: 16px; margin: 0; }
          p { margin: 2px 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 4px; table-layout: fixed; }
          th { text-align: left; font-size: 11px; border-bottom: 1px dashed #000; padding: 3px 4px; }
          td { font-size: 11px; padding: 4px; vertical-align: top; word-wrap: break-word; }
          th:first-child, td:first-child { width: 40%; padding-left: 0; }
          th:nth-child(2), td:nth-child(2) { width: 15%; }
          th:nth-child(3), td:nth-child(3) { width: 20%; }
          th:nth-child(4), td:nth-child(4) { width: 25%; padding-right: 0; }
          .totals td { padding: 3px 0; }
          .grand-total { font-size: 14px; font-weight: bold; }
          .footer { margin-top: 10px; font-size: 11px; }
        </style>
      </head>
      <body>
        <div class="center">
          <h1>SHAHWAR FOODS</h1>
          <p>Distribution Management System</p>
          <p>info@shahwarfoods.com</p>
        </div>

        <div class="line"></div>

        <p><span class="bold">Invoice#:</span> ${sale.invoiceNo || '-'}</p>
        <p><span class="bold">Date:</span> ${sale.Date ? new Date(sale.Date).toLocaleDateString() : '-'}</p>
        <p><span class="bold">Customer:</span> ${sale.customerName || '-'}</p>

        <div class="line"></div>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th style="text-align:center">Qty</th>
              <th style="text-align:right">Rate</th>
              <th style="text-align:right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div class="line"></div>

        <table class="totals">
          <tr>
            <td>Freight Charges:</td>
            <td style="text-align:right">Rs. ${Number(sale.freightCharges || 0).toLocaleString()}</td>
          </tr>
          <tr>
            <td>Previous Amount:</td>
            <td style="text-align:right">Rs. ${Number(sale.previousAmount || 0).toLocaleString()}</td>
          </tr>
        </table>

        <div class="line"></div>

        <table class="totals">
          <tr class="grand-total">
            <td>GRAND TOTAL</td>
            <td style="text-align:right">Rs. ${Number(sale.grandTotal || 0).toLocaleString()}</td>
          </tr>
        </table>

        <div class="line"></div>

        <div class="center footer">
          <p>www.shahwarfoods.com.pk</p>
          
        </div>
      </body>
    </html>
  `

    printWindow.document.write(receiptHTML)
    printWindow.document.close()

    printWindow.onload = function () {
      printWindow.focus()
      printWindow.print()
    }
  }

function handleGatePassPrint(sale) {
  const printWindow = window.open('', '_blank', 'width=600,height=700')

  const itemsHTML = (sale.items || [])
    .map(
      (item, i) => `
        <tr>
          <td style="text-align:center">${i + 1}</td>
          <td>${item.name}</td>
          <td style="text-align:center">${item.carton || 0}</td>
          <td style="text-align:center">${item.qty || 0}</td>
        </tr>
      `
    )
    .join('')

  const totalCartons = (sale.items || []).reduce(
    (sum, item) => sum + Number(item.carton || 0),
    0
  )

  const gatePassHTML = `
    <html>
      <head>
        <title>Gate Pass - ${sale.invoiceNo || ''}</title>
        <style>
          @page { size: A5; margin: 10mm; }
          * { box-sizing: border-box; }
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            color: #1f2937;
            font-size: 13px;
            margin: 0;
            padding: 0;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #059669;
            padding-bottom: 10px;
            margin-bottom: 12px;
          }
          .header h1 {
            font-size: 20px;
            color: #059669;
            margin: 0;
            letter-spacing: 1px;
          }
          .header p { margin: 2px 0; font-size: 11px; color: #6b7280; }
          .title {
            text-align: center;
            background: #059669;
            color: #fff;
            padding: 6px;
            font-weight: bold;
            font-size: 14px;
            letter-spacing: 1px;
            margin-bottom: 14px;
            border-radius: 4px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px 20px;
            margin-bottom: 14px;
          }
          .info-grid div { font-size: 12px; }
          .info-grid span.label {
            font-weight: bold;
            color: #374151;
            display: inline-block;
            width: 100px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 14px;
          }
          th {
            background: #ecfdf5;
            color: #065f46;
            font-size: 11px;
            text-align: left;
            padding: 6px 8px;
            border: 1px solid #d1fae5;
          }
          td {
            font-size: 12px;
            padding: 6px 8px;
            border: 1px solid #e5e7eb;
          }
          .total-row {
            text-align: right;
            font-weight: bold;
            font-size: 13px;
            margin-bottom: 16px;
            color: #059669;
          }
          .remarks {
            margin-bottom: 20px;
            font-size: 12px;
          }
          .remarks .line {
            display: inline-block;
            border-bottom: 1px dotted #9ca3af;
            width: 100%;
            margin-top: 4px;
          }
          .signatures {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
          }
          .sign-box {
            text-align: center;
            width: 30%;
          }
          .sign-box .line {
            border-top: 1px solid #374151;
            margin-bottom: 4px;
          }
          .sign-box p { font-size: 11px; margin: 0; color: #6b7280; }
          .footer-line {
            border-top: 2px solid #059669;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>SHAHWAR FOODS</h1>
          <p>Distribution Management System</p>
          <p>info@shahwarfoods.com</p>
        </div>

        <div class="title">GATE PASS / DELIVERY SLIP</div>

        <div class="info-grid">
          <div><span class="label">Gate Pass No:</span> ${sale.invoiceNo || '-'}</div>
          <div><span class="label">Date:</span> ${sale.Date ? new Date(sale.Date).toLocaleDateString() : '-'}</div>
          <div><span class="label">Customer Name:</span> ${sale.customerName || '-'}</div>
          <div><span class="label">Invoice No:</span> ${sale.invoiceNo || '-'}</div>
          <div><span class="label">Vehicle No:</span> ${sale.vehicleNo || '-'}</div>
          <div><span class="label">Driver Name:</span> ${sale.driverName || '-'}</div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="text-align:center">#</th>
              <th>Item</th>
              <th style="text-align:center">Carton</th>
              <th style="text-align:center">Qty</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div class="total-row">Total Cartons: ${totalCartons}</div>

        <div class="remarks">
          Remarks:
          <div class="line">&nbsp;</div>
        </div>

        <div class="signatures">
          <div class="sign-box">
            <div class="line"></div>
            <p>Prepared By</p>
          </div>
          <div class="sign-box">
            <div class="line"></div>
            <p>Approved By</p>
          </div>
          <div class="sign-box">
            <div class="line"></div>
            <p>Security Signature</p>
          </div>
        </div>

        <div class="footer-line"></div>
      </body>
    </html>
  `

  printWindow.document.write(gatePassHTML)
  printWindow.document.close()

  printWindow.onload = function () {
    printWindow.focus()
    printWindow.print()
  }
}



  return (
    <div className="min-h-screen bg-linear-to-br from--50 via-white to--50 p-4 md:p-6">

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-b from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow--200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-xl font-bold">Manage Sale</h1>
            <p className="text-gray-400 text-xs">Manage your Sale</p>
          </div>
        </div>

      </div>



      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
          <div>
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Start Date</label>
            <input type="date"
              className="bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>
          <div>
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">End Date</label>
            <input type="date"
              className="bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>
          <button className="px-6 py-2.5 cursor-pointer bg-linear-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5">
            Find
          </button>
          <button onClick={() => { navigate('/newSale') }} className="flex items-center cursor-pointer gap-2 px-4 py-2.5 bg-linear-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Sale
          </button>
        </div>
      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-5 py-3 border-b border-emerald-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Show</span>
              <select className="bg-blue-50 border border-blue-100 rounded-lg px-2 py-1.5 text-gray-600 text-xs focus:outline-none focus:border-blue-400 transition-all">
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

          <div className="flex items-center gap-2 bg-emerald-50 border border-blue-100 rounded-xl px-3 py-2 focus-within:border-emerald-400 transition-all">
            <svg className="w-3.5 h-3.5 text-emerald-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search..."
              className="bg-transparent text-xs text-gray-600 placeholder-gray-400 focus:outline-none w-36" />
          </div>
        </div>

        <div className="overflow-x-auto h-97 ">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-linear-to-b from-emerald-500 to-emerald-700 text-white">
                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">SL</th>
                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    Invoice No
                    <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Sale By</th>
                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Customer Name</th>
                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Date</th>
                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Total Amount</th>
                <th className="text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16">
                    <div className="flex flex-col items-center gap-4">

                      <div className="relative flex h-20 w-20 items-center justify-center">
                        <span className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-40" />
                        <span className="absolute inset-2 rounded-full bg-emerald-50" />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-200">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                      </div>

                      <div>
                        <p class Name="text-gray-700 text-base font-bold">No Sales Yet</p>
                        <p className="text-gray-400 text-xs mt-1 max-w-xs">Your sales will appear here once you create your first invoice</p>
                      </div>



                    </div>
                  </td>
                </tr>
              ) : (
                filteredSales.map((sale, idx) => {

                  const tone = [
                    "from-emerald-400 to-emerald-600",
                    "from-sky-400 to-sky-600",
                    "from-amber-400 to-amber-600",
                    "from-violet-400 to-violet-600",
                    "from-rose-400 to-rose-600",
                  ][idx % 5]

                  const initial = (sale.customerName || "?").trim().charAt(0).toUpperCase()

                  return (
                    <tr
                      key={sale._id}
                      className={`group transition-all duration-200 hover:bg-emerald-50/50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
                    >
                      <td className="px-4 py-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 text-gray-400 text-[10px] font-bold group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                          {idx + 1}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-lg ring-1 ring-emerald-100">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          {sale.invoiceNo}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-slate-300 text-xs">—</td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br ${tone} text-white text-xs font-bold shadow-sm ring-2 ring-white`}>
                            {initial}
                          </div>
                          <span className="text-slate-700 text-xs font-semibold">{sale.customerName}</span>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 text-gray-500 text-xs whitespace-nowrap">
                          <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {sale.Date ? new Date(sale.Date).toLocaleDateString() : "—"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-block rounded-lg bg-emerald-50 px-2.5 py-1 text-emerald-700 text-sm font-bold tabular-nums ring-1 ring-emerald-100">
                          Rs. {Number(sale.grandTotal || 0).toLocaleString()}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="relative group/tooltip">
                            <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer" >
                              <BadgeDollarSign className="w-3.5 h-3.5" strokeWidth={2} />
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 ease-out pointer-events-none z-20">
                              <span className="whitespace-nowrap rounded-md bg-emerald-900 px-2 py-1 text-[11px] font-medium text-white shadow-lg shadow-emerald-900/30">
                                Sale
                              </span>
                              <span className="-mt-1 h-2 w-2 rotate-45 bg-emerald-900"></span>
                            </div>
                          </div>

                          <div className="relative group/tooltip">
                            <button onClick={()=>handleGatePassPrint(sale)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer" >
                              <IdCardLanyard className="w-3.5 h-3.5" strokeWidth={2} />
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 ease-out pointer-events-none z-20">
                              <span className="whitespace-nowrap rounded-md bg-emerald-900 px-2 py-1 text-[11px] font-medium text-white shadow-lg shadow-emerald-900/30">
                                Gate Pass
                              </span>
                              <span className="-mt-1 h-2 w-2 rotate-45 bg-emerald-900"></span>
                            </div>
                          </div>

                          <div className="relative group/tooltip">
                            <button onClick={() => handlePOSPrint(sale)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer" >
                              <CreditCard className="w-3.5 h-3.5" strokeWidth={2} />
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 ease-out pointer-events-none z-20">
                              <span className="whitespace-nowrap rounded-md bg-emerald-900 px-2 py-1 text-[11px] font-medium text-white shadow-lg shadow-emerald-900/30">
                                POS Sale
                              </span>
                              <span className="-mt-1 h-2 w-2 rotate-45 bg-emerald-900"></span>
                            </div>
                          </div>

                          <div className="relative group/tooltip">
                            <button
                              onClick={() => handleDownloadInvoice(sale)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-600 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" strokeWidth={2} />
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 ease-out pointer-events-none z-20">
                              <span className="whitespace-nowrap rounded-md bg-emerald-900 px-2 py-1 text-[11px] font-medium text-white shadow-lg shadow-emerald-900/30">
                                Download
                              </span>
                              <span className="-mt-1 h-2 w-2 rotate-45 bg-emerald-900"></span>
                            </div>
                          </div>

                          <div className="relative group/tooltip">
                            <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer" >
                              <SquarePen className="w-3.5 h-3.5" strokeWidth={2} />
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 ease-out pointer-events-none z-20">
                              <span className="whitespace-nowrap rounded-md bg-emerald-900 px-2 py-1 text-[11px] font-medium text-white shadow-lg shadow-emerald-900/30">
                                Edit
                              </span>
                              <span className="-mt-1 h-2 w-2 rotate-45 bg-emerald-900"></span>
                            </div>
                          </div>

                          <div className="relative group/tooltip">
                            <button onClick={() => handleDeleteSale(sale._id)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer">
                              <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 ease-out pointer-events-none z-20">
                              <span className="whitespace-nowrap rounded-md bg-emerald-900 px-2 py-1 text-[11px] font-medium text-white shadow-lg shadow-emerald-900/30">
                                Delete
                              </span>
                              <span className="-mt-1 h-2 w-2 rotate-45 bg-emerald-900"></span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-blue-50 flex flex-col sm:flex-row items-center justify-between gap-3 bg--50/30">
          <p className="text-xs text-gray-400">Showing 0 to 0 of 0 entries</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-xs text-gray-400 bg-white border border-emerald-100 rounded-lg hover:border-emerald-300 hover:text-emerald-600 transition-all">Previous</button>
            <button className="px-3 py-1.5 text-xs text-white bg-linear-to-b from-emerald-500 to-emerald-700 rounded-lg">1</button>
            <button className="px-3 py-1.5 text-xs text-gray-400 bg-white border border-emerald-100 rounded-lg hover:border-emerald-300 hover:text-emerald-600 transition-all">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageSale;