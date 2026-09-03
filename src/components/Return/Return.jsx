import SelectCategory from '../../components/SelectCategory/SelectCategory.jsx'
import { ShoppingBag, Trash2, Eye } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import SearchableSelect from '../Scheme Report/SearchableSelect.jsx'

const Return = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [customers, setCustomers] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [gatePass, setGatePass] = useState("")
  const [date, setDate] = useState("")
  const [showRate, setShowRate] = useState("Distributor Rate")
  const [returnType, setReturnType] = useState("")
  const [previousAmount, setPreviousAmount] = useState("")
  const [saving, setSaving] = useState(false)
  const location = useLocation()
  const editReturn = location.state?.editReturn || null
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    if (editReturn) {
      setEditId(editReturn._id)
      setSelectedCustomer(editReturn.customerName || "")
      setGatePass(editReturn.gatePass || "")
      setDate(editReturn.date ? editReturn.date.slice(0, 10) : "")
      setShowRate(editReturn.showRate || "Distributor Rate")
      setReturnType(editReturn.returnType || "")
      setPreviousAmount(editReturn.previousAmount || "")
      setSelectedItems(editReturn.items || [])
    }
  }, [])

  useEffect(() => {
    async function fetchCustomers() {
      try {
        let res = await axios.get('http://localhost:3000/find')
        setCustomers(res.data)
      } catch (err) {
        console.log("CUSTOMERS FAILED:", err.response?.data || err.message)
      }
    }
    fetchCustomers()
  }, [])


  async function handleProceed() {
    if (!selectedCustomer) {
      return
    }
    if (selectedItems.length === 0) {
      return
    }
    let user = JSON.parse(localStorage.getItem('user')) || {}
    let saleBy = user.firstName || user.name || ""

    setSaving(true)
    try {
      if (editId) {
        await axios.put(`http://localhost:3000/update/return/${editId}`, {
          gatePass: gatePass,
          customerName: selectedCustomer,
          date: date,
          showRate: showRate,
          returnType: returnType,
          previousAmount: previousAmount,
          items: selectedItems,
          grandTotal: grandTotal,
        })

        navigate('/manage/return')
      } else {
        let user = JSON.parse(localStorage.getItem('user')) || {}
        let saleBy = user.firstName || user.name || ""
        await axios.post('http://localhost:3000/add/return', {
          gatePass: gatePass,
          customerName: selectedCustomer,
          date: date,
          showRate: showRate,
          returnType: returnType,
          previousAmount: previousAmount,
          items: selectedItems,
          grandTotal: grandTotal,
          saleBy: saleBy,
        })
        setSelectedItems([])
        setSelectedCustomer("")
        setGatePass("")
        setDate("")
        setReturnType("")
        setPreviousAmount("")
      }
    } catch (err) {
      console.log("RETURN SAVE FAILED:", err.response?.data || err.message)
    }
    setSaving(false)
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

  useEffect(() => {
    if (!selectedCustomer) {
      setPreviousAmount("")
      return
    }
    async function fetchBalance() {
      try {
        let res = await axios.get(`http://localhost:3000/customer/ledger/${selectedCustomer}`)
        setPreviousAmount(res.data.closingBalance || 0)
      } catch (err) {
        console.log("BALANCE FAILED:", err.response?.data || err.message)
      }
    }
    fetchBalance()
  }, [selectedCustomer])

  const visibleProducts = products.filter((p) => {
    let matchName = (p.productName || "").toLowerCase().includes(search.toLowerCase())
    let noCatFilter = !category || category === "All Categories" || category === "all"
    let matchCat = noCatFilter ? true : (p.mainCategory === category || p.productCategory === category)
    return matchName && matchCat
  })

  function handleAddItem(product) {
    setSelectedItems((prev) => {
      if (prev.find((it) => it._id === product._id)) return prev
      return [...prev, {
        _id: product._id,
        name: product.productName,
        mainCategory: product.mainCategory || "",
        cartonSize: Number(product.cartonSize) || 0,
        unitWeight: Number(product.weight) || 0,
        weightUnit: product.weightUnit || "kg",
        rate: Number(product.distributorPrice) || 0,
        carton: "",
        dozen: 0,
        qty: 0,
        weight: 0,
        total: 0,
      }]
    })
  }

  function handleRemoveItem(id) {
    setSelectedItems((prev) => prev.filter((it) => it._id !== id))
  }

  function handleFieldChange(id, field, value) {
    setSelectedItems((prev) => prev.map((it) => {
      if (it._id !== id) return it
      let cs = it.cartonSize || 1
      let carton = Number(it.carton) || 0
      let qty = Number(it.qty) || 0
      let dozen = Number(it.dozen) || 0
      let v = Number(value) || 0

      if (field === "carton") {
        carton = v
        qty = carton * cs
        dozen = qty / 12
      } else if (field === "qty") {
        qty = v
        carton = qty / cs
        dozen = qty / 12
      } else if (field === "dozen") {
        dozen = v
        qty = dozen * 12
        carton = qty / cs
      }

      let weight = carton * (it.unitWeight || 0)
      let total = qty * (it.rate || 0)

      return {
        ...it,
        carton: field === "carton" ? value : carton,
        qty: field === "qty" ? value : qty,
        dozen: field === "dozen" ? value : dozen,
        weight,
        total,
      }
    }))
  }

  const grandTotal = selectedItems.reduce((s, i) => s + (Number(i.total) || 0), 0)
  const dueAmount = (Number(previousAmount) || 0) - grandTotal
  return (
    <div className="bg-linear-to-br from-emerald-50 via-white to-emerald-50 p-4 md:p-5">

      <div className="flex gap-1 mb-5 bg-white border border-emerald-100 shadow-sm p-1 rounded-xl w-fit">
        <button className="px-6 py-2 rounded-lg bg-linear-to-b from-emerald-500 to-emerald-700 cursor-pointer text-white text-sm font-semibold shadow-md shadow-emerald-200 transition-all">
          New Return
        </button>
        <button onClick={() => { navigate('/manage/return') }} className="px-6 py-2 rounded-lg cursor-pointer text-emerald-500 text-sm font-medium hover:bg-emerald-100 transition-all">
          Manage Returns
        </button>
      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm px-5 py-3.5 mb-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200 shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11a4 4 0 010 8h-1m-8-8L3 7m0 3l2 3" />
              </svg>
            </div>
            <div>
              <h2 className="text-gray-800 text-sm font-bold leading-tight">Return Details</h2>
              <p className="text-gray-400 text-[11px]">Fill the info</p>
            </div>
          </div>

          <div className="hidden lg:block w-px self-stretch bg-emerald-100 my-1" />

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-3">
            <div>
              <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block mb-1">Gate Pass No</label>
              <input value={gatePass} onChange={(e) => setGatePass(e.target.value)}
                type="text" placeholder="Manual gate pass no..."
                className="w-full bg-emerald-50/70 border border-emerald-100 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
            </div>
            <div>
              <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block mb-1">Customer Name</label>
              <SearchableSelect
                options={customers.map((c) => ({ value: c.customerName, label: c.customerName }))}
                value={selectedCustomer}
                onChange={setSelectedCustomer}
                placeholder="Search customer..."
              />
            </div>
            <div>
              <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block mb-1">Date <span className="text-rose-400">*</span></label>
              <input value={date} onChange={(e) => setDate(e.target.value)} type="date" defaultValue="2026-06-23"
                className="w-full bg-emerald-50/70 border border-emerald-100 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
            </div>
            <div>
              <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block mb-1">Show Rate</label>
              <select value={showRate} onChange={(e) => setShowRate(e.target.value)} className="w-full bg-emerald-50/70 border border-emerald-100 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                <option>Distributor Rate</option>
                <option>Retail Rate</option>
                <option>Wholesale Rate</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block mb-1">Return Type</label>
              <select value={returnType} onChange={(e) => setReturnType(e.target.value)} className="w-full bg-emerald-50/70 border border-emerald-100 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select Return Type</option>
                <option value="Customer Return">Customer Return</option>
                <option value="WareHouse Return">WareHouse Return</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 min-h-0" style={{ height: "calc(100vh - 220px)" }}>

        <div className="w-full xl:w-[47%] shrink-0 flex flex-col gap-3">

          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-3 flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name..."
              className="flex-1 min-w-0 bg-emerald-50 border border-emerald-100 rounded-full px-5 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
            />
            <SelectCategory value={category} onChange={setCategory} />
            <button className="w-11 h-11 shrink-0 cursor-pointer bg-linear-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shadow-md shadow-emerald-200 transition-all hover:from-emerald-500 hover:to-emerald-600">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-4 flex flex-col flex-1">
            <p className="text-emerald-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Products &mdash; {products.length} items
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 content-start overflow-y-auto pr-1 custom-scroll" style={{ height: "50vh" }}>
              {visibleProducts.map((product) => {
                const inCart = selectedItems.find((it) => it._id === product._id)
                const tone = [
                  "from-emerald-400 to-emerald-600",
                  "from-sky-400 to-sky-600",
                  "from-amber-400 to-amber-600",
                  "from-violet-400 to-violet-600",
                  "from-rose-400 to-rose-600",
                ][(product.productName || "").length % 5]
                return (
                  <div
                    key={product._id}
                    onClick={() => handleAddItem(product)}
                    className={`group relative h-36 flex flex-col items-center overflow-hidden rounded-2xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${inCart ? "border-emerald-400 bg-emerald-50/70 shadow-md shadow-emerald-100" : "border-emerald-100 bg-white hover:border-emerald-300 hover:shadow-emerald-100"}`}
                  >
                    {inCart && (
                      <div className="absolute right-2 top-2 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm ring-2 ring-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col items-center justify-center px-2 py-3">
                      <div className={`mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br ${tone} shadow-sm transition-transform duration-200 group-hover:scale-110`}>
                        <ShoppingBag size={19} className="text-white" strokeWidth={2.2} />
                      </div>
                      <p className="text-gray-700 text-[11px] font-semibold leading-tight line-clamp-2 text-center group-hover:text-emerald-700 transition-colors min-h-7.5">
                        {product.productName}
                      </p>
                      <p className="text-emerald-600 text-sm font-bold text-center mt-1">
                        Rs. {Number(product.distributorPrice || 0).toLocaleString()}
                      </p>
                    </div>

                    <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${inCart ? "bg-linear-to-br from-emerald-600 via-teal-600 to-emerald-700" : "bg-linear-to-br from-emerald-500 via-emerald-600 to-emerald-700"}`}>
                      {inCart ? (
                        <>
                          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg">
                            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <div className="relative text-center">
                            <p className="text-[11px] font-extrabold tracking-[0.15em] drop-shadow">Added</p>
                            <p className="text-[9px] text-white/70">In return</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="relative flex h-12 w-12 scale-0 rotate-45 items-center justify-center rounded-2xl bg-white/15 ring-4 ring-white/10 backdrop-blur-sm transition-all delay-100 duration-300 group-hover:scale-100 group-hover:rotate-0">
                            <svg className="w-6 h-6 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                          </div>
                          <div className="relative text-center">
                            <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] drop-shadow">Add to Return</p>
                            <p className="text-[9px] text-white/70">Click to add</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}

              {products.length === 0 && (
                <div className="col-span-2 sm:col-span-3 xl:col-span-4 flex flex-col items-center justify-center py-20 gap-2">
                  <ShoppingBag size={40} className="text-emerald-100" />
                  <p className="text-gray-400 text-xs">Add some products</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col min-h-0">

          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden flex flex-col flex-1">

            <div className="px-5 py-3 border-b border-emerald-100 flex items-center gap-2 bg-emerald-50/50 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11a4 4 0 010 8h-1m-8-8L3 7m0 3l2 3" />
                </svg>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-emerald-100 px-2.5 py-1 text-gray-700 text-sm font-semibold shadow-sm">
                Return Items
                <span className="bg-emerald-100 text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">{selectedItems.length}</span>
              </span>
            </div>

            <div className="overflow-auto custom-scroll flex-1 min-h-0">
              <table className="w-full min-w-160 text-sm border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-emerald-600 text-white">
                    <th className="text-left text-xs font-semibold px-3 py-3 whitespace-nowrap">Item Information <span className="text-red-300">*</span></th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Desc</th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Carton</th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Dozen</th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Qnty <span className="text-red-300">*</span></th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Rate</th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Total</th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedItems.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-20">
                        <div className="flex flex-col items-center gap-2">
                          <svg className="w-10 h-10 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                          </svg>
                          <span className="text-gray-400 text-xs">Select Product From the Left Side</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    selectedItems.map((item, idx) => (
                      <tr key={item._id} className={`hover:bg-emerald-50/40 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                        <td className="px-3 py-2 min-w-35">
                          <input type="text" defaultValue={item.name}
                            className="w-full bg-transparent border border-transparent hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 min-w-22.5">
                          <input type="text" placeholder="Description"
                            value={item.desc || ""}
                            onChange={(e) => setSelectedItems((prev) => prev.map((it) => it._id === item._id ? { ...it, desc: e.target.value } : it))}
                            className="w-full bg-transparent border border-transparent hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-500 text-xs focus:outline-none transition-all placeholder-gray-300" />
                        </td>
                        <td className="px-3 py-2 w-16">
                          <input  placeholder="0"
                            value={item.carton}
                            onChange={(e) => handleFieldChange(item._id, 'carton', e.target.value)}
                            className="w-full bg-emerald-50/50 border border-emerald-200 hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs text-center focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 w-16">
                          <input  placeholder="0"
                            value={item.dozen}
                            onChange={(e) => handleFieldChange(item._id, 'dozen', e.target.value)}
                            className="w-full bg-emerald-50/50 border border-emerald-200 hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs text-center focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 w-16">
                          <input  placeholder="0"
                            value={item.qty}
                            onChange={(e) => handleFieldChange(item._id, 'qty', e.target.value)}
                            className="w-full bg-emerald-50/50 border border-emerald-200 hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs text-center focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 w-16 text-center text-gray-600 text-xs tabular-nums">{Number(item.rate || 0).toLocaleString()}</td>
                        <td className="px-3 py-2 w-20 text-center text-gray-700 text-xs font-bold tabular-nums">{Number(item.total || 0).toLocaleString()}</td>
                        <td className="px-3 py-2 w-20">
                          <div className="flex items-center justify-center gap-1.5">
                            <button onClick={() => handleRemoveItem(item._id)} className="w-6 h-6 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded flex items-center justify-center transition-colors cursor-pointer">
                              <Trash2 size={13} />
                            </button>
                            <button className="w-6 h-6 bg-teal-50 text-teal-500 hover:bg-teal-500 hover:text-white rounded flex items-center justify-center transition-colors cursor-pointer">
                              <Eye size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 px-5 py-4 border-t border-emerald-100 bg-emerald-50/40 shrink-0 mt-auto">
              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">Grand Total</p>
                  <p className="text-gray-800 text-xl font-bold mt-0.5">
                    Rs. <span className="text-emerald-700">{grandTotal.toLocaleString()}</span>
                  </p>
                </div>
                <div className="w-px h-9 bg-emerald-100" />
                <div>
                  <label className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide block mb-1">Previous Amount</label>
                  <input  placeholder="0.00"
                    value={previousAmount} onChange={(e) => setPreviousAmount(e.target.value)}
                    className="w-28 bg-white border border-emerald-100 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 rounded-lg px-3 py-1.5 text-gray-700 placeholder-gray-400 text-sm font-semibold focus:outline-none transition-all" />
                </div>
                <div className="w-px h-9 bg-emerald-100" />
                <div>
                  <label className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide block mb-1">Due</label>
                  <div className={`w-28 rounded-lg px-3 py-1.5 text-sm font-bold tabular-nums ${dueAmount < 0 ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-200' : 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'}`}>
                    Rs. {dueAmount.toLocaleString()}
                  </div>
                </div>
              </div>
              <button
                onClick={handleProceed}
                disabled={saving}
                className="w-full sm:w-auto px-8 py-2.5 cursor-pointer bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed">
                {saving ? 'Saving...' : 'Proceed to Return →'}
              </button>
            </div>

          </div>

        </div>

      </div>

      <style>{`
  .custom-scroll::-webkit-scrollbar { width: 5px; height: 6px; }
  .custom-scroll::-webkit-scrollbar-track { background: transparent; }
  .custom-scroll::-webkit-scrollbar-thumb { background: #a7f3d0; border-radius: 99px; }
  .custom-scroll::-webkit-scrollbar-thumb:hover { background: #6ee7b7; }
`}</style>
    </div>
  )
}

export default Return