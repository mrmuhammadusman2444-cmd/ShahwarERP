import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  BarChart2,
  Package,
  ShieldCheck,
  Store,
} from "lucide-react";
import { useState } from 'react';


const Login = () => {
  let navigate=useNavigate()

  let [LoginForm, setLoginForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  async function handleLogin() {
     if(!LoginForm.email){
    toast.error('Please Enter Your Email...', { position: 'bottom-right', autoClose: 800 })
    return
  }

  if(!LoginForm.password){
    toast.error('Please Enter Your Password...', { position: 'bottom-right', autoClose: 800 })
    return
  }
  
 try {
  let res = await axios.post('http://localhost:3000/signin', LoginForm)
  console.log(res.data)

  if (res.data.success) {
    toast.success('Login Successful!', { position: 'bottom-right', autoClose: 800 })
    setTimeout(() => {
      navigate('/home')
    }, 800)
  } else {
    toast.error(res.data.message, { position: 'bottom-right', autoClose: 800 })
  }

} catch (error) {
  console.error('Login failed:', error)
  toast.error('Something went wrong!', { position: 'bottom-right', autoClose: 800 })
}
  }



  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div
        className="grid w-full max-w-4xl rounded-2xl overflow-hidden border border-slate-200"
        style={{ gridTemplateColumns: "1fr 1fr", minHeight: "600px" }}
      >

        <div className="bg-blue-900 p-10 flex flex-col justify-between">
          <div>

            <div className="flex items-center gap-2.5 mb-10">
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.28)" }}>
                <Store size={18} color="#fff" />
              </div>
              <span className="text-white text-[15px] font-semibold tracking-tight">
                Shahwar ERP
              </span>
            </div>

            <h1 className="text-white text-[26px] font-semibold leading-snug tracking-tight mb-2.5">
              One platform for your entire business
            </h1>
            <p className="text-blue-300 text-[14px] leading-relaxed mb-8">
              Manage sales, inventory, and accounts — all from a single dashboard.
            </p>

            <div className="flex items-center gap-3 mb-3.5">
              <div className="w-9.5 h-9.5 rounded-lg shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}>
                <BarChart2 size={17} color="#bfdbfe" />
              </div>
              <div>
                <div className="text-[13px] font-medium text-white">Real-time Analytics</div>
                <div className="text-[12px] text-blue-300 mt-px">Track sales and performance instantly</div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3.5">
              <div className="w-9.5 h-9.5 rounded-lg shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}>
                <Package size={17} color="#bfdbfe" />
              </div>
              <div>
                <div className="text-[13px] font-medium text-white">Inventory Control</div>
                <div className="text-[12px] text-blue-300 mt-px">Stock alerts and automated reorders</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9.5 h-9.5 rounded-lg shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}>
                <ShieldCheck size={17} color="#bfdbfe" />
              </div>
              <div>
                <div className="text-[13px] font-medium text-white">Secure & Reliable</div>
                <div className="text-[12px] text-blue-300 mt-px">Your data is always protected</div>
              </div>
            </div>

          </div>

          <div className="mt-8 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-800 shrink-0">
                HF
              </div>
              <span className="text-white text-[13px] font-medium">Hafiz Foods</span>
              <span className="ml-auto text-[11px] text-blue-400 font-medium">Est. 1960</span>
            </div>
            <p className="text-blue-300 text-[12px] leading-relaxed">
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
              className="w-full h-9.5 border border-slate-200 rounded-lg px-3 text-[13px] text-slate-900 bg-slate-50 outline-none focus:border-blue-300 focus:bg-white transition-colors"
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[12px] font-medium text-slate-500">Password</label>
              <a href="#" className="text-[12px] text-blue-500 font-medium">Forgot password?</a>
            </div>
            <input
              onChange={(e) => setLoginForm({ ...LoginForm, password: e.target.value })}
              type="password"
              placeholder="••••••••"
              className="w-full h-9.5 border border-slate-200 rounded-lg px-3 text-[13px] text-slate-900 bg-slate-50 outline-none focus:border-blue-300 focus:bg-white transition-colors"
            />
          </div>

          <button
            type="button"
            className="w-full h-10.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-[14px] font-medium cursor-pointer mb-3 transition-colors border-none"
            onClick={handleLogin}
          >
            Sign in
          </button>

          <p className="text-[12px] text-slate-400 text-center">
            Don't have an account?{" "}
            <a onClick={() => navigate('/')} className="text-blue-500 cursor-pointer font-medium">Create one</a>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login
