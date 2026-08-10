import React from 'react'
import { X, Landmark, CreditCard, User, MapPin, Wallet, Copy } from 'lucide-react'

const BankViewPopup = ({ setShowViewPopup, viewData }) => {

    const balance = Number(viewData.balance) || 0

    const nameTones = [
        "from-emerald-400 to-emerald-600",
        "from-sky-400 to-sky-600",
        "from-amber-400 to-amber-600",
        "from-violet-400 to-violet-600",
        "from-rose-400 to-rose-600",
    ]
    const tone = nameTones[(viewData.bankName || "").length % nameTones.length]

    const detailRow = (Icon, label, value, mono = false) => (
        <div className="flex items-center gap-3 py-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">{label}</p>
                <p className={`text-gray-700 text-sm font-medium truncate ${mono ? "font-mono" : ""}`}>{value || "—"}</p>
            </div>
        </div>
    )

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">

                {/* header */}
                <div className="relative px-5 py-5 bg-linear-to-br from-emerald-600 to-emerald-700 shrink-0">
                    <button
                        onClick={() => setShowViewPopup(false)}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/15 hover:bg-white/25 transition-colors cursor-pointer"
                    >
                        <X className="w-4.5 h-4.5 text-white" />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${tone} flex items-center justify-center text-white text-xl font-bold shadow-lg ring-2 ring-white/30`}>
                            {(viewData.bankName || "?").charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-white text-lg font-bold truncate">{viewData.bankName || "—"}</h3>
                            <p className="text-white/80 text-xs mt-0.5 truncate">{viewData.branch || "—"}</p>
                        </div>
                    </div>
                </div>

                {/* balance highlight */}
                <div className="px-5 pt-5">
                    <div className="flex items-center gap-3 bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4">
                        <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                            <Wallet className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-emerald-700 text-[10px] font-bold uppercase tracking-wide">Current Balance</p>
                            <p className="text-emerald-900 text-xl font-bold tabular-nums">Rs. {balance.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* details */}
                <div className="overflow-y-auto flex-1 px-5 py-3">
                    <div className="divide-y divide-gray-50">
                        {detailRow(User, "Account Name", viewData.accountName)}
                        {detailRow(CreditCard, "Account Number", viewData.accountNumber, true)}
                        {detailRow(MapPin, "Branch", viewData.branch)}
                        {detailRow(Landmark, "Bank Name", viewData.bankName)}
                    </div>
                </div>

                {/* footer */}
                <div className="flex items-center justify-end px-5 py-4 border-t border-gray-100 bg-gray-50/40 shrink-0">
                    <button
                        onClick={() => setShowViewPopup(false)}
                        className="px-6 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer"
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    )
}

export default BankViewPopup