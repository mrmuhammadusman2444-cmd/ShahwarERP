import { useState, useEffect } from 'react'
import axios from 'axios'
import SelectSupplier from '../Purchase/SelectSupplier.jsx'
import SelectCustomers from '../Sales/SelectCustomers.jsx'
import BankDropDown from '../Bank/BankDropDown.jsx'
import { ClipboardList, Hash, Calendar, Wallet, Landmark, User, Users, StickyNote, Save, ChevronDown } from 'lucide-react'

const AssetsPayment = () => {
  const [paymentType, setPaymentType] = useState('cash')
  const [assets, setAssets] = useState([])
  const [assetPayment, setAssetPayment] = useState({
    voucherNo: '',
    date: '',
    assetName: '',
    paymentType: '',
    bankName: '',
    customerName: '',
    supplierName: '',
    amount: '',
    remark: ''
  })

  async function handleAssetPayment() {
    try {
      let payload = { ...assetPayment, paymentType: paymentType }
      let res = await axios.post('http://localhost:3000/assetPayment', payload)
      console.log(res.data)
      window.dispatchEvent(new Event('approval-changed'))
      let vRes = await axios.get('http://localhost:3000/assetPayment/next-voucher')
      setAssetPayment({ voucherNo: vRes.data.voucherNo, date: '', assetName: '', paymentType: '', bankName: '', customerName: '', supplierName: '', amount: '', remark: '' })
      setPaymentType('cash')
      
    } catch (err) {
      console.log("SAVE FAILED:", err.response?.data || err.message)
     
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        let res = await axios.get('http://localhost:3000/find/asset')
        setAssets(res.data)
        let vRes = await axios.get('http://localhost:3000/assetPayment/next-voucher')
        setAssetPayment((prev) => ({ ...prev, voucherNo: vRes.data.voucherNo }))
      } catch (err) {
        console.log("LOAD FAILED:", err.response?.data || err.message)
      }
    }
    loadData()
  }, [])


  return (
    <div className="min-h-screen bg-linear-to-br from-white via-emerald-50/40 to-white p-4 md:p-6">
      <div className="mx-auto w-full max-w-7xl">

        <div className="mb-5 flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-800 shadow-lg shadow-emerald-300/40 ring-4 ring-white">
            <ClipboardList className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight text-slate-800">Assets Payments</h1>
            <p className="text-[11px] font-medium  tracking-wider text-slate-400">Record a payment against an asset</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-xl shadow-slate-200/50">
          <div className="h-1 w-full bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-700" />

          <div className="p-5 md:p-7">
            <div className="grid grid-cols-1 gap-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">Voucher No</label>
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3.5">
                    <Hash className="h-4 w-4 shrink-0 text-emerald-500" />
                    <input value={assetPayment.voucherNo} readOnly placeholder="Auto-generated" className="w-full bg-transparent text-sm font-semibold text-slate-600 placeholder-slate-400 focus:outline-none cursor-not-allowed" />
                    <span className="shrink-0 rounded-md bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-700">Auto</span>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">Date</label>
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-all focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-50">
                    <Calendar className="h-4 w-4 shrink-0 text-emerald-500" />
                    <input onChange={(e) => setAssetPayment({ ...assetPayment, date: e.target.value })} type="date" className="w-full bg-transparent text-sm font-medium text-slate-700 focus:outline-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">Select Asset <span className="text-rose-400">*</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500"><ClipboardList className="h-4 w-4" /></span>
                  <select onChange={(e) => setAssetPayment({ ...assetPayment, assetName: e.target.value })} className="w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-11 pr-10 py-3.5 text-sm font-medium text-slate-700 transition-all focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 focus:outline-none">
                    <option value="">Select asset</option>
                    {assets.map((asset) => (
                      <option key={asset._id} value={asset.assetName}>
                        {asset.assetName}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">Payment Type <span className="text-rose-400">*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'cash', label: 'Cash', icon: Wallet },
                    { id: 'bank', label: 'Bank', icon: Landmark },
                    { id: 'supplier', label: 'Supplier', icon: User },
                    { id: 'customer', label: 'Customer', icon: Users },
                  ].map((pt) => {
                    const Icon = pt.icon
                    const active = paymentType === pt.id
                    return (
                      <button key={pt.id} type="button" onClick={() => setPaymentType(pt.id)}
                        className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 transition-all cursor-pointer ${active ? 'border-emerald-500 bg-emerald-50/70 shadow-sm shadow-emerald-100' : 'border-slate-200 bg-white hover:border-emerald-200'}`}>
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${active ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-600'}`}>
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <span className="text-sm font-bold text-slate-700">{pt.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {paymentType === 'bank' && (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 max-w-md">
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Bank</label>
                    {assetPayment.bankName && (
                      <button type="button" onClick={() => setAssetPayment({ ...assetPayment, bankName: '' })} className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold text-rose-500 hover:bg-rose-50 cursor-pointer">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        Clear
                      </button>
                    )}
                  </div>
                  <BankDropDown value={assetPayment.bankName} onChange={(value) => setAssetPayment({ ...assetPayment, bankName: value })} className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 transition-all focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 focus:outline-none" />                </div>
              )}

              {paymentType === 'supplier' && (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 max-w-md">
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Supplier</label>
                    {assetPayment.supplierName && (
                      <button type="button" onClick={() => setAssetPayment({ ...assetPayment, supplierName: '' })} className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold text-rose-500 hover:bg-rose-50 cursor-pointer">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        Clear
                      </button>
                    )}
                  </div>
                  <SelectSupplier value={assetPayment.supplierName} onChange={(value) => setAssetPayment({ ...assetPayment, supplierName: value })} className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 transition-all focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                </div>
              )}

              {paymentType === 'customer' && (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 max-w-md">
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Customer</label>
                    {assetPayment.customerName && (
                      <button type="button" onClick={() => setAssetPayment({ ...assetPayment, customerName: '' })} className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold text-rose-500 hover:bg-rose-50 cursor-pointer">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        Clear
                      </button>
                    )}
                  </div>
                  <SelectCustomers value={assetPayment.customerName} onChange={(value) => setAssetPayment({ ...assetPayment, customerName: value })} className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 transition-all focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">Amount <span className="text-rose-400">*</span></label>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 transition-all focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-50">
                  <span className="text-sm font-bold text-slate-400">Rs.</span>
                  <input onChange={(e) => setAssetPayment({ ...assetPayment, amount: e.target.value })} placeholder="0.00" className="w-full bg-transparent text-sm font-semibold text-slate-800 placeholder-slate-300 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  <StickyNote className="h-3.5 w-3.5 text-emerald-500" />
                  Remark
                </label>
                <textarea onChange={(e) => setAssetPayment({ ...assetPayment, remark: e.target.value })} rows={2} placeholder="Add a note..." className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                <button type="button" className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-500 transition-all hover:bg-slate-50">
                  Cancel
                </button>
                <button onClick={handleAssetPayment} type="button" className="flex cursor-pointer items-center gap-2 rounded-2xl bg-linear-to-r from-emerald-600 to-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-0.5 hover:shadow-xl">
                  <Save className="h-4 w-4" />
                  Save Payment
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetsPayment