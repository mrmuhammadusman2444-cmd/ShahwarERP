import React from 'react'
import { motion } from "framer-motion";
import { X, User, Mail, Phone, Warehouse, Wallet, Tag, Coins, History, Check } from "lucide-react";

const backdrop = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.2 } },
};

const panel = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 260, damping: 24, staggerChildren: 0.04, delayChildren: 0.08 },
    },
};

const field = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 26 } },
};

const EditCustomerPopup = ({ setShowEditPopup }) => {
    return (
        <motion.div
            variants={backdrop}
            initial="hidden"
            animate="show"
            className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/40 backdrop-blur-sm p-4"
        >
            <motion.div
                variants={panel}
                initial="hidden"
                animate="show"
                className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl shadow-emerald-950/20 ring-1 ring-emerald-100"
            >
                <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-emerald-100/50 blur-3xl" />

                <div className="relative flex items-start justify-between gap-4 border-b border-emerald-100 px-6 py-5">
                    <div className="flex items-center gap-4">
                        <motion.div
                            initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 text-sm font-bold text-white shadow-lg shadow-emerald-200"
                        >
                            AK
                        </motion.div>
                        <div>
                            <h2 className="text-lg font-bold tracking-tight text-gray-800">Edit customer</h2>
                            <p className="mt-0.5 text-xs text-gray-400">
                                Ali Khan · <span className="text-emerald-600">Distributor</span>
                            </p>
                        </div>
                    </div>

                    <motion.button onClick={() => { setShowEditPopup(false) }}
                        whileHover={{ rotate: 90, backgroundColor: "rgb(236 253 245)" }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="cursor-pointer rounded-xl p-2 text-gray-400 hover:text-emerald-700"
                    >
                        <X size={18} />
                    </motion.button>
                </div>

                <div className="max-h-[calc(90vh-9.5rem)] overflow-y-auto px-6 py-6">
                    <motion.div variants={panel} initial="hidden" animate="show" className="flex flex-col gap-7">

                        <motion.section variants={field}>
                            <div className="mb-4 flex items-center gap-2">
                                <span className="h-4 w-1 rounded-full bg-linear-to-b from-emerald-400 to-emerald-700" />
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Basic information</h3>
                                <span className="ml-2 h-px flex-1 bg-emerald-50" />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <motion.div variants={field} className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                        Customer name <span className="text-emerald-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            placeholder="Enter customer name"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div variants={field} className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                        Email <span className="text-emerald-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            placeholder="customer@email.com"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div variants={field} className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                        Phone no <span className="text-emerald-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            placeholder="03xx-xxxxxxx"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div variants={field} className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Warehouse</label>
                                    <div className="relative">
                                        <Warehouse size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <select
                                            defaultValue=""
                                            className="w-full cursor-pointer appearance-none rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        >
                                            <option value="">Select warehouse</option>
                                            <option>Main Warehouse</option>
                                            <option>Warehouse A</option>
                                            <option>Warehouse B</option>
                                        </select>
                                    </div>
                                </motion.div>

                                <motion.div variants={field} className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Amount limit</label>
                                    <div className="relative">
                                        <Wallet size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            placeholder="0.00"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div variants={field} className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                        Product rate <span className="text-emerald-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <select
                                            defaultValue=""
                                            className="w-full cursor-pointer appearance-none rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        >
                                            <option value="">Select rate type</option>
                                            <option value="distributor">Distributor rate</option>
                                            <option value="dealer">Dealer rate</option>
                                            <option value="retail">Retail rate</option>
                                        </select>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.section>

                        <motion.section variants={field}>
                            <div className="mb-4 flex items-center gap-2">
                                <span className="h-4 w-1 rounded-full bg-linear-to-b from-emerald-400 to-emerald-700" />
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Credits &amp; scheme</h3>
                                <span className="ml-2 h-px flex-1 bg-emerald-50" />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <motion.div variants={field} className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Customer credits</label>
                                    <div className="relative">
                                        <Coins size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            placeholder="0.00"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div variants={field} className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Previous balance</label>
                                    <div className="relative">
                                        <History size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            placeholder="0.00"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div variants={field}>
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Scheme</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <motion.label
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex cursor-pointer items-center gap-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 px-3 py-2.5 shadow-sm shadow-emerald-100"
                                        >
                                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600">
                                                <Check size={11} strokeWidth={3.5} className="text-white" />
                                            </span>
                                            <span className="text-sm font-semibold text-emerald-800">Yes</span>
                                        </motion.label>

                                        <motion.label
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex cursor-pointer items-center gap-2.5 rounded-xl border-2 border-emerald-100 bg-emerald-50/50 px-3 py-2.5 transition-colors hover:border-emerald-300"
                                        >
                                            <span className="h-4 w-4 rounded-full border-2 border-emerald-200 bg-white" />
                                            <span className="text-sm font-medium text-gray-500">No</span>
                                        </motion.label>
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div variants={field} className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5">
                                <div className="mb-2 flex items-center justify-between text-[11px]">
                                    <span className="font-semibold text-emerald-800">Credit used</span>
                                    <span className="text-gray-400">Rs. 45,000 of 100,000</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-emerald-100">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "45%" }}
                                        transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                        className="h-full rounded-full bg-linear-to-r from-emerald-400 to-emerald-600"
                                    />
                                </div>
                            </motion.div>
                        </motion.section>

                    </motion.div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-emerald-100 bg-emerald-50/40 px-6 py-4">
                    <motion.button onClick={() => { setShowEditPopup(false) }}
                        whileHover={{ y: -2, backgroundColor: "rgb(236 253 245)" }}
                        whileTap={{ scale: 0.98, y: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="w-40 cursor-pointer rounded-xl border border-emerald-200 bg-white py-2.5 text-sm font-semibold text-emerald-700"
                    >
                        Cancel
                    </motion.button>
                    <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98, y: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="w-40 cursor-pointer rounded-xl bg-linear-to-b from-emerald-500 to-emerald-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 hover:from-emerald-400 hover:to-emerald-600"
                    >
                        Save changes
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default EditCustomerPopup