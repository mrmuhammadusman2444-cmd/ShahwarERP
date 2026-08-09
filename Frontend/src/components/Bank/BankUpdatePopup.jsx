import React, { useState } from 'react'
import axios from 'axios'
import { X, Landmark, Save, Loader2, Check } from 'lucide-react'

const BankUpdatePopup = ({ setShowUpdatePopup, updateData, handleFetchBank }) => {

    const [bank, setBank] = useState({
        bankName: updateData.bankName || "",
        accountName: updateData.accountName || "",
        accountNumber: updateData.accountNumber || "",
        branch: updateData.branch || "",
        balance: updateData.balance || "",
    })

    const [status, setStatus] = useState("idle")

    async function handleUpdate() {
        setStatus("saving")
        try {
            await axios.put(`http://localhost:3000/update/bank/${updateData._id}`, bank)
            setStatus("saved")
            if (handleFetchBank) handleFetchBank()
            setTimeout(() => setShowUpdatePopup(false), 800)
        } catch (err) {
            console.log("BANK UPDATE FAILED:", err.response?.data || err.message)
            setStatus("idle")
        }
    }

    const field = (label, key, type = "text", placeholder = "") => (
        <div>
            <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">{label}</label>
            <input
                type={type}
                value={bank[key]}
                onChange={(e) => setBank({ ...bank, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
            />
        </div>
    )

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">

                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-linear-to-r from-emerald-50 to-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                            <Landmark className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-gray-800 text-base font-bold">Update Bank</h3>
                            <p className="text-gray-400 text-xs">Edit the bank details below</p>
                        </div>
                    </div>
                    <button onClick={() => setShowUpdatePopup(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <X className="w-4.5 h-4.5 text-gray-500" />
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 px-5 py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                            {field("Bank Name", "bankName", "text", "Enter bank name...")}
                        </div>
                        {field("A/C Name", "accountName", "text", "Account holder name")}
                        {field("A/C Number", "accountNumber", "text", "Account number")}
                        {field("Branch", "branch", "text", "Branch name")}
                        <div>
                            <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">Balance</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">Rs.</span>
                                <input
                                    type="number"
                                    value={bank.balance}
                                    onChange={(e) => setBank({ ...bank, balance: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl pl-9 pr-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50/40 shrink-0">
                    <button onClick={() => setShowUpdatePopup(false)} className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-semibold rounded-xl transition-all cursor-pointer">
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={status !== "idle"}
                        className={`flex items-center gap-2 px-6 py-2.5 text-white text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer disabled:cursor-not-allowed ${status === "saved" ? "bg-emerald-500 shadow-emerald-200" : "bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-emerald-200"}`}
                    >
                        {status === "idle" && (<><Save size={15} /> Update Bank</>)}
                        {status === "saving" && (<><Loader2 size={15} className="animate-spin" /> Saving...</>)}
                        {status === "saved" && (<><Check size={15} strokeWidth={3} /> Updated!</>)}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default BankUpdatePopup