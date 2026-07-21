import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Preloader from "../components/Preloader";
import { BarChart2, LogIn, Loader2, AlertCircle, Package, ShieldCheck, Store, } from "lucide-react";


const Login = () => {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("idle")
  const navigate = useNavigate()

  let [LoginForm, setLoginForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  async function handleLogin() {
    if (!LoginForm.email) {
      toast.error('Please Enter Your Email...', { position: 'bottom-right', autoClose: 800 })
      return
    }

    if (!LoginForm.password) {
      toast.error('Please Enter Your Password...', { position: 'bottom-right', autoClose: 800 })
      return
    }

    setStatus("signing")
    const minDelay = new Promise(r => setTimeout(r, 600))

    try {
      let res = await axios.post('http://localhost:3000/signin', LoginForm)
      await minDelay

      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data.user))
        setLoading(true)
        setTimeout(() => navigate('/Dashboard'), 2800)
      } else {
        setStatus("error")
        toast.error(res.data.message, { position: 'bottom-right', autoClose: 800 })
        setTimeout(() => setStatus("idle"), 2000)
      }

    } catch (error) {
      await minDelay
      setStatus("error")
      toast.error('Something went wrong!', { position: 'bottom-right', autoClose: 800 })
      setTimeout(() => setStatus("idle"), 2000)
    }
  }


  return (
    <>
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div
          className="grid w-full max-w-4xl rounded-2xl overflow-hidden border border-slate-200"
          style={{ gridTemplateColumns: "1fr 1fr", minHeight: "600px" }}
        >

          <div className="bg-emerald-900 p-10 flex flex-col justify-between">
            <div>

              <div className="flex items-center gap-2.5 mb-10">
                <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.28)" }}>
                  <Store size={18} color="#07ff40" />
                </div>
                <span className="text-white text-[15px] font-semibold tracking-tight">
                  Shahwar ERP
                </span>
              </div>

              <h1 className="text-white text-[26px] font-semibold leading-snug tracking-tight mb-2.5">
                One platform for your entire business
              </h1>
              <p className="text-emerald-300 text-[14px] leading-relaxed mb-8">
                Manage sales, inventory, and accounts — all from a single dashboard.
              </p>

              <div className="flex items-center gap-3 mb-3.5">
                <div className="w-9.5 h-9.5 rounded-lg shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}>
                  <BarChart2 size={17} color="#07ff40" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-white">Real-time Analytics</div>
                  <div className="text-[12px] text-emerald-300 mt-px">Track sales and performance instantly</div>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3.5">
                <div className="w-9.5 h-9.5 rounded-lg shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}>
                  <Package size={17} color="#07ff40" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-white">Inventory Control</div>
                  <div className="text-[12px] text-emerald-300 mt-px">Stock alerts and automated reorders</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9.5 h-9.5 rounded-lg shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}>
                  <ShieldCheck size={17} color="#07ff40" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-white">Secure & Reliable</div>
                  <div className="text-[12px] text-emerald-300 mt-px">Your data is always protected</div>
                </div>
              </div>

            </div>

            <div className="mt-8 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-800 shrink-0">
                  HF
                </div>
                <span className="text-white text-[13px] font-medium">Hafiz Foods</span>
                <span className="ml-auto text-[11px] text-emerald-400 font-medium">Est. 1960</span>
              </div>
              <p className="text-emerald-300 text-[12px] leading-relaxed">
                A trusted name in quality food distribution for over six decades — delivering fresh, reliable products to homes and businesses across the region.
              </p>
            </div>
          </div>

          <div className="bg-white p-10 flex flex-col justify-center">

            <h2 className="text-[22px] font-semibold text-slate-900 tracking-tight mb-1.5">
              Welcome back
            </h2>
            <p className="text-[13px] text-slate-400 mb-8">
              Sign in to your account to continue
            </p>

            <div className="mb-2.5">
              <label className="block text-[12px] font-medium text-slate-500 mb-1.5">Email address</label>
              <input
                onChange={(e) => setLoginForm({ ...LoginForm, email: e.target.value })}
                type="email"
                placeholder="info@shahwarfoods.com"
                className="w-full h-9.5 border border-slate-200 rounded-lg px-3 text-[13px] text-slate-900 bg-slate-50 outline-none focus:border-emerald-300 focus:bg-white transition-colors"
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-medium text-slate-500">Password</label>
                <a href="#" className="text-[12px] text-emerald-500 font-medium">Forgot password?</a>
              </div>
              <input
                onChange={(e) => setLoginForm({ ...LoginForm, password: e.target.value })}
                type="password"
                placeholder="••••••••"
                className="w-full h-9.5 border border-slate-200 rounded-lg px-3 text-[13px] text-slate-900 bg-slate-50 outline-none focus:border-emerald-300 focus:bg-white transition-colors"
              />
            </div>

            <motion.button
              type="button"
              onClick={handleLogin}
              disabled={status !== "idle"}
              whileHover={status === "idle" ? { y: -1.5 } : {}}
              whileTap={status === "idle" ? { scale: 0.98, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className={`group relative mb-3 flex h-10.5 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border-none text-[14px] font-medium text-white shadow-md transition-colors disabled:cursor-not-allowed ${status === "error"
                ? "bg-rose-600 shadow-rose-200"
                : "bg-emerald-900 shadow-emerald-200 hover:bg-emerald-800"
                }`}
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <AnimatePresence mode="wait">

                {status === "idle" && (
                  <motion.span key="idle"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="relative flex items-center gap-2 whitespace-nowrap">
                    Sign in
                    <LogIn size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </motion.span>
                )}

                {status === "signing" && (
                  <motion.span key="signing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="relative flex items-center gap-2 whitespace-nowrap">
                    <Loader2 size={15} className="animate-spin" />
                    Signing in...
                  </motion.span>
                )}

                {status === "error" && (
                  <motion.span key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0, x: [0, -5, 5, -3, 3, 0] }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="relative flex items-center gap-2 whitespace-nowrap">
                    <AlertCircle size={15} />
                    Sign in failed
                  </motion.span>
                )}

              </AnimatePresence>
            </motion.button>

            <p className="text-[12px] text-slate-400 text-center">
              Don't have an account?{" "}
              <a onClick={() => navigate('/')} className="text-emerald-500 cursor-pointer font-medium">Create one</a>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}

export default Login
