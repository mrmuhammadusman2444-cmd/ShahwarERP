import React, { useState } from 'react'
import axios from 'axios'
import { X, Box, Save, Loader2, Check } from 'lucide-react'

const AssetUpdatePopup = ({ setShowUpdatePopup, updateData, handleFetchAsset }) => {

    const [asset, setAsset] = useState({
        assetName: updateData.assetName || "",
        assetType: updateData.assetType || "",
        location: updateData.location || "",
        purchaseDate: updateData.purchaseDate ? updateData.purchaseDate.slice(0, 10) : "",
        cost: updateData.cost || "",
        residualValue: updateData.residualValue || "",
        usefulLife: updateData.usefulLife || "",
        depreciationMethod: updateData.depreciationMethod || "",
        description: updateData.description || "",
    })

    const [status, setStatus] = useState("idle")   // idle | saving | saved

    async function handleUpdate() {
        setStatus("saving")
        try {
            await axios.put(`http://localhost:3000/update/asset/${updateData._id}`, asset)
            setStatus("saved")
            if (handleFetchAsset) handleFetchAsset()   // table refresh
            setTimeout(() => {
                setShowUpdatePopup(false)
            }, 800)
        } catch (err) {
            console.log("UPDATE FAILED:", err.response?.data || err.message)
            setStatus("idle")
        }
    }

    const field = (label, key, type = "text", placeholder = "") => (
        <div>
            <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">{label}</label>
            <input
                type={type}
                value={asset[key]}
                onChange={(e) => setAsset({ ...asset, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
            />
        </div>
    )

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

                {/* header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-linear-to-r from-emerald-50 to-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                            <Box className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-gray-800 text-base font-bold">Update Asset</h3>
                            <p className="text-gray-400 text-xs">Edit the asset details below</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowUpdatePopup(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <X className="w-4.5 h-4.5 text-gray-500" />
                    </button>
                </div>

                {/* body — form */}
                <div className="overflow-y-auto flex-1 px-5 py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div className="sm:col-span-2">
                            {field("Assets Name", "assetName", "text", "Enter asset name...")}
                        </div>

                        {field("Assets Type", "assetType", "text", "e.g. Furniture, Vehicle")}
                        {field("Location", "location", "text", "e.g. Head Office")}
                        {field("Purchase Date", "purchaseDate", "date")}

                        <div>
                            <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">Cost</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">Rs.</span>
                                <input
                                    type="number"
                                    value={asset.cost}
                                    onChange={(e) => setAsset({ ...asset, cost: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl pl-9 pr-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">Residual Value</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">Rs.</span>
                                <input
                                    type="number"
                                    value={asset.residualValue}
                                    onChange={(e) => setAsset({ ...asset, residualValue: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl pl-9 pr-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {field("Useful Life (Years)", "usefulLife", "number", "e.g. 5")}
                        {field("Depreciation Method", "depreciationMethod", "text", "e.g. Straight Line")}

                        <div className="sm:col-span-2">
                            <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">Description</label>
                            <textarea
                                value={asset.description}
                                onChange={(e) => setAsset({ ...asset, description: e.target.value })}
                                placeholder="Description..."
                                rows={3}
                                className="w-full resize-none bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
                            />
                        </div>

                    </div>
                </div>

                {/* footer — buttons */}
                <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50/40 shrink-0">
                    <button
                        onClick={() => setShowUpdatePopup(false)}
                        className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-semibold rounded-xl transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={status !== "idle"}
                        className={`flex items-center gap-2 px-6 py-2.5 text-white text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer disabled:cursor-not-allowed ${status === "saved"
                            ? "bg-emerald-500 shadow-emerald-200"
                            : "bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-emerald-200"
                            }`}
                    >
                        {status === "idle" && (<><Save size={15} /> Update Asset</>)}
                        {status === "saving" && (<><Loader2 size={15} className="animate-spin" /> Saving...</>)}
                        {status === "saved" && (<><Check size={15} strokeWidth={3} /> Updated!</>)}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AssetUpdatePopup