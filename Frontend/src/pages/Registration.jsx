import { BarChart2, Package, ShieldCheck, Store, UserPlus, Loader2, Check, AlertCircle } from "lucide-react";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from "framer-motion";






const Registration = () => {
  let navigate = useNavigate()
  const [status, setStatus] = useState("idle")
  const [loading, setLoading] = useState(false)

  let [RegisterForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    password: '',
    confirmPassword: ''
  })

  async function handleRegister() {

    if (!RegisterForm.firstName) {
      toast.error('Please Enter Your First Name...', { position: 'bottom-right', autoClose: 800 })
      return
    };
    if (!RegisterForm.email) {
      toast.error('Please Enter Email...', { position: 'bottom-right', autoClose: 800 })
      return
    };
    if (!RegisterForm.password) {
      toast.error('Please Enter Your Password...', { position: 'bottom-right', autoClose: 800 })
      return
    }

    setStatus("saving")
    const minDelay = new Promise(r => setTimeout(r, 700))

    try {
      await axios.post('http://localhost:3000/signup', RegisterForm)
      await minDelay
      setStatus("saved")

      setTimeout(() => {
        setLoading(true)
        setTimeout(() => navigate('/login'), 600)
      }, 900)

    } catch (error) {
      console.log("SIGNUP FAILED:", error.response?.data || error.message)
      await minDelay
      setStatus("error")
      setTimeout(() => setStatus("idle"), 2500)
    }
  }


  return (
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
            Create your account
          </h2>
          <p className="text-[13px] text-slate-400 mb-6">
            Register your company and get started for free
          </p>

          <div className="grid grid-cols-2 gap-2.5 mb-2.5">
            <div>
              <label className="block text-[12px] font-medium text-slate-500 mb-1.5">First name</label>
              <input onChange={function (e) {
                setRegisterForm({ ...RegisterForm, firstName: e.target.value })
              }} type="text" placeholder="Ali"
                className="w-full h-9.5 border border-slate-200 rounded-lg px-3 text-[13px] text-slate-900 bg-slate-50 outline-none focus:border-emerald-300 focus:bg-white transition-colors" />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-slate-500 mb-1.5">Last name</label>
              <input onChange={function (e) {
                setRegisterForm({ ...RegisterForm, lastName: e.target.value })
              }} type="text" placeholder="Khan"
                className="w-full h-9.5 border border-slate-200 rounded-lg px-3 text-[13px] text-slate-900 bg-slate-50 outline-none focus:border-emerald-300 focus:bg-white transition-colors" />
            </div>
          </div>




          <div className="mb-2.5">
            <label className="block text-[12px] font-medium text-slate-500 mb-1.5">Email address</label>
            <input onChange={function (e) {
              setRegisterForm({ ...RegisterForm, email: e.target.value })
            }} type="email" placeholder="info@shahwarfoods.com"
              className="w-full h-9.5 border border-slate-200 rounded-lg px-3 text-[13px] text-slate-900 bg-slate-50 outline-none focus:border-emerald-300 focus:bg-white transition-colors" />
          </div>

          {/* Phone */}
          <div className="mb-2.5">
            <label className="block text-[12px] font-medium text-slate-500 mb-1.5">Phone number</label>
            <input onChange={function (e) {
              setRegisterForm({ ...RegisterForm, phoneNo: e.target.value })
            }} type="tel" placeholder="+92 300 0000000"
              className="w-full h-9.5 border border-slate-200 rounded-lg px-3 text-[13px] text-slate-900 bg-slate-50 outline-none focus:border-emerald-300 focus:bg-white transition-colors" />
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <div>
              <label className="block text-[12px] font-medium text-slate-500 mb-1.5">Password</label>
              <input onChange={function (e) {
                setRegisterForm({ ...RegisterForm, password: e.target.value })
              }} type="password" placeholder="••••••••"
                className="w-full h-9.5 border border-slate-200 rounded-lg px-3 text-[13px] text-slate-900 bg-slate-50 outline-none focus:border-emerald-300 focus:bg-white transition-colors" />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-slate-500 mb-1.5">Confirm password</label>
              <input onChange={function (e) {
                setRegisterForm({ ...RegisterForm, confirmPassword: e.target.value })
              }} type="password" placeholder="••••••••"
                className="w-full h-9.5 border border-slate-200 rounded-lg px-3 text-[13px] text-slate-900 bg-slate-50 outline-none focus:border-emerald-300 focus:bg-white transition-colors" />
            </div>
          </div>



          <motion.button
            onClick={handleRegister}
            disabled={status !== "idle"}
            whileHover={status === "idle" ? { y: -2 } : {}}
            whileTap={status === "idle" ? { scale: 0.98, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={`group relative mt-10 mb-3 flex h-11 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg text-[14px] font-semibold text-white shadow-lg transition-colors duration-300 disabled:cursor-not-allowed ${status === "error"
              ? "bg-rose-600 shadow-rose-200"
              : "bg-linear-to-b from-emerald-800 to-emerald-950 shadow-emerald-200 hover:from-emerald-700 hover:to-emerald-900"
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
                  <UserPlus size={15} />
                  Create account
                </motion.span>
              )}

              {status === "saving" && (
                <motion.span key="saving"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="relative flex items-center gap-2 whitespace-nowrap">
                  <Loader2 size={15} className="animate-spin" />
                  Creating account...
                </motion.span>
              )}

              {status === "saved" && (
                <motion.span key="saved"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="relative flex items-center gap-2 whitespace-nowrap">
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.05 }}
                    className="flex h-4 w-4 items-center justify-center rounded-full bg-white">
                    <Check size={11} strokeWidth={4} className="text-emerald-700" />
                  </motion.span>
                  Account created
                </motion.span>
              )}

              {status === "error" && (
                <motion.span key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, x: [0, -4, 4, -3, 3, 0] }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="relative flex items-center gap-2 whitespace-nowrap">
                  <AlertCircle size={15} />
                  Sign up failed
                </motion.span>
              )}

            </AnimatePresence>
          </motion.button>

          <p className="text-[12px] text-slate-400 text-center">
            Already have an account?{" "}
            <a onClick={() => navigate('/login')} className="text-emerald-500 cursor-pointer font-medium">Sign in</a>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Registration
