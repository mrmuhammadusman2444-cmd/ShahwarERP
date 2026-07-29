import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import SelectCustomer from '../Sales/SelectCustomers.jsx'
import SelectSupplier from '../Purchase/SelectSupplier.jsx';
import { Landmark, Save, Calendar, Banknote, Building2, Globe, Check, ArrowLeftRight, FileText, ChevronDown, Trash2, } from 'lucide-react';


const SupplierPayment = () => {
    const [paymentType, setPaymentType] = useState("Cash Payment")
    const [ptOpen, setPtOpen] = useState(false)
    const [amount, setAmount] = useState("")
    const [payment, setPayment] = useState({
        date: "",
        paymentType: "Cash Payment",
        fromCustomer: "",
        voucherNo: "",
        remark: "",
        amountInWords: "",
        allocations: [
            { supplierName: "", code: "", amount: "" }
        ],
        totalAmount: 0,
    })
    async function handleSupplierPayment() {
        let res = await axios.post('http://localhost:3000/supplier/payment', payment)
        console.log(res.data)

    }

    function numberToWords(num) {
        num = Number(num) || 0
        if (num === 0) return ''

        const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
            'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

        function twoDigit(n) {
            if (n < 20) return ones[n]
            return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '')
        }

        function threeDigit(n) {
            let str = ''
            if (n > 99) {
                str += ones[Math.floor(n / 100)] + ' Hundred'
                n = n % 100
                if (n) str += ' '
            }
            if (n) str += twoDigit(n)
            return str
        }

        let rupees = Math.floor(num)
        let words = ''

        const crore = Math.floor(rupees / 10000000)
        rupees = rupees % 10000000
        const lakh = Math.floor(rupees / 100000)
        rupees = rupees % 100000
        const thousand = Math.floor(rupees / 1000)
        rupees = rupees % 1000

        if (crore) words += threeDigit(crore) + ' Crore '
        if (lakh) words += threeDigit(lakh) + ' Lakh '
        if (thousand) words += threeDigit(thousand) + ' Thousand '
        if (rupees) words += threeDigit(rupees)

        return words.trim()
    }
    return (
        <div className="bg-white min-h-screen">
            <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-zinc-200">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white shrink-0 shadow-sm shadow-emerald-700/20">
                        <Landmark size={15} />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-zinc-900 leading-tight tracking-tight">Supplier Payment</h2>
                        <p className="text-xs text-zinc-500 mt-0.5">Record a new payment made to a supplier</p>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5 max-w-2xl">
                    <div>
                        <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">Date</label>
                        <div className="flex items-center gap-2 bg-emerald-50/60 border border-emerald-100 rounded-lg px-2.5 py-2 focus-within:ring-2 focus-within:ring-emerald-500/25 focus-within:border-emerald-500 transition-shadow">
                            <Calendar size={14} className="text-emerald-600 shrink-0" />
                            <input
                                onChange={(e) => { setPayment({ ...payment, date: e.target.value }) }}
                                type="date"
                                defaultValue="2026-07-28"
                                className="w-full bg-transparent text-sm text-zinc-700 outline-none"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
                            Payment Type <span className="text-rose-600">*</span>
                        </label>

                        <button
                            type="button"
                            onClick={() => setPtOpen((o) => !o)}
                            className="w-full flex items-center gap-2 bg-emerald-50/60 border border-emerald-100 hover:border-emerald-300 rounded-lg px-2.5 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 transition-all"
                        >
                            <ArrowLeftRight size={14} className="text-emerald-600 shrink-0" />
                            <span className="flex-1 text-left text-sm text-zinc-700">{paymentType}</span>
                            <ChevronDown size={14} className={`text-zinc-400 shrink-0 transition-transform duration-200 ${ptOpen ? "rotate-180" : ""}`} />
                        </button>

                        {ptOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setPtOpen(false)} />
                                <div className="absolute top-full mt-1.5 left-0 right-0 z-50 bg-white border border-emerald-100 rounded-xl shadow-lg shadow-emerald-100/50 p-1.5">
                                    {[
                                        { label: "Cash Payment", icon: Banknote },
                                        { label: "Bank Transfer", icon: Building2 },
                                        { label: "Cheque", icon: FileText },
                                        { label: "Online Transfer", icon: Globe },
                                    ].map((opt) => {
                                        const Icon = opt.icon
                                        const active = paymentType === opt.label
                                        return (
                                            <button
                                                key={opt.label}
                                                type="button"
                                                onClick={() => { setPaymentType(opt.label); setPtOpen(false) }}
                                                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm cursor-pointer transition-colors
                                ${active ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-zinc-600 hover:bg-emerald-50/60 hover:text-emerald-600"}`}
                                            >
                                                <span className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 ${active ? "bg-emerald-100 text-emerald-600" : "bg-zinc-100 text-zinc-500"}`}>
                                                    <Icon size={14} />
                                                </span>
                                                <span className="flex-1 text-left">{opt.label}</span>
                                                {active && <Check size={14} className="text-emerald-600 shrink-0" />}
                                            </button>
                                        )
                                    })}
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
                            From Customer <span className="text-rose-600">*</span>
                        </label>
                        <SelectCustomer value={payment.fromCustomer}
                            onChange={(name) => setPayment({ ...payment, fromCustomer: name })} />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
                            Voucher No <span className="text-rose-600">*</span>
                        </label>
                        <div className="flex items-center gap-2 bg-emerald-50/60 border border-emerald-100 rounded-lg px-2.5 py-2 focus-within:ring-2 focus-within:ring-emerald-500/25 focus-within:border-emerald-500 transition-shadow">
                            <ArrowLeftRight size={14} className="text-emerald-600 shrink-0" />
                            <input onChange={(e) => { setPayment({ ...payment, voucherNo: e.target.value }) }}
                                placeholder="Voucher No"
                                className="flex-1 bg-transparent text-sm text-zinc-700 outline-none"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">Remark</label>
                        <div className="flex items-start gap-2 bg-emerald-50/60 border border-emerald-100 rounded-lg px-2.5 py-2 focus-within:ring-2 focus-within:ring-emerald-500/25 focus-within:border-emerald-500 transition-shadow">
                            <FileText size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                            <textarea onChange={(e) => { setPayment({ ...payment, remark: e.target.value }) }}
                                placeholder="Add details about this payment…"
                                rows={2}
                                className="w-full bg-transparent text-sm text-zinc-700 outline-none resize-none placeholder:text-zinc-400"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-4 max-w-3xl">
                    <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">Amount in Words</label>
                    <div className="flex items-center gap-2 rounded-lg bg-emerald-50/50 border border-emerald-100 px-3.5 py-2.5">
                        <span className="text-sm font-semibold text-emerald-700 shrink-0">Rupees</span>
                        <input onChange={(e) => { setPayment({ ...payment, amountInWords: e.target.value }) }}
                            value={amount ? numberToWords(amount) : ""}

                            placeholder="e.g. Fifty Thousand"
                            className="flex-1 bg-transparent border-b-2 border-dotted border-emerald-300 px-1 py-0.5 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 placeholder:font-normal"
                        />
                        <span className="text-sm font-semibold text-emerald-700 shrink-0">Only</span>
                    </div>
                </div>
                <p className="mt-5 mb-2 text-[11px] font-bold text-zinc-500 uppercase tracking-wide">Supplier Allocation</p>

                <div className="rounded-lg border border-zinc-200 overflow-hidden max-w-3xl">
                    <div >
                        <table className="w-full text-sm overflow-visible">
                            <thead>
                                <tr className="bg-emerald-50/60 border-b border-zinc-200">
                                    <th className="text-left font-semibold text-emerald-700 px-3 py-2 w-[38%]">Supplier</th>
                                    <th className="text-left font-semibold text-emerald-700 px-3 py-2 w-[22%]">Code</th>
                                    <th className="text-left font-semibold text-emerald-700 px-3 py-2">Amount</th>
                                    <th className="w-9 px-2 py-2" />
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-3 py-2">
                                        <SelectSupplier
                                            value={payment.allocations[0]?.supplierName || ""}
                                            onChange={(name) => setPayment({
                                                ...payment,
                                                allocations: [{ ...payment.allocations[0], supplierName: name }]
                                            })}
                                        />
                                    </td>
                                    <td className="px-3 py-2">
                                        <input onChange={(e) => { setPayment({ ...payment, allocations: e.target.value }) }}
                                            readOnly
                                            placeholder="—"
                                            className="w-full bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1.5 text-sm text-zinc-500 font-mono outline-none cursor-not-allowed"
                                        />
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex items-center bg-emerald-50 border border-emerald-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500/25 focus-within:border-emerald-200 transition-shadow min-w-0">
                                            <span className="px-2 py-1.5 text-xs text-zinc-400 border-r border-emerald-200 bg-emerald-50 shrink-0">Rs</span>
                                            <input
                                                value={amount}
                                                onChange={(e) => {
                                                    let val = e.target.value.replace(/[^0-9.]/g, '')
                                                    setAmount(val)
                                                    setPayment({
                                                        ...payment,
                                                        totalAmount: Number(val) || 0,
                                                        allocations: [{ ...payment.allocations[0], amount: val }]
                                                    })
                                                }}
                                                placeholder="0.00"
                                                className="w-full min-w-0 px-2.5 py-1.5 text-sm text-zinc-800 text-right tabular-nums outline-none"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-1.5 py-2 text-center">
                                        <button
                                            type="button"
                                            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50"
                                            aria-label="Remove row"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="bg-zinc-50 border-t border-zinc-200">
                                    <td className="px-3 py-2.5 text-right font-semibold text-zinc-600" colSpan={3}>Total</td>
                                    <td className="px-3 py-2.5 text-right">
                                        <div className="text-sm font-bold text-emerald-700 tabular-nums whitespace-nowrap">
                                            Rs {Number(payment.totalAmount || 0).toLocaleString()}
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>



                <div className="flex items-center justify-end mt-5 pt-3  max-w-3xl">
                    <button onClick={handleSupplierPayment}
                        type="button"
                        className="inline-flex cursor-pointer items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white shadow-sm shadow-emerald-700/20 transition-colors"
                    >
                        <Save size={15} /> Save Payment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SupplierPayment
