import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import DatePicker from './DatePicker.jsx'
import { ClipboardList, Hash, Calendar, StickyNote, Plus, Trash2, ArrowDownLeft, ArrowUpRight, Save, ChevronRight } from 'lucide-react'


const CashAdjustment = () => {
  const [date, setDate] = useState('')
  const [adjustmentType, setAdjustmentType] = useState('debit')
  const [remark, setRemark] = useState('')
  const [lines, setLines] = useState([{ code: '', amount: '' }])
  const [voucherNo, setVoucherNo] = useState('')
  const [saving, setSaving] = useState(false)

  function updateLine(index, field, value) {
    setLines((prev) => prev.map((line, i) => i === index ? { ...line, [field]: value } : line))
  }


  function addLine() {
    setLines((prev) => [...prev, { code: '', amount: '' }])
  }

  function removeLine(index) {
    setLines((prev) => prev.length === 1 ? prev : prev.filter((_, i) => i !== index))
  }

  let totalAmount = lines.reduce((sum, line) => sum + (Number(line.amount) || 0), 0)

  async function handleSave() {
    let validLines = lines.filter((line) => Number(line.amount) > 0)
    if (validLines.length === 0) {
      alert("Kam se kam ek line me amount daalo")
      return
    }
    if (!date) {
      alert("Date select karo")
      return
    }
    setSaving(true)
    try {
      let res = await axios.post('http://localhost:3000/add/cash-adjustment', {
        date: date,
        adjustmentType: adjustmentType,
        remark: remark,
        lines: validLines,
      })
      setVoucherNo(res.data.voucherNo)
      setLines([{ code: '', amount: '' }])
      setRemark('')
      alert("Cash Adjustment save ho gaya: " + res.data.voucherNo)
    } catch (err) {
      console.log("SAVE FAILED:", err.response?.data || err.message)
      alert("Save nahi hua")
    }
    setSaving(false)
  }





  return (
    <div className="min-h-screen bg-linear-to-br from-white via-emerald-50/40 to-white p-4 md:p-6">
      <div className="mx-auto w-full max-w-7xl">


        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-800 shadow-lg shadow-emerald-300/40 ring-4 ring-white">
              <ClipboardList className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-slate-800">Cash Adjustment</h1>
              <p className="text-[11px] font-medium tracking-wider text-slate-400">Manually adjust the cash book balance</p>
            </div>
          </div>
        </div>


        <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-xl shadow-slate-200/50">

          <div className="h-1 w-full bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-700" />

          <div className="p-5 md:p-7">


            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">


              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">Voucher No</label>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3.5">
                  <Hash className="h-4 w-4 shrink-0 text-emerald-500" />
                  <input
                    readOnly
                    placeholder="Auto-generated"
                    className="w-full cursor-not-allowed bg-transparent text-sm font-semibold text-slate-600 placeholder-slate-400 focus:outline-none"
                  />
                  <span className="shrink-0 rounded-md bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-700">Auto</span>
                </div>
              </div>


              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">Date</label>
                <DatePicker value={date} onChange={setDate} />
              </div>
            </div>


            <div className="mt-5">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">Adjustment Type</label>
              <div className="grid grid-cols-2 gap-3 sm:max-w-md">

                <label className="relative cursor-pointer">
                  <input type="radio" name="adjustmentType" checked={adjustmentType === 'debit'} onChange={() => setAdjustmentType('debit')} className="peer sr-only" />
                  <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 transition-all hover:border-emerald-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-50/70 peer-checked:shadow-sm peer-checked:shadow-emerald-100">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 peer-checked:bg-emerald-500 peer-checked:text-white">
                      <ArrowDownLeft className="h-4.5 w-4.5" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-sm font-bold text-slate-700">Debit</span>
                      <span className="text-[10px] font-medium  tracking-wide text-slate-400">Cash in</span>
                    </span>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input type="radio" name="adjustmentType" checked={adjustmentType === 'credit'} onChange={() => setAdjustmentType('credit')} className="peer sr-only" />
                  <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 transition-all hover:border-rose-200 peer-checked:border-rose-400 peer-checked:bg-rose-50/70 peer-checked:shadow-sm peer-checked:shadow-rose-100">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-500 peer-checked:bg-rose-500 peer-checked:text-white">
                      <ArrowUpRight className="h-4.5 w-4.5" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-sm font-bold text-slate-700">Credit</span>
                      <span className="text-[10px] font-medium  tracking-wide text-slate-400">Cash out</span>
                    </span>
                  </div>
                </label>
              </div>
            </div>


            <div className="mt-5">
              <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                <StickyNote className="h-3.5 w-3.5 text-emerald-500" />
                Remark
              </label>
              <textarea
                rows={2}
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Details of this adjustment..."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 focus:outline-none"
              />
            </div>


            <div className="mt-6">
              <div className="mb-2.5 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
                  <span className="h-4 w-1 rounded-full bg-emerald-500" />
                  Entries
                </h3>

              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">

                <div className="grid grid-cols-[1fr_1fr_auto] gap-3 bg-slate-50 px-4 py-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Code</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Amount</span>
                  <span className="w-9" />
                </div>


                {lines.map((line, index) => (
                  <div key={index} className="grid grid-cols-[1fr_1fr_auto] items-center gap-3 border-t border-slate-100 px-4 py-3">
                    <input
                      value={line.code}
                      onChange={(e) => updateLine(index, 'code', e.target.value)}
                      placeholder="Account code"
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 placeholder-slate-400 transition-all focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 focus:outline-none"
                    />
                    <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 transition-all focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-50">
                      <span className="text-xs font-bold text-slate-400">Rs.</span>
                      <input
                        type="number"
                        value={line.amount}
                        onChange={(e) => updateLine(index, 'amount', e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-transparent text-sm font-semibold text-slate-800 placeholder-slate-300 focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(index)}
                      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}


                <div className="flex items-center justify-between border-t border-slate-200 bg-emerald-50/50 px-4 py-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">Total</span>
                  <span className="text-sm font-bold tabular-nums text-emerald-800">
                    <span className="mr-0.5 text-[10px] font-normal text-emerald-500">Rs.</span>
                    {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>


            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-500 transition-all hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="group flex cursor-pointer items-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-emerald-700 to-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Save className="h-4 w-4" />
                {saving ? 'Saving...' : 'Save Adjustment'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CashAdjustment
