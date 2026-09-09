import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ClipboardList, Calendar, Search, Printer, Home, ChevronRight, FileText, Package, ChevronDown } from 'lucide-react'

const SaleReportProductWise = () => {
  const [productOpen, setProductOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [productSearch, setProductSearch] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [records, setRecords] = useState([])
  const [totalCarton, setTotalCarton] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [posBill, setPosBill] = useState(null)
  const [showBill, setShowBill] = useState(false)

  async function openPosBill(invoiceNo) {
    try {
      let res = await axios.get(`http://localhost:3000/sale/by-invoice/${invoiceNo}`)
      setPosBill(res.data)
    } catch (err) {
      console.log("BILL FETCH FAILED:", err.response?.data || err.message)
    }
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        let res = await axios.get('http://localhost:3000/find/product')
        let saleOnly = res.data.filter((p) => p.saleRawCategory !== "Raw")
        setProducts(saleOnly)
      } catch (err) {
        console.log("PRODUCTS FAILED:", err.response?.data || err.message)
      }
    }
    fetchProducts()
  }, [])

  async function handleSearch() {
    try {
      let params = {}
      if (selectedProduct) params.productName = selectedProduct
      if (fromDate) params.from = fromDate
      if (toDate) params.to = toDate
      let res = await axios.get('http://localhost:3000/product-wise-report', { params })
      setRecords(res.data.rows || [])
      setTotalCarton(res.data.totalCarton || 0)
      setTotalAmount(res.data.totalAmount || 0)
    } catch (err) {
      console.log("PRODUCT REPORT FAILED:", err.response?.data || err.message)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/40 p-4 md:p-6">
      {posBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setPosBill(null)}>
          <div className="relative w-full max-w-xs" onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center justify-end gap-2 mb-2">
              <button onClick={() => window.print()} className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" /></svg>
                Print
              </button>
              <button onClick={() => setPosBill(null)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-500 hover:bg-rose-50 hover:text-rose-500 cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-2xl px-5 py-5 font-mono text-[11px] text-gray-800 leading-relaxed">
              <div className="text-center mb-3">
                <h3 className="text-base font-bold tracking-wide">HAFIZ FOODS</h3>
                <p className="text-[10px] text-gray-500">Near PSO Depot, D I KHAN Road, Bannu KPK</p>
                <p className="text-[10px] text-gray-500">0334-1909797</p>
              </div>

              <div className="border-t border-dashed border-gray-300 pt-2 mb-2 text-[10px]">
                <div className="flex justify-between"><span>Invoice:</span><span className="font-bold">{posBill.invoiceNo}</span></div>
                <div className="flex justify-between"><span>Date:</span><span>{posBill.Date ? new Date(posBill.Date).toLocaleDateString("en-GB") : "-"}</span></div>
                <div className="flex justify-between"><span>Customer:</span><span>{posBill.customerName || "-"}</span></div>
              </div>

              <div className="border-t border-dashed border-gray-300 pt-2">
                <div className="flex justify-between font-bold border-b border-gray-200 pb-1 mb-1">
                  <span className="flex-1">Item</span>
                  <span className="w-8 text-center">Ctn</span>
                  <span className="w-14 text-right">Amount</span>
                </div>
                {(posBill.items || []).map((it, i) => (
                  <div key={i} className="flex justify-between py-0.5">
                    <span className="flex-1 truncate pr-1">{it.name}</span>
                    <span className="w-8 text-center">{Number(it.carton || 0)}</span>
                    <span className="w-14 text-right">{Number(it.total || 0).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-gray-300 mt-2 pt-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>TOTAL</span>
                  <span>Rs. {Number(posBill.grandTotal || 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="text-center mt-3 border-t border-dashed border-gray-300 pt-2">
                <p className="text-[10px] text-gray-500">Thank you for your business!</p>
                <p className="text-[9px] text-gray-400 mt-0.5">www.hafizfoods.com.pk</p>
              </div>
            </div>

          </div>
        </div>
      )}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-800 shadow-lg shadow-emerald-300/40 ring-4 ring-white">
            <ClipboardList className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight text-slate-800">Product Wise Report</h1>
            <p className="text-[11px] font-medium tracking-wide text-slate-400">Product wise sales report</p>
          </div>
        </div>


      </div>

      <div className="mb-5 rounded-3xl border border-slate-200/70 bg-white shadow-xl shadow-slate-200/50">
        <div className="h-1 w-full bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-700" />
        <div className="p-5 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-end gap-3">

            <div className="flex-1 min-w-48">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Product</label>
              <div className="relative">
                <div
                  onClick={() => setProductOpen((o) => !o)}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border bg-slate-50/60 px-3 py-2.5 transition-all ${productOpen ? 'border-emerald-400 bg-white ring-4 ring-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`}>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-emerald-600"><Package className="h-3 w-3" /></span>
                  <span className={`flex-1 truncate text-xs font-medium ${selectedProduct ? 'text-slate-700' : 'text-slate-400'}`}>{selectedProduct || 'Select product'}</span>
                  {selectedProduct && (
                    <span role="button" onClick={(e) => { e.stopPropagation(); setSelectedProduct('') }} className="flex h-4 w-4 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500 cursor-pointer">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                    </span>
                  )}
                  <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-emerald-400 transition-transform duration-200 ${productOpen ? 'rotate-180' : ''}`} />
                </div>

                {productOpen && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40">
                    <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
                      <Search className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                      <input autoFocus value={productSearch} onChange={(e) => setProductSearch(e.target.value)} placeholder="Search product..." className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 focus:outline-none" />
                    </div>
                    <div className="max-h-56 overflow-y-auto py-1 custom-scroll">
                      {products.filter((p) => (p.productName || '').toLowerCase().includes(productSearch.toLowerCase())).length === 0 ? (
                        <p className="px-4 py-6 text-center text-xs text-slate-400">No products</p>
                      ) : (
                        products
                          .filter((p) => (p.productName || '').toLowerCase().includes(productSearch.toLowerCase()))
                          .map((p) => (
                            <button key={p._id} type="button"
                              onClick={() => { setSelectedProduct(p.productName); setProductOpen(false); setProductSearch('') }}
                              className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors cursor-pointer ${selectedProduct === p.productName ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-600 hover:bg-emerald-50/60'}`}>
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600"><Package className="h-3 w-3" /></span>
                              <span className="flex-1 truncate">{p.productName}</span>
                            </button>
                          ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-36">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Start Date</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Calendar className="h-3.5 w-3.5" /></span>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-2 py-2.5 text-xs font-medium text-slate-700 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
              </div>
            </div>

            <div className="flex-1 min-w-36">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">End Date</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Calendar className="h-3.5 w-3.5" /></span>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-2 py-2.5 text-xs font-medium text-slate-700 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
              </div>
            </div>

            <button onClick={handleSearch} className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 hover:from-emerald-500 hover:to-emerald-600 cursor-pointer">
              <Search className="h-3.5 w-3.5" />
              Search
            </button>

          </div>
        </div>
      </div>

      <div className="flex h-[80vh] flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-lg shadow-slate-200/50">

        <div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-white to-emerald-50/40 px-4 py-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-600 to-emerald-800 text-white shadow-md shadow-emerald-200 ring-2 ring-white">
              <span className="text-lg font-black">H</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 leading-tight">Hafiz Foods</h3>
              <p className="text-[10.5px] text-slate-400">Near PSO Depot, D I KHAN Road, Bannu KPK &middot; info@hafizfoods.com.pk &middot; 0334-1909797</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10.5px] font-bold text-emerald-700 ring-1 ring-emerald-100">
            {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4 min-h-0">
          <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-100 shadow-sm min-h-0">
            <div className="overflow-auto flex-1 custom-scroll">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-linear-to-r from-emerald-600 to-emerald-700">
                    <th className="px-4 py-3 text-left text-[11px] font-bold tracking-wide text-white">Date</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold tracking-wide text-white">Invoice No</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold tracking-wide text-white">Product</th>
                    <th className="px-4 py-3 text-center text-[11px] font-bold tracking-wide text-white">Carton</th>
                    <th className="px-4 py-3 text-right text-[11px] font-bold tracking-wide text-white">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {records.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-20 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
                            <Package className="h-5 w-5 text-emerald-300" />
                          </div>
                          <p className="text-xs font-semibold text-slate-500">Record not found</p>
                          <p className="text-[11px] text-slate-400">Select a product and search</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    records.map((r, i) => (
                      <tr key={i} className={`group transition-colors hover:bg-emerald-50/50 ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-2 text-xs text-slate-600">
                            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-500 transition-colors">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </span>
                            <span className="font-medium tabular-nums">{r.date ? new Date(r.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => openPosBill(r.invoiceNo)} className="inline-flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100 transition-all hover:bg-emerald-100 hover:ring-emerald-300 cursor-pointer">{r.invoiceNo}</button>
                        </td>
                        <td className="px-4 py-3 text-xs font-medium text-slate-800">{r.productName}</td>
                        <td className="px-4 py-3 text-center text-xs font-bold text-slate-700 tabular-nums">{Number(r.carton || 0).toLocaleString()}</td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-sm font-bold text-slate-800 tabular-nums">
                            <span className="text-[10px] font-normal text-slate-400 mr-0.5">Rs</span>
                            {Number(r.amount || 0).toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Total Carton</span>
              <span className="text-sm font-black text-slate-800 tabular-nums">{Number(totalCarton || 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Total Amount</span>
              <span className="text-base font-black text-emerald-700 tabular-nums">Rs {Number(totalAmount || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SaleReportProductWise