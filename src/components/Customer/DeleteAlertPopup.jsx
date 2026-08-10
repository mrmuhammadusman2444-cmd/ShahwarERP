import React from 'react'
import { useState, useRef } from 'react';
import { motion } from "framer-motion";
import { X, AlertTriangle, Trash2, Mail, Phone, Wallet } from "lucide-react";

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

const DeleteAlertPopup = ({ setShowDeleteAlert, deleteData, handleDelete }) => {
    const [progress, setProgress] = useState(0)
    const [holding, setHolding] = useState(false)
    const timer = useRef(null)
    const started = useRef(0)

    const outstanding = Number(deleteData.PreviouseCreditsBalance) || 0
    const credits = Number(deleteData.customerCredits) || 0
    const hasDues = outstanding > 0 || credits > 0

    const initials = (deleteData.customerName || "")
        .trim().split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase()

    function startHold() {
        setHolding(true)
        started.current = Date.now()
        timer.current = setInterval(() => {
            const elapsed = Date.now() - started.current
            const pct = Math.min((elapsed / HOLD_MS) * 100, 100)
            setProgress(pct)
            if (pct >= 100) {
                clearInterval(timer.current)
                handleDelete(deleteData._id)
                setShowDeleteAlert(false)
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
                            <h2 className="text-lg font-bold tracking-tight text-gray-800">Delete this customer?</h2>
                            <p className="mt-1 text-xs leading-relaxed text-gray-500">
                                This removes the record permanently. It can't be undone.
                            </p>
                        </div>
                    </div>

                    <motion.button
                        onClick={() => { setShowDeleteAlert(false) }}
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
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-xs font-bold text-rose-700">
                                {initials || "?"}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-gray-800">
                                    {deleteData.customerName || "Unnamed customer"}
                                </p>
                                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-gray-400">
                                    {deleteData.email && (
                                        <span className="flex items-center gap-1 truncate">
                                            <Mail size={11} /> {deleteData.email}
                                        </span>
                                    )}
                                    {deleteData.phoneNo && (
                                        <span className="flex items-center gap-1">
                                            <Phone size={11} /> {deleteData.phoneNo}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {hasDues && (
                        <motion.div variants={item} className="mt-3 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                            <Wallet size={16} className="mt-0.5 shrink-0 text-amber-600" />
                            <div className="text-[11px] leading-relaxed">
                                <p className="font-bold text-amber-900">Open financials on this account</p>
                                <div className="mt-2 flex gap-5">
                                    {outstanding > 0 && (
                                        <div>
                                            <p className="text-amber-700/70">Outstanding</p>
                                            <p className="mt-0.5 text-sm font-bold tabular-nums text-amber-900">
                                                Rs. {outstanding.toLocaleString()}
                                            </p>
                                        </div>
                                    )}
                                    {credits > 0 && (
                                        <div>
                                            <p className="text-amber-700/70">Credit used</p>
                                            <p className="mt-0.5 text-sm font-bold tabular-nums text-amber-900">
                                                Rs. {credits.toLocaleString()}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <p className="mt-2 text-amber-700/80">
                                    Deleting won't settle these. Clear the ledger first if it still matters.
                                </p>
                            </div>
                        </motion.div>
                    )}

                </div>

                <motion.div variants={item} className="mt-5 flex items-center gap-3 border-t border-gray-100 bg-gray-50/60 px-6 py-4">
                    <motion.button
                        onClick={() => { setShowDeleteAlert(false) }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98, y: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="flex-1 cursor-pointer rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                    >
                        Keep customer
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