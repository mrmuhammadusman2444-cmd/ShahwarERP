import React from 'react'
import { useState } from 'react'
import setting from '../../components/Setting.jsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ChevronDown, Settings, LogOut, User } from "lucide-react";

const UserSelectMenu = ({ setShowSetting }) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="absolute top-4 right-4 sm:right-6 md:right-8 lg:right-10 xl:right-12 2xl:right-14 z-50        ">
            <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-full cursor-pointer  bg-slate-300 hover:bg-slate-200 transition-all duration-200   "
            >
                <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-[13px] font-semibold ring-2 ring-white shadow-sm">
                        MU
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 animate-pulse rounded-full ring-2 ring-white"></span>
                </div>

                <div className="hidden sm:flex flex-col leading-tight">
                    <span className="text-[13px] font-semibold text-slate-800">Muhammad Usman</span>
                    <span className="text-[11px] text-slate-500">info@shahwarfoods.com</span>
                </div>

                <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`}
                />
            </div>

            <div
                style={{
                    maxHeight: profileOpen ? '220px' : '0px',
                    opacity: profileOpen ? 1 : 0,
                    transform: profileOpen ? 'translateY(0px) scale(1)' : 'translateY(-8px) scale(0.98)',
                    transformOrigin: 'top right',
                    transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease, transform 0.25s ease'
                }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
            >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-[14px] font-semibold ring-2 ring-white shadow-sm">
                        MU
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-[13px] font-semibold text-slate-800">Muhammad Usman</span>
                        <span className="text-[11px] text-slate-400">info@shahwarfoods.com</span>
                    </div>
                </div>

                <div className="p-1.5">
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors duration-200 group">
                        <User size={16} className="text-slate-500 group-hover:text-blue-600" />
                        <span className="text-[12.5px] text-slate-600 group-hover:text-blue-700 font-medium">My Profile</span>
                    </div>

                    <div onClick={() => { setShowSetting(true) }} className="flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors duration-200 group">
                        <Settings size={16} className="text-slate-500 group-hover:text-blue-600" />
                        <span className="text-[12.5px] text-slate-600 group-hover:text-blue-700 font-medium">Settings</span>
                    </div>
                </div>

                <div className="p-1.5 border-t border-slate-100">
                    <div onClick={() => {
                        toast.success('You have Logged Out', { position: 'bottom-right', autoClose: 800 })
                        setTimeout(() => (navigate('/login')), 800)
                    }} className="flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer hover:bg-red-50 transition-colors duration-200 group">
                        <LogOut size={16} className="text-red-400 group-hover:text-red-600" />
                        <span className="text-[12.5px] text-red-500 group-hover:text-red-700 font-medium">Logout</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSelectMenu