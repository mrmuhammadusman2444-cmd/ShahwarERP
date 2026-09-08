import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import axios from 'axios'
import DeleteAlertPopup from "./DeleteAlertPopup";
import EditCustomerPopup from "./EditCustomerPopup";
import { can } from '../../Utils/Permissions.js'
import { Users, Plus, Copy, FileText, Sheet, File, Printer, Search, ArrowUpDown, Pencil, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from 'react-toastify'

const ManageCustomers = () => {
  const [manageCustomer, setManageCustomer] = useState([])
  const [editData, setEditData] = useState(null)
  const [search, setSearch] = useState("")
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [deleteData, setDeleteData] = useState(null)
  const [entries, setEntries] = useState(10)
  const [viewCustomer, setViewCustomer] = useState(null)
  const [editPicture, setEditPicture] = useState(null)
  const [editPreview, setEditPreview] = useState("")



  async function handleManageCustomer() {
    let res = await axios.get('http://localhost:3000/find')
    setManageCustomer(res.data)
  }
  useEffect(() => {
    handleManageCustomer()

  }, [])
  const filteredCustomers = manageCustomer.filter((customer) =>
    (customer.customerName || "").toLowerCase().includes(search.toLowerCase()) ||
    (customer.phoneNo || "").toString().toLowerCase().includes(search.toLowerCase())
  )
  async function handleUpdate() {
    try {
      let formData = new FormData()
      formData.append('customerName', editData.customerName || '')
      formData.append('email', editData.email || '')
      formData.append('phoneNo', editData.phoneNo || '')
      formData.append('wareHouse', editData.wareHouse || '')
      formData.append('amountLimit', editData.amountLimit || '')
      formData.append('CustomerProductRate', editData.CustomerProductRate || '')
      formData.append('scheme', editData.scheme || '')
      formData.append('customerCredits', editData.customerCredits || '')
      formData.append('PreviouseCreditsBalance', editData.PreviouseCreditsBalance || '')
      if (editPicture) formData.append('picture', editPicture)
      if (editPicture) formData.append('picture', editPicture)
      if (editData.removePicture) formData.append('removePicture', 'true')

      await axios.post(`http://localhost:3000/update/customer/${editData._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setShowEditPopup(false)
      handleManageCustomer()
      toast.success('Customer Updated Successfully', { position: 'bottom-right', autoClose: 800 })
    } catch (err) {
      console.log("UPDATE FAILED:", err.response?.data || err.message)
    }
  }
  async function handleDelete(id) {
    await axios.post('http://localhost:3000/delete/customer', { _id: id })
    setManageCustomer(manageCustomer.filter(function (p) {
      return p._id !== id
    }))
    toast.success('Customer Deleted Successfully', { position: 'bottom-right', autoClose: 800 })
  }





  const navigate = useNavigate()
  return (
    <div className="min-h-screen overflow-x-hidden bg-linear-to-br from-emerald-50 via-white to-emerald-50 p-4 md:p-6">

      {viewCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setViewCustomer(null)}>
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>

            <button onClick={() => setViewCustomer(null)} className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all hover:rotate-90 hover:bg-rose-50 hover:text-rose-500 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="flex flex-col items-center px-6 pt-8 pb-5 text-center">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 text-white text-2xl font-black shadow-lg shadow-emerald-200 mb-3">
                {viewCustomer.picture ? (
                  <img src={`http://localhost:3000${viewCustomer.picture}`} alt="" className="h-full w-full object-cover" />
                ) : (
                  (viewCustomer.customerName || '?').charAt(0).toUpperCase()
                )}
              </div>
              <h3 className="text-slate-800 text-lg font-bold leading-tight">{viewCustomer.customerName || "—"}</h3>
              <p className="text-slate-400 text-xs">{viewCustomer.email || "—"}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-100 capitalize">{viewCustomer.CustomerProductRate || "No rate"}</span>
                {viewCustomer.scheme === "yes" && (
                  <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 ring-1 ring-amber-200">Scheme Active</span>
                )}
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden">
                {[
                  { label: "Phone No", value: viewCustomer.phoneNo, icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
                  { label: "Warehouse", value: viewCustomer.wareHouse, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                  { label: "Amount Limit", value: viewCustomer.amountLimit ? `Rs. ${Number(viewCustomer.amountLimit).toLocaleString()}` : null, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { label: "Customer Credits", value: viewCustomer.customerCredits ? `Rs. ${Number(viewCustomer.customerCredits).toLocaleString()}` : null, icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" },
                  { label: "Previous Balance", value: viewCustomer.PreviouseCreditsBalance ? `Rs. ${Number(viewCustomer.PreviouseCreditsBalance).toLocaleString()}` : null, icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50/60 transition-colors">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} /></svg>
                    </span>
                    <span className="text-slate-400 text-xs font-medium">{f.label}</span>
                    <span className="ml-auto text-slate-800 text-sm font-bold tabular-nums truncate capitalize">{f.value || "—"}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {showEditPopup == true ? (<EditCustomerPopup showEditPopup={showEditPopup} setShowEditPopup={setShowEditPopup} editData={editData} setEditData={setEditData} handleUpdate={handleUpdate} editPicture={editPicture}
        setEditPicture={setEditPicture}
        editPreview={editPreview}
        setEditPreview={setEditPreview} />) : null}

      {showDeleteAlert && (<DeleteAlertPopup setShowDeleteAlert={setShowDeleteAlert} deleteData={deleteData} handleDelete={handleDelete} />)}

      <div className="flex items-center justify-between mb-6 gap-3 pl-12 md:pl-0">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-gray-800 text-base md:text-xl font-bold">Manage Customers</h1>
            <p className="text-gray-400 text-xs">Manage your Customers</p>
          </div>
        </div>

        <button onClick={() => { navigate('/newcustomer') }} className="flex items-center gap-2 shrink-0 bg-linear-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white shadow-emerald-200 text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 font-semibold px-3 md:px-4 py-2.5 rounded-xl shadow-md cursor-pointer">
          <Plus className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">New Customer</span>
        </button>

      </div>


      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-5 overflow-hidden">


        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">


          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-xl p-1">
              {[10, 25, 50, 100].map((num) => {
                const active = entries === num
                return (
                  <button
                    key={num}
                    onClick={() => setEntries(num)}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${active ? "text-white" : "text-gray-500 hover:text-emerald-700"}`}>
                    {active && (
                      <motion.span
                        layoutId="entriesPill"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute inset-0 rounded-lg bg-linear-to-b from-emerald-500 to-emerald-600 shadow-sm shadow-emerald-200"
                      />
                    )}
                    <span className="relative">{num}</span>
                  </button>
                )
              })}
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
              <button onClick={() => window.print()} className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
            </div>
          </div>


          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search..."
              className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none transition-all w-full sm:w-52 cursor-text" />
          </div>
        </div>


        <div className="hidden lg:block overflow-x-auto rounded-xl border border-emerald-100 h-115" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full min-w-200 text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-linear-to-b from-emerald-500 to-emerald-700 text-white">
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide rounded-tl-xl w-12">SL</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">
                  <button className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer">
                    Customer <ArrowUpDown className="w-3.5 h-3.5" />
                  </button>
                </th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wide">Mobile No</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wide">Warehouse</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wide">Rate</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wide w-48">Credit Used</th>
                <th className="text-right px-4 py-3 font-semibold text-xs tracking-wide">Balance</th>
                <th className="text-right px-4 py-3 font-semibold text-xs tracking-wide rounded-tr-xl">Action</th>
              </tr>
            </thead>
            <tbody>

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                        <Users className="w-7 h-7 text-emerald-300" />
                      </div>
                      <p className="text-gray-600 text-sm font-medium">No customers yet</p>
                      <p className="text-gray-400 text-xs">Add your first customer to see them here</p>
                    </div>
                  </td>
                </tr>
              )}

              {filteredCustomers.slice(0, entries).map((customer, index) => {

                const limit = Number(customer.amountLimit) || 0
                const used = Number(customer.customerCredits) || 0
                const percent = limit > 0 ? Math.min((used / limit) * 100, 100) : 0

                const barTone =
                  percent >= 90 ? "bg-red-500"
                    : percent >= 70 ? "bg-amber-500"
                      : "bg-emerald-500"
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

                const rateTone = {
                  distributor: "bg-emerald-50 text-emerald-700 ring-emerald-200",
                  dealer: "bg-amber-50 text-amber-700 ring-amber-200",
                  retail: "bg-sky-50 text-sky-700 ring-sky-200",
                }

                return (
                  <tr key={customer._id} className="group border-t border-emerald-50 hover:bg-emerald-50/60 transition-colors">

                    <td className="px-4 py-3 text-gray-400 text-xs font-mono tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 shrink-0 overflow-hidden rounded-xl flex items-center justify-center text-xs font-bold ${avatarTone(customer.customerName)}`}>
                          {customer.picture ? (
                            <img src={`http://localhost:3000${customer.picture}`} alt="" className="h-full w-full object-cover" />
                          ) : (
                            initials(customer.customerName) || "?"
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-gray-800 text-sm font-semibold truncate flex items-center gap-1.5">
                            {customer.customerName}
                            {customer.scheme === "yes" && (
                              <span title="Scheme active" className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            )}
                          </p>
                          <p className="text-gray-400 text-xs truncate">{customer.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-gray-600 text-sm tabular-nums">{customer.phoneNo || "—"}</td>

                    <td className="px-4 py-3">
                      {customer.wareHouse ? (
                        <span className="text-emerald-900 text-xs bg-emerald-100 px-2 py-1 rounded-md">{customer.wareHouse}</span>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {customer.CustomerProductRate ? (
                        <span className={`text-xs font-semibold px-2 py-1 rounded-md ring-1 capitalize ${rateTone[customer.CustomerProductRate] || "bg-gray-50 text-gray-600 ring-gray-200"}`}>
                          {customer.CustomerProductRate}
                        </span>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {limit > 0 ? (
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600 font-medium tabular-nums">Rs. {used.toLocaleString()}</span>
                            <span className="text-gray-400 tabular-nums">/ {limit.toLocaleString()}</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${barTone}`} style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-300 text-xs">No limit set</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-bold tabular-nums ${Number(customer.PreviouseCreditsBalance) > 0 ? "text-red-600" : "text-gray-700"
                        }`}>
                        Rs. {Number(customer.PreviouseCreditsBalance || 0).toLocaleString()}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                        {can("customers", "view") && (
                          <button onClick={() => setViewCustomer(customer)} className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-100 cursor-pointer transition-all">
                            <Eye size={16} />
                          </button>
                        )}

                        {can("customers", "update") && (
                          <button onClick={() => { setEditData(customer); setShowEditPopup(true) }} className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-100 cursor-pointer transition-all">
                            <Pencil size={16} />
                          </button>
                        )}

                        {can("customers", "delete") && (
                          <button
                            onClick={() => { setDeleteData(customer); setShowDeleteAlert(true) }}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-100 cursor-pointer transition-all">
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

        {/* Mobile card view */}
        <div className="lg:hidden flex flex-col gap-3">
          {filteredCustomers.length === 0 && (
            <div className="py-16 text-center flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <Users className="w-7 h-7 text-emerald-300" />
              </div>
              <p className="text-gray-600 text-sm font-medium">No customers yet</p>
              <p className="text-gray-400 text-xs">Add your first customer to see them here</p>
            </div>
          )}

          {filteredCustomers.map((customer, index) => {
            const limit = Number(customer.amountLimit) || 0
            const used = Number(customer.customerCredits) || 0
            const percent = limit > 0 ? Math.min((used / limit) * 100, 100) : 0
            const barTone = percent >= 90 ? "bg-red-500" : percent >= 70 ? "bg-amber-500" : "bg-emerald-500"
            const initials = (name = "") => name.trim().split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase()
            const avatarTone = (name = "") => {
              const tones = ["bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700", "bg-sky-100 text-sky-700", "bg-rose-100 text-rose-700", "bg-violet-100 text-violet-700"]
              return tones[name.length % tones.length]
            }
            const rateTone = {
              distributor: "bg-emerald-50 text-emerald-700 ring-emerald-200",
              dealer: "bg-amber-50 text-amber-700 ring-amber-200",
              retail: "bg-sky-50 text-sky-700 ring-sky-200",
            }
            return (
              <div key={customer._id} className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-sm font-bold ${avatarTone(customer.customerName)}`}>
                    {initials(customer.customerName) || "?"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-800 text-sm font-semibold truncate flex items-center gap-1.5">
                      {customer.customerName}
                      {customer.scheme === "yes" && <span title="Scheme active" className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />}
                    </p>
                    <p className="text-gray-400 text-xs truncate">{customer.email}</p>
                    <p className="text-gray-500 text-xs mt-0.5 tabular-nums">{customer.phoneNo || "—"}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {can("customers", "view") && (
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-100 cursor-pointer transition-all">
                        <Eye size={16} />
                      </button>
                    )}
                    {can("customers", "update") && (
                      <button onClick={() => { setEditData(customer), setShowEditPopup(true) }} className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-100 cursor-pointer transition-all">
                        <Pencil size={16} />
                      </button>
                    )}
                    {can("customers", "delete") && (
                      <button onClick={() => { setDeleteData(customer); setShowDeleteAlert(true) }} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-100 cursor-pointer transition-all">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-emerald-50">
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase tracking-wide">Warehouse</p>
                    {customer.wareHouse ? (
                      <span className="text-emerald-900 text-xs bg-emerald-100 px-2 py-0.5 rounded-md inline-block mt-0.5">{customer.wareHouse}</span>
                    ) : <span className="text-gray-300 text-xs">—</span>}
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase tracking-wide">Rate</p>
                    {customer.CustomerProductRate ? (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ring-1 capitalize inline-block mt-0.5 ${rateTone[customer.CustomerProductRate] || "bg-gray-50 text-gray-600 ring-gray-200"}`}>
                        {customer.CustomerProductRate}
                      </span>
                    ) : <span className="text-gray-300 text-xs">—</span>}
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase tracking-wide">Credit Used</p>
                    {limit > 0 ? (
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600 font-medium tabular-nums">Rs. {used.toLocaleString()}</span>
                          <span className="text-gray-400 tabular-nums">/ {limit.toLocaleString()}</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${barTone}`} style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    ) : <span className="text-gray-300 text-xs">No limit</span>}
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase tracking-wide">Balance</p>
                    <span className={`text-sm font-bold tabular-nums ${Number(customer.PreviouseCreditsBalance) > 0 ? "text-red-600" : "text-gray-700"}`}>
                      Rs. {Number(customer.PreviouseCreditsBalance || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">


          <p className="text-gray-400 text-xs">
            Showing {manageCustomer.length === 0 ? 0 : 1} to {manageCustomer.length} of {manageCustomer.length} entries
          </p>
          <div className="flex items-center gap-1.5">
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </button>
            <button className="w-8 h-8 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center cursor-pointer">1</button>
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-me-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageCustomers;