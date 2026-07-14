import { motion } from "framer-motion";
import Logo from '../assets/Images/logo.png'

const Preloader = () => {
    return (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white">

            <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-50 blur-3xl" />

            <div className="relative flex flex-col items-center">

                <div className="relative flex h-24 w-24 items-center justify-center">

                    <motion.span
                        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-3xl bg-emerald-200"
                    />

                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, rotate: -12 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="relative flex h-25 w-25 items-center justify-center rounded-3xl bg-linear-to-br from-emerald-500 to-emerald-700 text-2xl font-bold text-white shadow-xl shadow-emerald-200"
                    >
                        <img src={Logo} alt="" />
                    </motion.div>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="mt-6 text-xl font-bold tracking-tight text-gray-800"
                >
                    Shahwar Foods
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-1 text-xs text-gray-400"
                >
                    Real-Time Insights. Real Growth...
                </motion.p>

                <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-emerald-50">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-linear-to-r from-emerald-400 to-emerald-600"
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-3 text-[11px] font-medium text-gray-400"
                >
                    Loading your workspace...
                </motion.p>

            </div>
        </div>
    );
}

export default Preloader