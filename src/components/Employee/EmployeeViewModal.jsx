import React from 'react'
import { X, User, Phone, Mail, MapPin, Briefcase, Droplet, DollarSign, Clock, Hash } from 'lucide-react'

const EmployeeViewPopup = ({ setShowViewPopup, viewData }) => {

    const fullName = `${viewData.firstName || ""} ${viewData.lastName || ""}`.trim()

    const nameTones = [
        "from-emerald-400 to-emerald-600",
        "from-sky-400 to-sky-600",
        "from-amber-400 to-amber-600",
        "from-violet-400 to-violet-600",
        "from-rose-400 to-rose-600",
    ]
    const tone = nameTones[fullName.length % nameTones.length]
    const initials = `${(viewData.firstName || "").charAt(0)}${(viewData.lastName || "").charAt(0)}`.toUpperCase()

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
                        {viewData.picture ? (
                            <img src={`http://localhost:3000${viewData.picture}`} alt={fullName} className="w-16 h-16 rounded-2xl object-cover shadow-lg ring-2 ring-white/30" />) : (
                            <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${tone} flex items-center justify-center text-white text-xl font-bold shadow-lg ring-2 ring-white/30`}>
                                {initials || "?"}
                            </div>
                        )}
                        <div className="min-w-0">
                            <h3 className="text-white text-lg font-bold truncate">{fullName || "—"}</h3>
                            {viewData.designation && (
                                <span className="inline-flex items-center gap-1 mt-1 text-white/90 text-xs font-semibold bg-white/15 px-2.5 py-1 rounded-full">
                                    <Briefcase className="w-3 h-3" />
                                    {viewData.designation}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* body */}
                <div className="overflow-y-auto flex-1 px-5 py-4">

                    {/* highlight cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">Rate Type</p>
                            <p className="text-gray-800 text-sm font-bold mt-0.5">{viewData.rateType || "—"}</p>
                        </div>
                        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">Salary / Rate</p>
                            <p className="text-gray-800 text-sm font-bold tabular-nums mt-0.5">Rs. {Number(viewData.hourRateSalary || 0).toLocaleString()}</p>
                        </div>
                        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">Blood Group</p>
                            <p className="text-gray-800 text-sm font-bold mt-0.5">{viewData.bloodGroup || "—"}</p>
                        </div>
                    </div>

                    {/* details */}
                    <div className="divide-y divide-gray-50">
                        {detailRow(Phone, "Phone", viewData.phone)}
                        {detailRow(Mail, "Email", viewData.email)}
                        {detailRow(MapPin, "Address", [viewData.addressLine1, viewData.addressLine2].filter(Boolean).join(", "))}
                        {detailRow(MapPin, "City", viewData.city)}
                        {detailRow(Hash, "Zip Code", viewData.zipCode)}
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

export default EmployeeViewPopup