import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, MapPin, FileText, Wallet, History, Save, Loader2, Check, AlertCircle } from "lucide-react";

const SupplierUpdatePopup = ({ setShowUpdatePopup, updateData, handleFindSupplier }) => {

    const [status, setStatus] = useState("idle")
    const [picture, setPicture] = useState(null)
    const [preview, setPreview] = useState("")
    const [removePic, setRemovePic] = useState(false)

    function handlePicture(e) {
        let file = e.target.files[0]
        if (file) {
            setPicture(file)
            setPreview(URL.createObjectURL(file))
            setRemovePic(false)
        }
    }

    const [supplier, setSupplier] = useState({
        supplierName: '',
        email: '',
        phoneNo: '',
        address: '',
        supplierDetails: '',
        supplierCredits: '',
        previousCreditsBalance: ''
    })

    useEffect(() => {
        if (updateData) {
            setSupplier(updateData)
        }
    }, [updateData])

        async function handleUpdateSupplier() {
        setStatus("saving")
        const minDelay = new Promise(r => setTimeout(r, 700))

        try {
            let formData = new FormData()
            formData.append('supplierName', supplier.supplierName || '')
            formData.append('email', supplier.email || '')
            formData.append('phoneNo', supplier.phoneNo || '')
            formData.append('address', supplier.address || '')
            formData.append('supplierDetails', supplier.supplierDetails || '')
            formData.append('supplierCredits', supplier.supplierCredits || '')
            formData.append('previousCreditsBalance', supplier.previousCreditsBalance || '')
            if (picture) formData.append('picture', picture)
            if (removePic) formData.append('removePicture', 'true')

            await axios.put(`http://localhost:3000/update/supplier/${updateData._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            await minDelay
            setStatus("saved")
            setTimeout(() => {
                setStatus("idle")
                setShowUpdatePopup(false)
                handleFindSupplier()
            }, 1200)
        } catch (err) {
            console.log("UPDATE FAILED:", err.response?.data || err.message)
            await minDelay
            setStatus("error")
            setTimeout(() => setStatus("idle"), 2500)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/40 backdrop-blur-sm p-4">

            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl shadow-emerald-950/20 ring-1 ring-emerald-100">

                <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-emerald-100/50 blur-3xl" />

                <div className="relative flex items-start justify-between gap-4 border-b border-emerald-100 px-6 py-5">
                    <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                            <label className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 text-sm font-bold text-white shadow-lg shadow-emerald-200 cursor-pointer">
                                {(preview || (supplier.picture && !removePic)) ? (
                                    <img src={preview || `http://localhost:3000${supplier.picture}`} alt="" className="h-full w-full object-cover" />
                                ) : (
                                    (supplier.supplierName || "?").trim().charAt(0).toUpperCase()
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-emerald-900/60 opacity-0 transition-opacity group-hover:opacity-100">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 8l-4-4m0 0L8 8m4-4v12" /></svg>
                                </div>
                                <input type="file" accept="image/*" onChange={handlePicture} className="hidden" />
                            </label>
                            {(preview || (supplier.picture && !removePic)) && (
                                <button
                                    onClick={() => { setPicture(null); setPreview(""); setRemovePic(true) }}
                                    title="Remove photo"
                                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white shadow-md ring-2 ring-white transition-all hover:bg-rose-600 cursor-pointer">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            )}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold tracking-tight text-gray-800">
                                {supplier.supplierName || "Edit supplier"}
                            </h2>
                            <p className="mt-0.5 text-xs text-gray-400">
                                <span className="text-emerald-600">Update supplier information</span>
                            </p>
                        </div>
                    </div>

                    <button onClick={() => setShowUpdatePopup(false)} className="cursor-pointer rounded-xl p-2 text-gray-400 transition-all duration-200 hover:rotate-90 hover:bg-emerald-50 hover:text-emerald-700">
                        <X size={18} />
                    </button>
                </div>

                <div className="max-h-[calc(90vh-9.5rem)] overflow-y-auto px-6 py-6">
                    <div className="flex flex-col gap-7">

                        <section>
                            <div className="mb-4 flex items-center gap-2">
                                <span className="h-4 w-1 rounded-full bg-linear-to-b from-emerald-400 to-emerald-700" />
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Basic information</h3>
                                <span className="ml-2 h-px flex-1 bg-emerald-50" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div className="col-span-2 group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                        Supplier name <span className="text-emerald-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            value={supplier.supplierName}
                                            onChange={(e) => setSupplier({ ...supplier, supplierName: e.target.value })}
                                            placeholder="Enter supplier name"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Email</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            value={supplier.email}
                                            onChange={(e) => setSupplier({ ...supplier, email: e.target.value })}
                                            placeholder="supplier@email.com"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Phone no</label>
                                    <div className="relative">
                                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            value={supplier.phoneNo}
                                            onChange={(e) => setSupplier({ ...supplier, phoneNo: e.target.value })}
                                            placeholder="03xx-xxxxxxx"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-2 group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Address</label>
                                    <div className="relative">
                                        <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            value={supplier.address}
                                            onChange={(e) => setSupplier({ ...supplier, address: e.target.value })}
                                            placeholder="Enter address"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-2 group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Supplier details</label>
                                    <div className="relative">
                                        <FileText size={16} className="absolute left-3.5 top-3 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <textarea
                                            value={supplier.supplierDetails}
                                            onChange={(e) => setSupplier({ ...supplier, supplierDetails: e.target.value })}
                                            rows={3}
                                            placeholder="Type supplier details..."
                                            className="w-full cursor-text resize-none rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </div>

                            </div>
                        </section>

                        <section>
                            <div className="mb-4 flex items-center gap-2">
                                <span className="h-4 w-1 rounded-full bg-linear-to-b from-emerald-400 to-emerald-700" />
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Credits</h3>
                                <span className="ml-2 h-px flex-1 bg-emerald-50" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Supplier credits</label>
                                    <div className="relative">
                                        <Wallet size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            value={supplier.supplierCredits}
                                            onChange={(e) => setSupplier({ ...supplier, supplierCredits: e.target.value })}
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Previous balance</label>
                                    <div className="relative">
                                        <History size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            value={supplier.previousCreditsBalance}
                                            onChange={(e) => setSupplier({ ...supplier, previousCreditsBalance: e.target.value })}
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </div>

                            </div>
                        </section>

                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-emerald-100 bg-emerald-50/40 px-6 py-4">
                    <button onClick={() => setShowUpdatePopup(false)} className="w-36 cursor-pointer rounded-xl border border-emerald-200 bg-white py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:-translate-y-0.5 hover:bg-emerald-50 active:translate-y-0">
                        Cancel
                    </button>
                    <motion.button
                        onClick={handleUpdateSupplier}
                        disabled={status !== "idle"}
                        whileTap={status === "idle" ? { scale: 0.97 } : {}}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className={`flex w-44 cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed ${status === "error"
                            ? "bg-rose-600 shadow-rose-200"
                            : "bg-linear-to-b from-emerald-500 to-emerald-600 shadow-emerald-200 hover:from-emerald-400 hover:to-emerald-600"
                            }`}
                    >
                        <AnimatePresence mode="wait">
                            {status === "idle" && (
                                <motion.span key="idle" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }} className="flex items-center gap-2">
                                    <Save size={15} /> Update supplier
                                </motion.span>
                            )}
                            {status === "saving" && (
                                <motion.span key="saving" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }} className="flex items-center gap-2">
                                    <Loader2 size={15} className="animate-spin" /> Updating...
                                </motion.span>
                            )}
                            {status === "saved" && (
                                <motion.span key="saved" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }} className="flex items-center gap-2">
                                    <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.05 }} className="flex h-4 w-4 items-center justify-center rounded-full bg-white">
                                        <Check size={11} strokeWidth={4} className="text-emerald-600" />
                                    </motion.span>
                                    Supplier Updated
                                </motion.span>
                            )}
                            {status === "error" && (
                                <motion.span key="error" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, x: [0, -4, 4, -3, 3, 0] }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="flex items-center gap-2">
                                    <AlertCircle size={15} /> Update Failed
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

            </div>
        </div>
    )
}

export default SupplierUpdatePopup