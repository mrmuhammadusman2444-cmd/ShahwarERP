import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, MapPin, FileText, Wallet, History, Save, Loader2, Check, AlertCircle } from "lucide-react";

const SupplierUpdatePopup = ({ setShowUpdatePopup, updateData, handleFindSupplier }) => {

    const [status, setStatus] = useState("idle")

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
            await axios.put(`http://localhost:3000/update/supplier/${updateData._id}`, supplier)
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
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 text-sm font-bold text-white shadow-lg shadow-emerald-200">
                            {(supplier.supplierName || "?").trim().charAt(0).toUpperCase()}
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