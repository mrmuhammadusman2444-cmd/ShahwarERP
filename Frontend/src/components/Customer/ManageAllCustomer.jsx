import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import EditCustomerPopup from "./EditCustomerPopup";
import { Users, Plus, Copy, FileText, Sheet, File, Printer, Search, ArrowUpDown, Pencil, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from 'react-toastify'

const ManageCustomers = () => {
  const [manageCustomer, setManageCustomer] = useState([])
  let [showEditPopup, setShowEditPopup] = useState(false)

  useEffect(() => {
    async function handleManageCustomer() {
      let res = await axios.get('http://localhost:3000/find')
      setManageCustomer(res.data)
    }
    handleManageCustomer()

  }, [])

  async function handleDelete(id) {
    await axios.post('http://localhost:3000/delete/customer', { _id: id })
    setManageCustomer(manageCustomer.filter(function (p) {
      return p._id !== id
    }))
    toast.success('Customer Deleted Successfully', { position: 'bottom-right', autoClose: 800 })
  }




  console.log(manageCustomer)

  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 p-4 md:p-6">

      {
        showEditPopup == true ? <EditCustomerPopup showEditPopup={showEditPopup} setShowEditPopup={setShowEditPopup} /> : null
      }

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-blue-200">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-gray-800 text-xl font-bold">Manage Customers</h1>
            <p className="text-gray-400 text-xs">Manage your Customers</p>
          </div>
        </div>

        <button onClick={() => { navigate('/newcustomer') }} className="flex items-center gap-2 bg-linear-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white  shadow-blue-200  text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 font-semibold px-4 py-2.5 rounded-xl shadow-md stransition-all cursor-pointer">
          <Plus className="w-4 h-4" />
          New Customer
        </button>

      </div>


      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-5">


        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">


          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">Show</span>
              <select className="bg-blue-50 border border-blue-100 rounded-lg px-2 py-1.5 text-gray-700 text-sm focus:outline-none focus:border-blue-400 cursor-pointer">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span className="text-gray-500 text-sm">entries</span>
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


          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none transition-all w-52 cursor-text"
            />
          </div>
        </div>


        <div className="overflow-x-auto rounded-xl border border-blue-100 h-115">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-linear-to-b from-emerald-500 to-emerald-700 text-white">
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide rounded-tl-xl w-12">SL</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">
                  <button className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer">
                    Customer <ArrowUpDown className="w-3.5 h-3.5" />
                  </button>
                </th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">Mobile No</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">Warehouse</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">Rate</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide w-48">Credit Used</th>
                <th className="text-right px-4 py-3 font-semibold text-xs uppercase tracking-wide">Balance</th>
                <th className="text-right px-4 py-3 font-semibold text-xs uppercase tracking-wide rounded-tr-xl">Action</th>
              </tr>
            </thead>
            <tbody>

              {manageCustomer.length === 0 && (
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

              {manageCustomer.map((customer, index) => {

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
                        <div className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-xs font-bold ${avatarTone(customer.customerName)}`}>
                          {initials(customer.customerName) || "?"}
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
                        <span className="text-gray-600 text-xs bg-gray-100 px-2 py-1 rounded-md">{customer.wareHouse}</span>
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
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button title="View" className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-100 cursor-pointer transition-all">
                          <Eye size={16} />
                        </button>
                        <button onClick={()=>setShowEditPopup(true)} title="Edit" className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-100 cursor-pointer transition-all">
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(customer._id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-100 cursor-pointer transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>

                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>


        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
          <p className="text-gray-400 text-xs">
            Showing {manageCustomer.length === 0 ? 0 : 1} to {manageCustomer.length} of {manageCustomer.length} entries
          </p>
          <div className="flex items-center gap-1.5">
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 bg-blue-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </button>
            <button className="w-8 h-8 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center cursor-pointer">1</button>
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-me-600 bg-blue-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageCustomers;