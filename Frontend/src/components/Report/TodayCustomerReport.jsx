import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Landmark, Building2, User, Warehouse, Search, Home, ChevronRight, Inbox, ClipboardList, Pencil, X } from 'lucide-react'



const ReceiptUpdates = () => {
  const [activeTab, setActiveTab] = useState('bank')
  const [search, setSearch] = useState("")
  const [bankTx, setBankTx] = useState([])
  const [editTx, setEditTx] = useState(null)
  const [customerTx, setCustomerTx] = useState([])
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [warehouseTx, setWarehouseTx] = useState([])

  useEffect(() => {
    if (activeTab === 'warehouse') fetchWarehouseTx()
  }, [activeTab])

  async function fetchWarehouseTx() {
    try {
      let res = await axios.get('http://localhost:3000/warehouse-transactions/all')
      console.log(">>> WAREHOUSE TX:", res.data)
      setWarehouseTx(res.data)
    } catch (err) {
      console.log("WAREHOUSE TX FAILED:", err.response?.data || err.message)
    }
  }

  const warehouseFiltered = warehouseTx.filter((t) =>
    ((t.fromWarehouse || '').toLowerCase().includes(search.toLowerCase()) ||
      (t.remark || '').toLowerCase().includes(search.toLowerCase())) &&
    inDateRange(t.date)
  )

  useEffect(() => {
    if (activeTab === 'customer') fetchCustomerTx()
  }, [activeTab])

  async function fetchCustomerTx() {
    try {
      let res = await axios.get('http://localhost:3000/customer-transactions/all')
      setCustomerTx(res.data)
    } catch (err) {
      console.log("CUSTOMER TX FAILED:", err.response?.data || err.message)
    }
  }

  const customerFiltered = customerTx.filter((t) =>
    ((t.fromCustomer || '').toLowerCase().includes(search.toLowerCase()) ||
      (t.remark || '').toLowerCase().includes(search.toLowerCase())) &&
    inDateRange(t.date)
  )

  useEffect(() => {
    if (activeTab === 'bank') {
      fetchBankTx()
    }
  }, [activeTab])

  async function fetchBankTx() {
    try {
      let res = await axios.get('http://localhost:3000/bank-transactions/all')
      setBankTx(res.data)
    } catch (err) {
      console.log("BANK TX FAILED:", err.response?.data || err.message)
    }
  }

  async function handleUpdateTx() {
    try {
      if (editTx._kind === 'customer') {
        await axios.put(`http://localhost:3000/customer-transaction/update/${editTx._id}`, {
          date: editTx.date,
          remark: editTx.remark,
          totalAmount: editTx.totalAmount,
        })
      } else if (editTx._kind === 'warehouse') {
        await axios.put(`http://localhost:3000/warehouse-transaction/update/${editTx._id}`, {
          date: editTx.date,
          remark: editTx.remark,
          totalAmount: editTx.totalAmount,
        })
      } else {
        await axios.put(`http://localhost:3000/bank-transaction/update/${editTx._id}`, {
          date: editTx.date,
          description: editTx.description,
          debit: editTx.debit,
          credit: editTx.credit,
        })
      }

      setEditTx(null)
      if (activeTab === 'bank') fetchBankTx()
      if (activeTab === 'customer') fetchCustomerTx()
      if (activeTab === 'warehouse') fetchWarehouseTx()
    } catch (err) {
      console.log("UPDATE FAILED:", err.response?.data || err.message)
    }
  }

  const bankFiltered = bankTx.filter((t) =>
    ((t.bankName || '').toLowerCase().includes(search.toLowerCase()) ||
      (t.description || '').toLowerCase().includes(search.toLowerCase())) &&
    inDateRange(t.date)
  )
  const rows = []

  const tabs = [
    { id: 'bank', label: 'Bank', icon: Landmark },
    { id: 'customer', label: 'Customer', icon: User },
    { id: 'warehouse', label: 'Warehouse', icon: Warehouse },
  ]

  const activeLabel = tabs.find((t) => t.id === activeTab)?.label || ""
  function inDateRange(d) {
    if (!fromDate && !toDate) return true
    if (!d) return false
    let date = new Date(d)
    if (fromDate && date < new Date(fromDate)) return false
    if (toDate) {
      let to = new Date(toDate)
      to.setHours(23, 59, 59, 999)
      if (date > to) return false
    }
    return true
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/40 p-4 md:p-6">
      {editTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setEditTx(null)}>
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center justify-between bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white"><Landmark className="h-5 w-5" /></div>
                <div>
                  <h2 className="text-white text-sm font-bold">Edit Transaction</h2>
                  <p className="text-emerald-100 text-xs">{editTx.bankName || "Bank"}</p>
                </div>
              </div>
              <button onClick={() => setEditTx(null)} className="cursor-pointer rounded-xl p-2 text-white/80 transition-all hover:rotate-90 hover:bg-white/15 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Date</label>
                <input type="date" value={editTx.date ? editTx.date.slice(0, 10) : ""} onChange={(e) => setEditTx({ ...editTx, date: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none transition-all" />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Description</label>
                <textarea rows={2}
                  value={(editTx._kind === 'customer' || editTx._kind === 'warehouse') ? (editTx.remark || "") : (editTx.description || "")}
                  onChange={(e) => setEditTx((editTx._kind === 'customer' || editTx._kind === 'warehouse') ? { ...editTx, remark: e.target.value } : { ...editTx, description: e.target.value })}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none transition-all" />
              </div>

              {(editTx._kind === 'customer' || editTx._kind === 'warehouse') ? (
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Amount</label>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 focus-within:border-emerald-400 focus-within:bg-white transition-all">
                    <span className="text-xs font-bold text-slate-400">Rs</span>
                    <input value={editTx.totalAmount || ""} onChange={(e) => setEditTx({ ...editTx, totalAmount: e.target.value })} placeholder="0"
                      className="w-full bg-transparent text-sm text-slate-800 focus:outline-none" />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-emerald-600">Debit (In)</label>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 focus-within:border-emerald-400 focus-within:bg-white transition-all">
                      <span className="text-xs font-bold text-slate-400">Rs</span>
                      <input value={editTx.debit || ""} onChange={(e) => setEditTx({ ...editTx, debit: e.target.value })} placeholder="0"
                        className="w-full bg-transparent text-sm text-slate-800 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-rose-500">Credit (Out)</label>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 focus-within:border-emerald-400 focus-within:bg-white transition-all">
                      <span className="text-xs font-bold text-slate-400">Rs</span>
                      <input value={editTx.credit || ""} onChange={(e) => setEditTx({ ...editTx, credit: e.target.value })} placeholder="0"
                        className="w-full bg-transparent text-sm text-slate-800 focus:outline-none" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/40 px-6 py-4">
              <button onClick={() => setEditTx(null)} className="cursor-pointer rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-500 transition-all hover:bg-slate-50">Cancel</button>
              <button onClick={handleUpdateTx} className="cursor-pointer rounded-xl bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5">Save Changes</button>
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
            <h1 className="text-xl font-bold leading-tight text-slate-800">Receipt Updates</h1>
            <p className="text-[11px] font-medium tracking-wide text-slate-400">Bank, supplier, customer &amp; warehouse receipts</p>

          </div>

        </div>


      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const Icon = t.icon
          const active = activeTab === t.id
          return (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`group flex items-center gap-2.5 rounded-2xl px-3 py-2 text-sm font-bold transition-all cursor-pointer ${active
                ? 'bg-linear-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-200'
                : 'bg-white text-slate-500 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600'}`}>
              <span className={`flex h-7 w-7 items-center justify-center rounded-xl transition-colors ${active ? 'bg-white/15 text-white' : 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-100'}`}>
                <Icon className="h-4 w-4" />
              </span>
              {t.label} Receipt
            </button>
          )
        })}
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="h-1 w-full bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-700" />

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
          {/* Left: Title + badge */}
          <div className="flex items-center gap-2.5">
            <span className="h-4 w-1 rounded-full bg-emerald-500" />
            <h2 className="text-sm font-bold text-slate-800">{activeLabel} Receipt Update</h2>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 ring-1 ring-emerald-100">
              {activeTab === 'bank' ? bankFiltered.length : 0} records
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <label htmlFor="fromDate" className="text-xs font-medium text-slate-500">
                From
              </label>
              <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs text-slate-600 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <label htmlFor="toDate" className="text-xs font-medium text-slate-500">
                To
              </label>
              <input
                type="date"
                id="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs text-slate-600 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-4 py-2 focus-within:border-emerald-400 focus-within:bg-white transition-all ml-auto">
            <Search className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder={`Search ${activeLabel.toLowerCase()}...`}
              className="bg-transparent text-xs text-slate-600 placeholder-slate-400 focus:outline-none w-40"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white">
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide">SL.</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide">Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide">Bank</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide">Description</th>
                <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wide">Debit</th>
                <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wide">Credit</th>
                <th className="px-4 py-3 text-center text-[11px] font-bold uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {activeTab === 'bank' ? (
                bankFiltered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50"><Inbox className="h-6 w-6 text-emerald-300" /></div>
                        <p className="text-sm font-semibold text-slate-500">No bank transactions</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  bankFiltered.map((t, i) => (
                    <tr key={t._id} className={`transition-colors hover:bg-emerald-50/50 ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                      <td className="px-4 py-3 text-xs text-slate-400">{i + 1}</td>
                      <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{t.date ? new Date(t.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</td>
                      <td className="px-4 py-3 text-xs font-medium text-slate-800">{t.bankName || "—"}</td>
                      <td className="px-4 py-3 text-xs text-slate-600 max-w-56 truncate">{t.description || "—"}</td>
                      <td className="px-4 py-3 text-right text-xs font-semibold text-emerald-600 tabular-nums">{Number(t.debit) > 0 ? Number(t.debit).toLocaleString() : "—"}</td>
                      <td className="px-4 py-3 text-right text-xs font-semibold text-rose-500 tabular-nums">{Number(t.credit) > 0 ? Number(t.credit).toLocaleString() : "—"}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center">
                          <button onClick={() => setEditTx(t)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white transition-colors cursor-pointer"><Pencil size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              ) : activeTab === 'customer' ? (
                customerFiltered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50"><Inbox className="h-6 w-6 text-emerald-300" /></div>
                        <p className="text-sm font-semibold text-slate-500">No customer transactions</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  customerFiltered.map((t, i) => (
                    <tr key={t._id} className={`transition-colors hover:bg-emerald-50/50 ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                      <td className="px-4 py-3 text-xs text-slate-400">{i + 1}</td>
                      <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{t.date ? new Date(t.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</td>
                      <td className="px-4 py-3 text-xs font-medium text-slate-800">{t.fromCustomer || "—"}</td>
                      <td className="px-4 py-3 text-xs text-slate-600 max-w-56 truncate">{t.remark || "—"}</td>
                      <td className="px-4 py-3 text-right text-xs font-semibold text-slate-700 tabular-nums" colSpan={2}>Rs {Number(t.totalAmount || 0).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center">
                          <button onClick={() => setEditTx({ ...t, _kind: 'customer' })} className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white transition-colors cursor-pointer"><Pencil size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )

              ) : activeTab === 'warehouse' ? (
                warehouseFiltered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50"><Inbox className="h-6 w-6 text-emerald-300" /></div>
                        <p className="text-sm font-semibold text-slate-500">No warehouse transactions</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  warehouseFiltered.map((t, i) => (
                    <tr key={t._id} className={`transition-colors hover:bg-emerald-50/50 ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                      <td className="px-4 py-3 text-xs text-slate-400">{i + 1}</td>
                      <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{t.date ? new Date(t.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</td>
                      <td className="px-4 py-3 text-xs font-medium text-slate-800">{t.fromWarehouse || "—"}</td>
                      <td className="px-4 py-3 text-xs text-slate-600 max-w-56 truncate">{t.remark || "—"}</td>
                      <td className="px-4 py-3 text-right text-xs font-semibold text-slate-700 tabular-nums" colSpan={2}>Rs {Number(t.totalAmount || 0).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center">
                          <button onClick={() => setEditTx({ ...t, _kind: 'warehouse' })} className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white transition-colors cursor-pointer"><Pencil size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              ) : (

                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50"><Inbox className="h-6 w-6 text-emerald-300" /></div>
                      <p className="text-sm font-semibold text-slate-500">Coming soon</p>
                      <p className="text-xs text-slate-400">{activeLabel} receipts</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 bg-emerald-50/40 px-5 py-3.5">
          <span className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Total {activeLabel} Receipt</span>
          <span className="text-base font-black text-emerald-700 tabular-nums">Rs 0.00</span>
        </div>
      </div>

    </div>
  )
}

export default ReceiptUpdates