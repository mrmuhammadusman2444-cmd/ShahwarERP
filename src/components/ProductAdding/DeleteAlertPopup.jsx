import React from 'react'
import { useState, useRef } from 'react';
import { motion } from "framer-motion";
import { X, AlertTriangle, Trash2, Tag, Layers, Boxes } from "lucide-react";

const backdrop = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.2 } },
};

const panel = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 280, damping: 24, staggerChildren: 0.05, delayChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 26 } },
}

const HOLD_MS = 1200;

const DeleteAlertPopup = ({ setShowDeletePopup, DeleteProduct, handleDeleteProduct }) => {

    const [progress, setProgress] = useState(0)
    const [holding, setHolding] = useState(false)
    const timer = useRef(null)
    const started = useRef(0)

    const retail = Number(DeleteProduct.retailPrice) || 0
    const distributor = Number(DeleteProduct.distributorPrice) || 0
    const limit = Number(DeleteProduct.storeLimit) || 0
    const carton = Number(DeleteProduct.cartonSize) || 0
    const initial = (DeleteProduct.productName || "?").trim().charAt(0).toUpperCase()

    function startHold() {
        setHolding(true)
        started.current = Date.now()
        timer.current = setInterval(() => {
            const elapsed = Date.now() - started.current
            const pct = Math.min((elapsed / HOLD_MS) * 100, 100)
            setProgress(pct)
            if (pct >= 100) {
                clearInterval(timer.current)
                handleDeleteProduct(DeleteProduct._id)
                setShowDeletePopup(false)
            }
        }, 16)
    }

    function cancelHold() {
        clearInterval(timer.current)
        setHolding(false)
        setProgress(0)
    }

    return (
        <motion.div
            variants={backdrop}
            initial="hidden"
            animate="show"
            className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/40 backdrop-blur-sm p-4"
        >
            <motion.div
                variants={panel}
                initial="hidden"
                animate="show"
                className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl shadow-rose-950/20 ring-1 ring-rose-100"
            >
                <div className="pointer-events-none absolute -top-28 -right-20 h-56 w-56 rounded-full bg-rose-100/60 blur-3xl" />

                <div className="relative flex items-start justify-between gap-4 px-6 pt-6 pb-5">
                    <div className="flex items-start gap-4">
                        <motion.div
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}
                            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 ring-1 ring-rose-100"
                        >
                            <motion.span
                                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                className="absolute inset-0 rounded-2xl bg-rose-200"
                            />
                            <AlertTriangle size={20} className="relative text-rose-600" strokeWidth={2.4} />
                        </motion.div>
                        <div>
                            <h2 className="text-lg font-bold tracking-tight text-gray-800">Delete this product?</h2>
                            <p className="mt-1 text-xs leading-relaxed text-gray-500">
                                This removes the product permanently. It can't be undone.
                            </p>
                        </div>
                    </div>

                    <motion.button
                        onClick={() => { setShowDeletePopup(false) }}
                        whileHover={{ rotate: 90, backgroundColor: "rgb(255 241 242)" }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="cursor-pointer rounded-xl p-2 text-gray-400 hover:text-rose-700"
                    >
                        <X size={18} />
                    </motion.button>
                </div>

                <div className="px-6">

                    <motion.div variants={item} className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-rose-400 to-rose-600 text-sm font-bold text-white shadow-sm">
                                {initial}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-gray-800">
                                    {DeleteProduct.productName || "Unnamed product"}
                                </p>
                                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-gray-400">
                                    <span className="flex items-center gap-1 font-mono">
                                        #{DeleteProduct._id.slice(-6).toUpperCase()}
                                    </span>
                                    {DeleteProduct.mainCategory && (
                                        <span className="flex items-center gap-1 truncate">
                                            <Tag size={11} /> {DeleteProduct.mainCategory}
                                        </span>
                                    )}
                                    {carton > 0 && (
                                        <span className="flex items-center gap-1">
                                            <Layers size={11} /> {carton}/carton
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="mt-3 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                        <Boxes size={16} className="mt-0.5 shrink-0 text-amber-600" />
                        <div className="text-[11px] leading-relaxed">
                            <p className="font-bold text-amber-900">Pricing and stock will be lost</p>
                            <div className="mt-2 flex gap-5">
                                <div>
                                    <p className="text-amber-700/70">Retail price</p>
                                    <p className="mt-0.5 text-sm font-bold tabular-nums text-amber-900">
                                        Rs. {retail.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-amber-700/70">Store limit</p>
                                    <p className="mt-0.5 text-sm font-bold tabular-nums text-amber-900">
                                        {limit > 0 ? `${limit.toLocaleString()} units` : "Not set"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-amber-700/70">Carton value</p>
                                    <p className="mt-0.5 text-sm font-bold tabular-nums text-amber-900">
                                        {carton > 0 ? `Rs. ${(distributor * carton).toLocaleString()}` : "—"}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-2 text-amber-700/80">
                                All five price tiers and the scheme point go with it. Past orders keep their own copy.
                            </p>
                        </div>
                    </motion.div>

                </div>

                <motion.div variants={item} className="mt-5 flex items-center gap-3 border-t border-gray-100 bg-gray-50/60 px-6 py-4">
                    <motion.button
                        onClick={() => { setShowDeletePopup(false) }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98, y: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="flex-1 cursor-pointer rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                    >
                        Keep product
                    </motion.button>

                    <motion.button
                        onMouseDown={startHold}
                        onMouseUp={cancelHold}
                        onMouseLeave={cancelHold}
                        onTouchStart={startHold}
                        onTouchEnd={cancelHold}
                        whileTap={{ scale: 0.98 }}
                        className="relative flex flex-1 cursor-pointer select-none items-center justify-center gap-2 overflow-hidden rounded-xl bg-rose-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-200 hover:bg-rose-700"
                    >
                        <span
                            className="absolute inset-y-0 left-0 bg-rose-800"
                            style={{ width: `${progress}%` }}
                        />
                        <span className="relative flex items-center justify-center gap-2">
                            <Trash2 size={15} />
                            {holding ? "Keep holding…" : "Hold to delete"}
                        </span>
                    </motion.button>
                </motion.div>

            </motion.div>
        </motion.div>
    );
}

export default DeleteAlertPopup