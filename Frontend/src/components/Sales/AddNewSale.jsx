import SelectCategory from '../../components/SelectCategory/SelectCategory.jsx'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ShoppingCart, ArrowRight, Loader2, Check, Trash2, Eye } from "lucide-react";


const NewSale = () => {
  let navigate = useNavigate()

  const [fetchProducts, setFetchProducts] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [saleStatus, setSaleStatus] = useState("idle")
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [saleProducts, setSaleProducts] = useState({
    gatePass: '',
    customerName: '',
    Date: '',
    showRate: '',
    freightCharges: '',
    previousAmount: '',


  })

  useEffect(() => {
    async function loadProducts() {
      let res = await axios.get('http://localhost:3000/find/product')
      setFetchProducts(res.data)
    }
    loadProducts()
  }, [])

  const visibleProducts = fetchProducts.filter((p) =>
    (p.productName || "").toLowerCase().includes(search.toLowerCase())
  )
  async function handleProceed() {
    if (selectedItems.length === 0) return

    setSaleStatus("processing")

    await new Promise(r => setTimeout(r, 1400))

    setSaleStatus("done")
    setTimeout(() => setSaleStatus("idle"), 2000)
  }
  function handleAddItem(product) {
    const exists = selectedItems.find((item) => item._id === product._id)

    if (exists) {
      return
    }

    const rate = Number(product.distributorPrice) || 0
    setSelectedItems([
      ...selectedItems,
      {
        _id: product._id,
        name: product.productName,
        rate: rate,
        cartonSize: Number(product.cartonSize) || 0,   // ← ye
        carton: 0,
        qty: 1,
        total: rate,
      }
    ])
  }
  function handleFieldChange(id, field, value) {
    setSelectedItems(selectedItems.map((item) => {
      if (item._id !== id) return item

      const updated = { ...item, [field]: Number(value) || 0 }

      if (field === "carton") {
        updated.qty = updated.carton * (updated.cartonSize || 0)
      }

      if (field === "qty") {
        updated.carton = 0
      }
      updated.dozen = updated.qty / 12

      updated.total = updated.qty * updated.rate

      return updated
    }))
  }

  function handleTextChange(id, field, value) {
    setSelectedItems(selectedItems.map((item) =>
      item._id === id ? { ...item, [field]: value } : item
    ))
  }

  function handleRemoveItem(id) {
    setSelectedItems(selectedItems.filter((item) => item._id !== id))
  }

  async function handleNewSale() {
    try {
      let payload = {
        ...saleProducts,
        items: selectedItems,
        grandTotal: grandTotal,
        totalCartons: totalCartons,
      }
      let response = await axios.post('http://localhost:3000/new/sale', payload)
      console.log(response.data)
    } catch (err) {
      console.log("SALE FAILED:", err.response?.data || err.message)
    }
  }

  



  const grandTotal = selectedItems.reduce((s, i) => s + (i.total ?? 0), 0)
  const totalCartons = selectedItems.reduce((s, i) => s + (Number(i.carton) || 0), 0)


  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50 p-4 md:p-5">

      <div className="flex gap-1 mb-5 bg-white border border-emerald-100 shadow-sm p-1 rounded-xl w-fit">
        <button className="px-6 py-2 rounded-lg bg-linear-to-b from-emerald-500 to-emerald-700 cursor-pointer text-white text-sm font-semibold shadow-md shadow-emerald-200 transition-all">
          New Sale
        </button>
        <button onClick={() => { navigate('/manageSale') }} className="px-6 py-2 rounded-lg cursor-pointer text-emerald-500 text-sm font-medium hover:bg-emerald-100 transition-all">
          Manage Sales
        </button>
      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-4 mb-4">

        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200 shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h2 className="text-gray-800 text-sm font-semibold">Sale Details</h2>
            <p className="text-gray-400 text-xs">Fill in the information below</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          <div>
            <label className="text-slate-800 text-sm  tracking-wide block mb-1.5">Gate Pass No</label>
            <input onChange={(e) => { setSaleProducts({ ...saleProducts, gatePass: e.target.value }) }} type="text" placeholder="Manual gate pass no..."
              className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
          </div>
          <div>
            <label className="text-slate-800 text-sm  tracking-wide block mb-1.5">Customer Name</label>
            <input onChange={(e) => { setSaleProducts({ ...saleProducts, customerName: e.target.value }) }} type="text" placeholder="Ali"
              className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>
          <div>
            <label className="text-slate-800 text-sm  tracking-wide block mb-1.5">
              Date <span className="text-red-400">*</span>
            </label>
            <input onChange={(e) => { setSaleProducts({ ...saleProducts, Date: e.target.value }) }} type="date" defaultValue="2026-06-23"
              className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>
          <div>
            <label className="text-slate-800 text-sm  tracking-wide block mb-1.5">Show Rate</label>
            <select onChange={(e) => { setSaleProducts({ ...saleProducts, showRate: e.target.value }) }} className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
              <option>Distributor Rate</option>
              <option>Retail Rate</option>
              <option>Wholesale Rate</option>
            </select>
          </div>
          <div>
            <label className="text-slate-800 text-sm  tracking-wide block mb-1.5">Freight Charges</label>
            <input onChange={(e) => { setSaleProducts({ ...saleProducts, freightCharges: e.target.value }) }} type="number" placeholder="0.00"
              className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
          </div>
          <div>
            <label className="text-slate-800 text-sm  tracking-wide block mb-1.5">Previous Amount</label>
            <input onChange={(e) => { setSaleProducts({ ...saleProducts, previousAmount: e.target.value }) }} type="number" placeholder="0.00"
              className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
          </div>
        </div>

      </div>

      <div className="flex flex-col xl:flex-row gap-4">

        <div className=" xl:w-[50%] shrink-0 flex flex-col gap-3">

          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-3 flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name..."
              className="flex-1 bg-emerald-50 border border-emerald-100 rounded-full px-5 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
            />
            <SelectCategory
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val)}
            />
            <button className="w-11 h-11 shrink-0 cursor-pointer bg-linear-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shadow-md shadow-emerald-200 transition-all hover:from-emerald-500 hover:to-emerald-600">
              <svg className="w-4 h-4 text-white " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-4 flex flex-col">
            <p className="text-emerald-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Products — {visibleProducts.length} items
            </p>

            <div className="grid grid-cols-4 gap-3 content-start overflow-y-auto pr-1 custom-scroll" style={{ height: "43vh" }}>
              {visibleProducts.map((product) => {

                const inCart = selectedItems.find((item) => item._id === product._id)
                const retail = Number(product.distributorPrice) || 0

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
                    <div className={` w-full shrink-0 bg-linear-to-r ${tone} opacity-80`} />

                    {inCart && (
                      <div className="absolute right-2 top-3 z-20 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                        {inCart.qty}
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
                        Rs. {retail.toLocaleString()}
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
                            <p className="text-[11px] font-extrabold  tracking-[0.15em] drop-shadow">Added</p>
                            <p className="text-[9px] text-white/70">In your sale</p>
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
                            <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] drop-shadow">Add to Sale</p>
                            <p className="text-[9px] text-white/70">Click to add</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}

              {visibleProducts.length === 0 && (
                <div className="col-span-4 flex flex-col items-center justify-center py-20 gap-2">
                  <ShoppingBag size={40} className="text-emerald-100" />
                  <p className="text-gray-400 text-xs">{search ? `No match for "${search}"` : "Add some products"}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-3">

          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden flex flex-col flex-1">

            <div className="px-5 py-3 border-b border-emerald-100 flex items-center gap-2.5 bg-linear-to-r from-emerald-50 to-white shrink-0">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 shadow-sm shadow-emerald-200">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-white border border-emerald-100 px-2.5 py-1 shadow-sm">
                <span className="text-gray-700 text-sm font-semibold">Sale Items</span>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-xs font-bold text-white tabular-nums">
                  {selectedItems.length}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-white border border-emerald-100 px-2.5 py-1 shadow-sm">
                <span className="text-gray-700 text-sm font-semibold">Total Cartons</span>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-emerald-700 px-1.5 text-xs font-bold text-white tabular-nums">
                  {totalCartons}
                </span>
              </div>

            </div>

            <div className="overflow-y-auto custom-scroll flex-1" style={{ maxHeight: "45vh" }}>
              <table className="w-full text-sm border-collapse" style={{ tableLayout: "fixed" }}>
                <colgroup>
                  <col style={{ width: "26%" }} />
                  <col style={{ width: "16%" }} />
                  <col style={{ width: "9%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "9%" }} />
                  <col style={{ width: "11%" }} />
                  <col style={{ width: "12%" }} />
                  <col style={{ width: "9%" }} />
                </colgroup>
                <thead className="sticky top-0 z-10">
                  <tr className="bg-emerald-600 text-white">
                    <th className="text-left text-xs font-semibold px-3 py-2.5 whitespace-nowrap">Item Information <span className="text-red-300">*</span></th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5">Desc</th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5">Carton</th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5">Dozen</th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5">Qnty <span className="text-red-300">*</span></th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5">Rate <span className="text-red-300">*</span></th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5">Total</th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedItems.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-24">
                        <div className="flex flex-col items-center gap-2">
                          <svg className="w-9 h-9 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                          </svg>
                          <span className="text-gray-400 text-xs">select product from left side </span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    selectedItems.map((item, idx) => (
                      <tr key={item._id} className={`hover:bg-blue-50/40 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                        <td className="px-3 py-2 min-w-35">
                          <input type="text" value={item.name}
                            onChange={(e) => handleTextChange(item._id, "name", e.target.value)}
                            className="w-full bg-transparent border border-transparent hover:border-green-300 focus:border-green-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 min-w-22.5">
                          <input type="text" placeholder="Description"
                            value={item.desc ?? ""}
                            onChange={(e) => handleTextChange(item._id, "desc", e.target.value)}
                            className="w-full bg-transparent border border-transparent hover:border-green-300 focus:border-green-400 focus:bg-white rounded px-2 py-1 text-gray-400 text-xs focus:outline-none transition-all placeholder-gray-300" />
                        </td>
                        <td className="px-3 py-2 w-16">
                          <input placeholder="0"
                            value={item.carton ?? ""}
                            onChange={(e) => handleFieldChange(item._id, "carton", e.target.value)}
                            className="w-full bg-transparent border border-transparent hover:border-green-300 focus:border-green-400 focus:bg-white rounded px-2 py-1 text-gray-600 text-xs text-center focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 w-16">
                          <input placeholder="0"
                            value={item.dozen ?? ""}
                            readOnly
                            onChange={(e) => handleTextChange(item._id, "dozen", e.target.value)}
                            className="w-full bg-transparent border border-transparent hover:border-green-300 focus:border-green-400 focus:bg-white rounded px-2 py-1 text-gray-600 text-xs text-center focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 w-16">
                          <input value={item.qty}
                            onChange={(e) => handleFieldChange(item._id, "qty", e.target.value)}
                            className="w-full bg-transparent border border-transparent hover:border-green-300 focus:border-green-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs text-center focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 w-24">
                          <input value={item.rate}
                            onChange={(e) => handleFieldChange(item._id, "rate", e.target.value)}
                            className="w-full bg-transparent border border-transparent hover:border-green-300 focus:border-green-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs text-center focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 text-center text-gray-700 text-xs font-medium w-20">{(item.total ?? 0).toLocaleString()}</td>
                        <td className="px-3 py-2 w-20">
                          <div className="flex items-center justify-center gap-1.5">
                            <motion.button
                              onClick={() => handleRemoveItem(item._id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.85, rotate: -8 }}
                              transition={{ type: "spring", stiffness: 500, damping: 15 }}
                              className="group/del flex h-6 w-6 items-center justify-center rounded-md bg-red-50 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer transition-colors"

                            >
                              <Trash2 size={13} className="transition-transform group-hover/del:rotate-12" />
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.12, y: -1 }}
                              whileTap={{ scale: 0.85 }}
                              transition={{ type: "spring", stiffness: 500, damping: 15 }}
                              className="group/view relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-md bg-teal-50 text-teal-500 hover:bg-teal-500 hover:text-white cursor-pointer transition-colors" >
                              <span className="absolute inset-0 rounded-md bg-teal-400 opacity-0 group-hover/view:animate-[viewPulse_1s_ease-out_infinite]" />
                              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-500 group-hover/view:translate-x-full" />
                              <motion.span
                                className="relative"
                                initial={false}
                                whileHover={{ rotate: [0, -8, 8, 0] }}
                                transition={{ duration: 0.4 }}>
                                <Eye size={13} />
                              </motion.span>
                            </motion.button>
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
                  Rs. <span className="text-emerald-700">
                    {grandTotal.toLocaleString()}
                  </span>
                </p>
              </div>
              <motion.button
                onClick={() => { handleProceed(); handleNewSale(); }}
                disabled={saleStatus !== "idle"}
                whileHover={saleStatus === "idle" ? { y: -3, scale: 1.02 } : {}}
                whileTap={saleStatus === "idle" ? { scale: 0.97 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className={`group relative w-full sm:w-auto min-w-47.5 overflow-hidden px-8 py-3 cursor-pointer text-white text-sm font-bold rounded-2xl shadow-lg transition-colors duration-500 disabled:cursor-default ${saleStatus === "done"
                  ? "bg-emerald-500 shadow-emerald-300/60"
                  : "bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-700 shadow-emerald-300/60"
                  }`}
              >
                {saleStatus === "idle" && (
                  <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent skew-x-12 transition-transform duration-900 group-hover:translate-x-full" />
                )}

                {saleStatus === "done" && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0.6 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0 rounded-2xl bg-white"
                  />
                )}

                <AnimatePresence mode="wait">

                  {saleStatus === "idle" && (
                    <motion.span key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="relative flex items-center justify-center gap-2">
                      <ShoppingCart size={16} className="transition-transform duration-300 group-hover:-rotate-12" />
                      Proceed to Sale
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                        <ArrowRight size={16} strokeWidth={2.5} />
                      </span>
                    </motion.span>
                  )}

                  {saleStatus === "processing" && (
                    <motion.span key="processing"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="relative flex items-center justify-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </motion.span>
                  )}

                  {saleStatus === "done" && (
                    <motion.span key="done"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="relative flex items-center justify-center gap-2">
                      <motion.span
                        initial={{ scale: 0, rotate: -120 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 12, delay: 0.1 }}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                        <Check size={13} strokeWidth={4} className="text-emerald-600" />
                      </motion.span>
                      Sale Ready!
                    </motion.span>
                  )}

                </AnimatePresence>
              </motion.button>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #bfdbfe; border-radius: 99px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #93c5fd; }

        @keyframes saleGlow {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 0.85; }
        }
        @keyframes riseDot {
          0%   { transform: translateY(0);    opacity: 0.6; }
          100% { transform: translateY(-14px); opacity: 0;   }
        }
        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }
        @keyframes floatUp {
          0%   { transform: translateY(0);    opacity: 0.7; }
          100% { transform: translateY(-20px); opacity: 0;   }
        }
        @keyframes pingRing {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(1.8); opacity: 0;   }
        }
      `}</style>
    </div>
  );
};

export default NewSale;