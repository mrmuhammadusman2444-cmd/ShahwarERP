import SelectCategory from '../../components/SelectCategory/SelectCategory.jsx'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SelectCustomer from '../Sales/SelectCustomers.jsx'
import { ShoppingBag, Trash2, Eye, User } from 'lucide-react';

const NewOrder = () => {
  let navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [customers, setCustomers] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [orderDate, setOrderDate] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [saving, setSaving] = useState(false)
  const location = useLocation()
  const editOrder = location.state?.editOrder || null
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    if (editOrder) {
      setEditId(editOrder._id)
      setSelectedCustomer(editOrder.customerName || "")
      setOrderDate(editOrder.orderDate ? editOrder.orderDate.slice(0, 10) : "")
      setDeliveryDate(editOrder.deliveryDate ? editOrder.deliveryDate.slice(0, 10) : "")
      setSelectedItems(editOrder.items || [])
    }
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
        await axios.put(`http://localhost:3000/update/order/${editId}`, {
          customerName: selectedCustomer,
          orderDate: orderDate,
          deliveryDate: deliveryDate,
          items: selectedItems,
          totalWeight: totalWeight,
          grandTotal: grandTotal,
        })
        navigate('/ManageOrdersPage')
      } else {
        await axios.post('http://localhost:3000/add/order', {
          customerName: selectedCustomer,
          orderDate: orderDate,
          deliveryDate: deliveryDate,
          items: selectedItems,
          totalWeight: totalWeight,
          grandTotal: grandTotal,
          saleBy: saleBy,
        })
        setSelectedItems([])
        setSelectedCustomer("")
        setOrderDate("")
        setDeliveryDate("")
      }
    } catch (err) {
      console.log("ORDER SAVE FAILED:", err.response?.data || err.message)
      alert("Order save nahi hua")
    }
    setSaving(false)
  }

  useEffect(() => {
    async function fetchCustomers() {
      try {
        let res = await axios.get('http://localhost:3000/find')
        setCustomers(res.data)
      } catch (err) {
        console.log("CUSTOMERS FETCH FAILED:", err.response?.data || err.message)
      }
    }
    fetchCustomers()
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      try {
        let res = await axios.get('http://localhost:3000/find/product')
        let saleOnly = res.data.filter((p) => p.saleRawCategory !== "Raw")
        setProducts(saleOnly)
      } catch (err) {
        console.log("PRODUCTS FETCH FAILED:", err.response?.data || err.message)
      }
    }
    fetchProducts()
  }, [])

  function handleDateChange(value) {
    setOrderDate(value)
    if (value) {
      let d = new Date(value)
      d.setDate(d.getDate() + 7)
      let yyyy = d.getFullYear()
      let mm = String(d.getMonth() + 1).padStart(2, "0")
      let dd = String(d.getDate()).padStart(2, "0")
      setDeliveryDate(`${yyyy}-${mm}-${dd}`)
    } else {
      setDeliveryDate("")
    }
  }

  const visibleProducts = products.filter((p) => {
    let matchName = (p.productName || "").toLowerCase().includes(search.toLowerCase())
    let noCatFilter = !category || category === "All Categories" || category === "all"
    let matchCat = noCatFilter ? true : (p.mainCategory === category || p.productCategory === category)
    return matchName && matchCat
  })

  function handleAddItem(product) {

    setSelectedItems((prev) => {
      let exists = prev.find((it) => it._id === product._id)
      if (exists) return prev
      return [...prev, {
        _id: product._id,
        name: product.productName,
        mainCategory: product.mainCategory || "",
        desc: "",
        cartonSize: Number(product.cartonSize) || 0,
        dozenSize: Number(product.Dozen) || 0,
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

  function handleCartonChange(id, value) {
    setSelectedItems((prev) => prev.map((it) => {
      if (it._id !== id) return it
      let carton = Number(value) || 0
      let qty = carton * it.cartonSize
      let dozen = it.dozenSize ? carton * (it.cartonSize / it.dozenSize) : 0
      let weight = carton * it.unitWeight
      let total = qty * it.rate
      return { ...it, carton: value, qty, dozen, weight, total }
    }))
  }

  function handleRemoveItem(id) {
    setSelectedItems((prev) => prev.filter((it) => it._id !== id))
  }

  const grandTotal = selectedItems.reduce((s, i) => s + (Number(i.total) || 0), 0)
  const totalWeight = selectedItems.reduce((s, i) => s + (Number(i.weight) || 0), 0)

  const weightDisplay = totalWeight >= 1000
    ? `${(totalWeight / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })} ton (${totalWeight.toLocaleString()} kg)`
    : `${totalWeight.toLocaleString()} kg`

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50 p-4 md:p-5">

      <div className="flex gap-1 mb-5 bg-white border border-emerald-100 shadow-sm p-1 rounded-xl w-fit">
        <button className="px-6 py-2 rounded-lg bg-linear-to-b from-emerald-500 to-emerald-700 cursor-pointer text-white text-sm font-semibold shadow-md shadow-emerald-200 transition-all">
          New Order
        </button>
        <button onClick={() => { navigate('/ManageOrdersPage') }} className="px-6 py-2 rounded-lg cursor-pointer text-emerald-500 text-sm font-medium hover:bg-emerald-100 transition-all">
          Manage Orders
        </button>
      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-5 mb-4 pl-12 md:pl-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200 shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h2 className="text-gray-800 text-sm font-semibold">Order Details</h2>
            <p className="text-gray-400 text-xs">Fill in the information below</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
          <div>
            <label className="text-gray-900 text-sm tracking-wide block mb-1.5">Product Id</label>
            <input type="text" placeholder="Product Id"
              className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
          </div>
          <div>
            <label className="text-gray-900 text-sm tracking-wide block mb-1.5">Customer Name</label>
            < SelectCustomer value={selectedCustomer} onChange={setSelectedCustomer} type="text" placeholder="Ali"
              className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>
          <div>
            <label className="text-gray-900 text-sm tracking-wide block mb-1.5">
              Date <span className="text-red-400">*</span>
            </label>
            <input type="date"
              value={orderDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>
          <div>
            <label className="text-gray-900 text-sm tracking-wide block mb-1.5">
              Delivery Date <span className="text-red-400">*</span>
            </label>
            <input type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>
          <div>
            <label className="text-gray-900 text-sm tracking-wide block mb-1.5">Weight</label>
            <div className="flex items-center gap-2.5 rounded-xl border border-emerald-100 bg-linear-to-br from-emerald-50 to-white px-3 py-2 h-11">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 text-white shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l7 4v10l-7 4-7-4V7l7-4z" />
                </svg>
              </div>
              {totalWeight > 0 ? (
                <div className="flex items-baseline gap-1.5 min-w-0">
                  <span className="text-gray-800 text-sm font-bold tabular-nums truncate">{totalWeight.toLocaleString()}</span>
                  <span className="text-gray-400 text-[11px] font-medium">kg</span>
                  {totalWeight >= 1000 && (
                    <span className="ml-1 shrink-0 rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 tabular-nums">
                      {(totalWeight / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })} ton
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-gray-400 text-sm">Weight (auto)</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-4">

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
              Products — {visibleProducts.length} items
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 content-start overflow-y-auto pr-1 custom-scroll" style={{ height: "43vh" }}>
              {visibleProducts.map((product) => {
                const inCart = selectedItems.find((item) => item._id === product._id)
                const rate = Number(product.distributorPrice) || 0
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
                    className={`group relative h-36 flex flex-col items-center overflow-hidden rounded-2xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${inCart
                      ? "border-emerald-400 bg-emerald-50/70 shadow-md shadow-emerald-100"
                      : "border-emerald-100 bg-white hover:border-emerald-300 hover:shadow-emerald-100"
                      }`}
                  >
                    {inCart && (
                      <div className="absolute right-2 top-3 z-20 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                        ✓
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
                        Rs. {rate.toLocaleString()}
                      </p>
                    </div>

                    <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${inCart
                      ? "bg-linear-to-br from-emerald-600 via-teal-600 to-emerald-700"
                      : "bg-linear-to-br from-emerald-500 via-emerald-600 to-emerald-700"
                      }`}>
                      <span className="absolute -inset-8 opacity-30 group-hover:animate-[spinSlow_4s_linear_infinite]"
                        style={{ background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.4), transparent 40%)" }} />

                      <span className="absolute inset-0 -translate-x-full -translate-y-full bg-linear-to-br from-white/50 via-transparent to-transparent transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />

                      <span className="absolute left-3 top-4 h-1 w-1 rounded-full bg-white/70 opacity-0 group-hover:opacity-100 group-hover:animate-[floatUp_1.6s_ease-in_infinite]" />
                      <span className="absolute right-4 top-6 h-1.5 w-1.5 rounded-full bg-white/50 opacity-0 group-hover:opacity-100 group-hover:animate-[floatUp_1.8s_ease-in_infinite_0.3s]" />
                      <span className="absolute left-1/2 bottom-3 h-1 w-1 rounded-full bg-white/60 opacity-0 group-hover:opacity-100 group-hover:animate-[floatUp_1.4s_ease-in_infinite_0.6s]" />

                      <span className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-white/10 blur-xl" />
                      <span className="absolute -bottom-6 -left-4 h-16 w-16 rounded-full bg-white/10 blur-xl" />

                      {inCart ? (
                        <>
                          <div className="relative flex h-12 w-12 scale-0 items-center justify-center transition-transform delay-100 duration-300 group-hover:scale-100">
                            <span className="absolute inset-0 rounded-full bg-white/20 group-hover:animate-[pingRing_1.5s_ease-out_infinite]" />
                            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg">
                              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          </div>
                          <div className="relative text-center">
                            <p className="text-[11px] font-extrabold tracking-[0.15em] drop-shadow">Added</p>
                            <p className="text-[9px] text-white/70">In your order</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="relative flex h-12 w-12 scale-0 rotate-45 items-center justify-center rounded-2xl bg-white/15 ring-4 ring-white/10 backdrop-blur-sm transition-all delay-100 duration-300 group-hover:scale-100 group-hover:rotate-0">
                            <svg className="w-6 h-6 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                          <div className="relative text-center">
                            <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] drop-shadow">Add to Order</p>
                            <p className="text-[9px] text-white/70">Click to add</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}

              {visibleProducts.length === 0 && (
                <div className="col-span-2 sm:col-span-3 xl:col-span-4 flex flex-col items-center justify-center py-20 gap-2">
                  <ShoppingBag size={40} className="text-emerald-100" />
                  <p className="text-gray-400 text-xs">{search ? `No match for "${search}"` : "Add some products"}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col">

          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden flex flex-col flex-1">

            <div className="px-5 py-3 border-b border-emerald-100 flex items-center gap-2 bg-emerald-50/50 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-emerald-100 px-2.5 py-1 text-gray-700 text-sm font-semibold shadow-sm">
                Order Items
                <span className="bg-emerald-100 text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">{selectedItems.length}</span>
              </span>
            </div>

            <div className="overflow-auto custom-scroll flex-1" style={{ minHeight: "300px" }}>
              <table className="w-full min-w-160 text-sm border-collapse" style={{ tableLayout: "fixed" }}>
                <colgroup>
                  <col style={{ width: "24%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "11%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "11%" }} />
                  <col style={{ width: "13%" }} />
                  <col style={{ width: "11%" }} />
                </colgroup>
                <thead className="sticky top-0 z-10">
                  <tr className="bg-emerald-600 text-white">
                    <th className="text-left text-xs font-semibold px-3 py-3 whitespace-nowrap">Item Information <span className="text-red-300">*</span></th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Desc</th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Carton</th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Dozen</th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Qnty <span className="text-red-300">*</span></th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Weight</th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedItems.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-20">
                        <div className="flex flex-col items-center gap-2">
                          <svg className="w-10 h-10 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                          </svg>
                          <span className="text-gray-400 text-xs">Select product from left side</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    selectedItems.map((item, idx) => (
                      <tr key={item._id} className={`hover:bg-emerald-50/40 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                        <td className="px-3 py-2">
                          <input type="text" defaultValue={item.name}
                            className="w-full bg-transparent border border-transparent hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2">
                          <input type="text" placeholder="Description"
                            className="w-full bg-transparent border border-transparent hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-400 text-xs focus:outline-none transition-all placeholder-gray-300" />
                        </td>
                        <td className="px-3 py-2 w-16">
                          <input placeholder="0"
                            value={item.carton}
                            onChange={(e) => handleCartonChange(item._id, e.target.value)}
                            className="w-full bg-emerald-50/50 border border-emerald-200 hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs text-center focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 w-16 text-center text-gray-600 text-xs tabular-nums">{Number(item.dozen || 0).toLocaleString()}</td>
                        <td className="px-3 py-2 w-16 text-center text-gray-700 text-xs font-medium tabular-nums">{Number(item.qty || 0).toLocaleString()}</td>
                        <td className="px-3 py-2 w-20 text-center text-gray-600 text-xs tabular-nums">{Number(item.weight || 0).toLocaleString()} {item.weightUnit}</td>
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

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-4 border-t border-emerald-100 bg-emerald-50/40 shrink-0 mt-auto">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Grand Total</p>
                <p className="text-gray-800 text-xl font-bold mt-0.5">
                  Rs. <span className="text-emerald-700">{grandTotal.toLocaleString()}</span>
                </p>
              </div>
              <button
                onClick={handleProceed}
                disabled={saving}
                className="w-full sm:w-auto px-8 py-2.5 bg-linear-to-r cursor-pointer from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed">
                {saving ? 'Saving...' : (editId ? 'Update Order →' : 'Proceed to Order →')}
              </button>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #a7f3d0; border-radius: 99px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #6ee7b7; }
        @keyframes spinSlow { to { transform: rotate(360deg); } }
        @keyframes floatUp { 0% { transform: translateY(6px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(-10px); opacity: 0; } }
        @keyframes pingRing { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.8); opacity: 0; } }
      `}</style>
    </div>
  );
};

export default NewOrder;