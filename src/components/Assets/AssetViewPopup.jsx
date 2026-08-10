import React from 'react'
import { X, Box, Calendar, MapPin, Tag, TrendingDown, DollarSign, Clock, FileText } from 'lucide-react'

const AssetViewPopup = ({ setShowViewPopup, viewData }) => {

    const cost = Number(viewData.cost) || 0
    const residual = Number(viewData.residualValue) || 0
    const life = Number(viewData.usefulLife) || 0

    // straight line depreciation (per year)
    const yearlyDepreciation = life > 0 ? (cost - residual) / life : 0

    const typeTone = {
        Furniture: "bg-amber-50 text-amber-700 ring-amber-200",
        Vehicle: "bg-sky-50 text-sky-700 ring-sky-200",
        Machinery: "bg-violet-50 text-violet-700 ring-violet-200",
        Electronics: "bg-emerald-50 text-emerald-700 ring-emerald-200",
        Building: "bg-rose-50 text-rose-700 ring-rose-200",
    }

    const nameTones = [
        "from-emerald-400 to-emerald-600",
        "from-sky-400 to-sky-600",
        "from-amber-400 to-amber-600",
        "from-violet-400 to-violet-600",
        "from-rose-400 to-rose-600",
    ]
    const tone = nameTones[(viewData.assetName || "").length % nameTones.length]

    const detailRow = (Icon, label, value) => (
        <div className="flex items-center gap-3 py-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">{label}</p>
                <p className="text-gray-700 text-sm font-medium truncate">{value || "—"}</p>
            </div>
        </div>
    )

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

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
                            {(viewData.assetName || "?").charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-white text-lg font-bold truncate">{viewData.assetName || "—"}</h3>
                            {viewData.assetType && (
                                <span className="inline-flex items-center gap-1 mt-1 text-white/90 text-xs font-semibold bg-white/15 px-2.5 py-1 rounded-full">
                                    <Tag className="w-3 h-3" />
                                    {viewData.assetType}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* body */}
                <div className="overflow-y-auto flex-1 px-5 py-4">

                    {/* value cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">Cost</p>
                            <p className="text-gray-800 text-sm font-bold tabular-nums mt-0.5">Rs. {cost.toLocaleString()}</p>
                        </div>
                        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">Residual</p>
                            <p className="text-gray-800 text-sm font-bold tabular-nums mt-0.5">Rs. {residual.toLocaleString()}</p>
                        </div>
                        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">Useful Life</p>
                            <p className="text-gray-800 text-sm font-bold tabular-nums mt-0.5">{life} {life === 1 ? "Year" : "Years"}</p>
                        </div>
                    </div>

                    {/* depreciation highlight */}
                    <div className="flex items-center gap-3 bg-linear-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-3.5 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                            <TrendingDown className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-amber-700 text-[10px] font-bold uppercase tracking-wide">Yearly Depreciation (Straight Line)</p>
                            <p className="text-amber-900 text-base font-bold tabular-nums">Rs. {Math.round(yearlyDepreciation).toLocaleString()} <span className="text-amber-600 text-xs font-normal">/ year</span></p>
                        </div>
                    </div>

                    {/* details */}
                    <div className="divide-y divide-gray-50">
                        {detailRow(MapPin, "Location", viewData.location)}
                        {detailRow(Calendar, "Purchase Date", viewData.purchaseDate ? new Date(viewData.purchaseDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) : null)}
                        {detailRow(Clock, "Depreciation Method", viewData.depreciationMethod)}
                        {detailRow(FileText, "Description", viewData.description)}
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

export default AssetViewPopup