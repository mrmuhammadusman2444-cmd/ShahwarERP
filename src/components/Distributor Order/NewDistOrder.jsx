import { useState, useEffect } from 'react'
import axios from 'axios'
import SelectCategory from '../../components/SelectCategory/SelectCategory.jsx'
import { ShoppingBag, Trash2 } from 'lucide-react'

const PlaceOrder = () => {
  const [products, setProducts] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [remark, setRemark] = useState("")
  const [saving, setSaving] = useState(false)

  const user = JSON.parse(localStorage.getItem('user')) || {}
  const distributorName = `${user.firstName || ""} ${user.lastName || ""}`.trim()

  useEffect(() => {
            async function fetchProducts() {
            try {
                let res = await axios.get('http://localhost:3000/find/product')
                console.log(">>> PLACE PRODUCTS:", res.data.length)
                let saleOnly = res.data.filter((p) => p.saleRawCategory !== "Raw")
                setProducts(saleOnly)
            } catch (err) {
                console.log("PRODUCTS FAILED:", err.response?.data || err.message)
            }
        }
    fetchProducts()
  }, [])

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

  function handleCartonChange(id, value) {
    setSelectedItems((prev) => prev.map((it) => {
      if (it._id !== id) return it
      let carton = Number(value) || 0
      let qty = carton * it.cartonSize
      let dozen = qty / 12
      let weight = carton * it.unitWeight
      let total = qty * it.rate
      return { ...it, carton: value, qty, dozen, weight, total }
    }))
  }

  const grandTotal = selectedItems.reduce((s, i) => s + (Number(i.total) || 0), 0)
  const totalWeight = selectedItems.reduce((s, i) => s + (Number(i.weight) || 0), 0)

  async function handlePlaceOrder() {
    if (selectedItems.length === 0) {
      alert("Kam se kam ek product add karo")
      return
    }
    setSaving(true)
    try {
      await axios.post('http://localhost:3000/distributor/place-order', {
        distributorId: user._id || "",
        distributorName: distributorName,
        date: new Date(),
        items: selectedItems,
        grandTotal: grandTotal,
        totalWeight: totalWeight,
        remark: remark,
      })
      setSelectedItems([])
      setRemark("")
      alert("Order place ho gaya")
    } catch (err) {
      console.log("PLACE ORDER FAILED:", err.response?.data || err.message)
      alert("Order place nahi hua")
    }
    setSaving(false)
  }

  return (
    <div className="bg-linear-to-br from-emerald-50 via-white to-emerald-50 p-4 md:p-5">

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm px-5 py-3.5 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200 shrink-0">
            <ShoppingBag size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-gray-800 text-lg font-bold leading-tight">Place Order</h1>
            <p className="text-gray-400 text-xs">{distributorName ? `Ordering as ${distributorName}` : "Select products and place your order"}</p>
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
              Products &mdash; {visibleProducts.length} items
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 content-start overflow-y-auto pr-1 custom-scroll" style={{ height: "58vh" }}>
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
                            <p className="text-[9px] text-white/70">In your order</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="relative flex h-12 w-12 scale-0 rotate-45 items-center justify-center rounded-2xl bg-white/15 ring-4 ring-white/10 backdrop-blur-sm transition-all delay-100 duration-300 group-hover:scale-100 group-hover:rotate-0">
                            <svg className="w-6 h-6 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
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
                  <p className="text-gray-400 text-xs">{search ? `No match for "${search}"` : "No products"}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col">

          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden flex flex-col flex-1">

            <div className="px-5 py-3 border-b border-emerald-100 flex items-center gap-2 bg-emerald-50/50 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shrink-0">
                <ShoppingBag size={15} className="text-white" />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-emerald-100 px-2.5 py-1 text-gray-700 text-sm font-semibold shadow-sm">
                Order Items
                <span className="bg-emerald-100 text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">{selectedItems.length}</span>
              </span>
            </div>

            <div className="overflow-auto custom-scroll flex-1">
              <table className="w-full min-w-160 text-sm border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-emerald-600 text-white">
                    <th className="text-left text-xs font-semibold px-3 py-3 whitespace-nowrap">Item Information</th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Carton</th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Dozen</th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Qnty</th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Rate</th>
                    <th className="text-center text-xs font-semibold px-3 py-3">Total</th>
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
                          <span className="text-gray-400 text-xs">Select Product From the Left Side</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    selectedItems.map((item, idx) => (
                      <tr key={item._id} className={`hover:bg-emerald-50/40 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                        <td className="px-3 py-2 min-w-35 text-gray-700 text-xs font-medium">{item.name}</td>
                        <td className="px-3 py-2 w-16">
                          <input  placeholder="0"
                            value={item.carton}
                            onChange={(e) => handleCartonChange(item._id, e.target.value)}
                            className="w-full bg-emerald-50/50 border border-emerald-200 hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs text-center focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 w-16 text-center text-gray-600 text-xs tabular-nums">{Number(item.dozen || 0).toLocaleString()}</td>
                        <td className="px-3 py-2 w-16 text-center text-gray-700 text-xs font-medium tabular-nums">{Number(item.qty || 0).toLocaleString()}</td>
                        <td className="px-3 py-2 w-16 text-center text-gray-600 text-xs tabular-nums">{Number(item.rate || 0).toLocaleString()}</td>
                        <td className="px-3 py-2 w-20 text-center text-emerald-700 text-xs font-bold tabular-nums">{Number(item.total || 0).toLocaleString()}</td>
                        <td className="px-3 py-2 w-16">
                          <div className="flex items-center justify-center">
                            <button onClick={() => handleRemoveItem(item._id)} className="w-6 h-6 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded flex items-center justify-center transition-colors cursor-pointer">
                              <Trash2 size={13} />
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
                  <label className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide block mb-1">Remark</label>
                  <input type="text" placeholder="Optional note..."
                    value={remark} onChange={(e) => setRemark(e.target.value)}
                    className="w-40 bg-white border border-emerald-100 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 rounded-lg px-3 py-1.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={saving}
                className="w-full sm:w-auto px-8 py-2.5 cursor-pointer bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed">
                {saving ? 'Placing...' : 'Place Order →'}
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
      `}</style>
    </div>
  )
}

export default PlaceOrder