import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { can } from '../../Utils/Permissions.js'
import SupplierUpdatePopup from './SupplierUpdatePopup.jsx'
import { ClipboardList, Plus, Eye, BookOpen, Receipt, Copy, FileSpreadsheet, FileText, Printer, Search, ArrowUpDown, FileBarChart, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function ManageSupplier() {
  const navigate = useNavigate()
  const [supplier, setSupplier] = useState([])
  const [allSupplier, setAllSupplier] = useState([])
  const [search, setSearch] = useState("")
  const [showUpdatePopup, setShowUpdatePopup] = useState(false)
  const [updateSupplierData, setUpdateSupplierData] = useState(null)
  const [viewSupplier, setViewSupplier] = useState(null)

  async function handleFindSupplier() {
    try {
      let res = await axios.get('http://localhost:3000/find/supplier')
      setSupplier(res.data)
      setAllSupplier(res.data)
    } catch (err) {
      console.log("FIND SUPPLIER FAILED:", err.response?.data || err.message)
    }
  }

  useEffect(() => {
    handleFindSupplier()
  }, [])

  async function handleDeleteSupplier(id) {
    try {
      await axios.delete(`http://localhost:3000/delete/supplier/${id}`)
      setSupplier(prev => prev.filter(s => s._id !== id))
      setAllSupplier(prev => prev.filter(s => s._id !== id))
    } catch (err) {
      console.log("DELETE FAILED:", err.response?.data || err.message)
    }
  }

  function handleSearch(value) {
    setSearch(value)
    if (!value.trim()) {
      setSupplier(allSupplier)
      return
    }
    let filtered = allSupplier.filter((item) =>
      (item.supplierName || "").toLowerCase().includes(value.toLowerCase()) ||
      (item.phoneNo || "").toLowerCase().includes(value.toLowerCase()) ||
      (item.address || "").toLowerCase().includes(value.toLowerCase())
    )
    setSupplier(filtered)
  }

  return (
    <div className="p-4 bg-slate-50 min-h-screen overflow-x-hidden">
      {viewSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setViewSupplier(null)}>
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>

            <div className="relative h-24 bg-linear-to-br from-emerald-500 via-emerald-600 to-emerald-800 overflow-hidden">
              <div className="pointer-events-none absolute -top-8 -right-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute top-6 left-8 h-16 w-16 rounded-full bg-white/5 blur-xl" />
              <button onClick={() => setViewSupplier(null)} className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white/90 backdrop-blur-sm transition-all hover:rotate-90 hover:bg-white/25 cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="px-6 relative z-10 -mt-12">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-linear-to-br from-emerald-500 to-emerald-700 text-white text-3xl font-black shadow-xl shadow-emerald-300/40 ring-4 ring-white">
                  {viewSupplier.picture ? (
                    <img src={`http://localhost:3000${viewSupplier.picture}`} alt="" className="h-full w-full object-cover" />
                  ) : (
                    (viewSupplier.supplierName || '?').charAt(0).toUpperCase()
                  )}
                </div>
                <h3 className="mt-3 text-slate-800 text-lg font-bold leading-tight">{viewSupplier.supplierName || "—"}</h3>
                <p className="text-slate-400 text-xs">{viewSupplier.email || "—"}</p>
                {viewSupplier.phoneNo && (
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {viewSupplier.phoneNo}
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 pt-5">
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "Credits", value: viewSupplier.supplierCredits ? `Rs. ${Number(viewSupplier.supplierCredits).toLocaleString()}` : "—", tone: "from-emerald-400 to-emerald-600" },
                  { label: "Prev. Balance", value: viewSupplier.previousCreditsBalance ? `Rs. ${Number(viewSupplier.previousCreditsBalance).toLocaleString()}` : "—", tone: "from-amber-400 to-amber-600" },
                ].map((f) => (
                  <div key={f.label} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-3">
                    <div className={`mb-1.5 h-1 w-8 rounded-full bg-linear-to-r ${f.tone}`} />
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">{f.label}</p>
                    <p className="text-slate-800 text-sm font-bold tabular-nums mt-0.5 truncate">{f.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-2.5 rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden">
                {[
                  { label: "Address", value: viewSupplier.address, icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
                  { label: "Details", value: viewSupplier.supplierDetails, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50/60 transition-colors">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} /></svg>
                    </span>
                    <span className="text-slate-400 text-xs font-medium shrink-0">{f.label}</span>
                    <span className="ml-auto text-slate-700 text-sm font-semibold truncate text-right">{f.value || "—"}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
      {showUpdatePopup && updateSupplierData && (<SupplierUpdatePopup setShowUpdatePopup={setShowUpdatePopup} updateData={updateSupplierData} handleFindSupplier={handleFindSupplier} />)}
      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2.5 pl-12 md:pl-0">        <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
          <ClipboardList className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-[15px] font-bold text-slate-900 leading-tight">Manage Supplier</h1>
          <p className="text-[11px] text-slate-400 leading-tight">Manage your supplier</p>
        </div>
      </div>

        <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400">
        </div>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap mb-3.5">

        <button
          onClick={() => { navigate('/addsupplierpage') }}
          className="group relative flex items-center gap-2 overflow-hidden cursor-pointer bg-linear-to-br from-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white text-[12.5px] font-semibold rounded-xl pl-2.5 pr-4 py-2 shadow-md shadow-emerald-200/60 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/20 group-hover:bg-white/25 transition-colors">
            <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
          </span>
          Add Supplier
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
        </button>

        <button
          onClick={() => { navigate('/supplierledgerpage') }}
          className="group relative flex items-center gap-2 overflow-hidden cursor-pointer bg-white border border-emerald-200 hover:border-emerald-300 text-emerald-700 text-[12.5px] font-semibold rounded-xl pl-2.5 pr-4 py-2 shadow-sm hover:shadow-md hover:shadow-emerald-100 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
            <BookOpen className="w-4 h-4" />
          </span>
          Supplier Ledger
        </button>

        <button
          className="group relative flex items-center gap-2 overflow-hidden cursor-pointer bg-white border border-emerald-200 hover:border-emerald-300 text-emerald-700 text-[12.5px] font-semibold rounded-xl pl-2.5 pr-4 py-2 shadow-sm hover:shadow-md hover:shadow-emerald-100 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
            <Receipt className="w-4 h-4" />
          </span>
          Supplier Sales Details
        </button>

      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-[13px] font-bold text-slate-900">Manage Supplier</p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 px-4 py-3 border-b border-slate-100">

          <div className="flex items-center gap-2 text-[12px] text-slate-500">
            <span>Show</span>
            <select className="border border-slate-200 rounded-md px-2 py-1 text-[12px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 cursor-pointer">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button className="flex items-center gap-1 cursor-pointer bg-slate-500 hover:bg-slate-600 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors">
              <Copy className="w-3 h-3" />
              Copy
            </button>
            <button className="flex items-center gap-1 cursor-pointer bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors">
              <FileText className="w-3 h-3" />
              CSV
            </button>
            <button className="flex items-center gap-1 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors">
              <FileSpreadsheet className="w-3 h-3" />
              Excel
            </button>
            <button className="flex items-center gap-1 cursor-pointer bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors">
              <FileBarChart className="w-3 h-3" />
              PDF
            </button>
            <button className="flex items-center gap-1 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors">
              <Printer className="w-3 h-3" />
              Print
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] text-emerald-500">Search:</span>
            <div className="flex items-center gap-1.5 border border-emerald-200 rounded-full px-2.5 py-1.5 bg-emerald-50/60 focus-within:border-emerald-400 focus-within:bg-white transition-all">
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search supplier..."
                className="text-[12px] bg-transparent border-none placeholder:text-slate-500 focus:outline-none w-36" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-215 text-left">
            <thead>
              <tr className="bg-emerald-500">
                <th className="text-[13px] font-semibold text-slate-50 tracking-wide px-4 py-2.5 whitespace-nowrap">SL.</th>
                <th className="text-[13px] font-semibold text-slate-50 tracking-wide px-4 py-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Supplier Name
                    <ArrowUpDown className="w-3 h-3 text-slate-300" />
                  </div>
                </th>
                <th className="text-[13px] font-semibold text-slate-50 tracking-wide px-4 py-2.5 whitespace-nowrap">Address</th>
                <th className="text-[13px] font-semibold text-slate-50 tracking-wide px-4 py-2.5 whitespace-nowrap">Mobile</th>
                <th className="text-[13px] font-semibold text-slate-50 tracking-wide px-4 py-2.5 whitespace-nowrap">Details</th>
                <th className="text-[13px] font-semibold text-slate-50 tracking-wide px-4 py-2.5 whitespace-nowrap">Credits</th>
                <th className="text-[13px] font-semibold text-slate-50 tracking-wide px-4 py-2.5 text-right whitespace-nowrap">Balance</th>
                <th className="text-[13px] font-semibold text-slate-50 tracking-wide px-4 py-2.5 text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>

              {supplier.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                        <ClipboardList className="w-7 h-7 text-emerald-300" />
                      </div>
                      <p className="text-gray-600 text-sm font-medium">No suppliers yet</p>
                      <p className="text-gray-400 text-xs">Add your first supplier to see them here</p>
                    </div>
                  </td>
                </tr>
              )}

              {supplier.map((item, index) => {

                const credits = Number(item.supplierCredits) || 0
                const balance = Number(item.previousCreditsBalance) || 0

                const initials = (name = "") =>
                  name.trim().split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase()

                const avatarTone = (name = "") => {
                  const tones = [
                    "bg-emerald-100 text-emerald-700",
                    "bg-amber-100 text-amber-700",
                    "bg-sky-100 text-sky-700",
                    "bg-rose-100 text-rose-700",
                    "bg-violet-100 text-violet-700",
                  ]
                  return tones[name.length % tones.length]
                }

                return (
                  <tr key={item._id} className="group border-t border-emerald-50 hover:bg-emerald-50/60 transition-colors">

                    <td className="px-4 py-3 text-gray-400 text-xs font-mono tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 shrink-0 overflow-hidden rounded-xl flex items-center justify-center text-xs font-bold ${avatarTone(item.supplierName)}`}>
                          {item.picture ? (
                            <img src={`http://localhost:3000${item.picture}`} alt="" className="h-full w-full object-cover" />
                          ) : (
                            initials(item.supplierName) || "?"
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-gray-800 text-sm font-semibold truncate">{item.supplierName || "—"}</p>
                          <p className="text-gray-400 text-xs truncate">{item.email || "—"}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      {item.address ? (
                        <span className="text-gray-600 text-xs truncate max-w-45 inline-block align-middle" title={item.address}>{item.address}</span>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-gray-600 text-sm tabular-nums">{item.phoneNo || "—"}</td>

                    <td className="px-4 py-3">
                      {item.supplierDetails ? (
                        <span className="text-gray-500 text-xs truncate max-w-50 inline-block align-middle" title={item.supplierDetails}>{item.supplierDetails}</span>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {credits > 0 ? (
                        <span className="text-emerald-700 text-xs font-semibold bg-emerald-50 ring-1 ring-emerald-200 px-2 py-1 rounded-md tabular-nums">
                          Rs. {credits.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-bold tabular-nums ${balance > 0 ? "text-red-600" : "text-gray-700"}`}>
                        Rs. {balance.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">

                        {can('suppliers', 'view') && (
                          <button onClick={() => setViewSupplier(item)} className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-100 cursor-pointer transition-all" title="View">
                            <Eye size={16} />
                          </button>
                        )}

                        {can('suppliers', 'update') && (
                          <button onClick={() => { setUpdateSupplierData(item); setShowUpdatePopup(true) }} className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-100 cursor-pointer transition-all" title="Edit">
                            <Pencil size={16} />
                          </button>
                        )}

                        {can('suppliers', 'delete') && (
                          <button onClick={() => handleDeleteSupplier(item._id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-100 cursor-pointer transition-all" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        )}

                      </div>
                    </td>

                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-[11.5px] text-slate-400">
          <span>Showing {supplier.length === 0 ? 0 : 1} to {supplier.length} of {supplier.length} entries</span>
          <div className="flex items-center gap-1.5">
            <button className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors cursor-pointer">Previous</button>
            <button className="bg-emerald-600 text-white rounded-md px-2.5 py-1 cursor-pointer">1</button>
            <button className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors cursor-pointer">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}