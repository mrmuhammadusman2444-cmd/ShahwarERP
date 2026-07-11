import React from 'react'
import {ListOrdered, Home, ChevronRight, Plus, Landmark,Calendar, ArrowLeftRight, Building2, Hash, Banknote, StickyNote, RotateCcw, Save, Check} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

const AddNewTransaction = () => {
  const navigate = useNavigate();
 return (
        <div className="p-4 bg-slate-50 min-h-screen">
 
            <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2.5">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
                        <ListOrdered className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-[15.5px] font-bold text-slate-900 leading-tight">Bank Transaction</h1>
                        <p className="text-[11px] text-slate-400 leading-tight">Add a new bank transaction</p>
                    </div>
                </div>
 
                <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400">
                    
                </div>
            </div>
 
            <div className="flex items-center gap-2.5 flex-wrap mb-3.5">
                <button onClick={() => navigate('/new/bank')} type="button" className="flex items-center gap-1.5 bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white text-[12.5px] font-semibold rounded-lg px-4 py-2.5 shadow-sm shadow-teal-200 transition-all hover:-translate-y-0.5 cursor-pointer">
                    <Plus className="w-4 h-4" />
                    Add New Bank
                </button>
                <button onClick={() => navigate('/manage/bank')} type="button" className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-4 py-2.5 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
                    <Landmark className="w-4 h-4" />
                    Manage Bank
                </button>
            </div>
 
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
 
                <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-emerald-100">
                    <div className="w-6 h-6 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                        <ListOrdered className="w-3.5 h-3.5 text-white" />
                    </div>
                    <p className="text-[12px] font-bold text-slate-700">Bank Transaction</p>
                </div>
 
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-4">
 
                    <div>
                        <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                            Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input type="date" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                        </div>
                    </div>
 
                    <div>
                        <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                            Account Type <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <select className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all cursor-pointer">
                                <option value="">Select option</option>
                                <option>Debit (+)</option>
                                <option>Credit (-)</option>
                            </select>
                        </div>
                    </div>
 
                    <div>
                        <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                            Bank Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Building2 className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <select className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all cursor-pointer">
                                <option value="">Select option</option>
                            </select>
                        </div>
                    </div>
 
                    <div>
                        <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                            Withdraw / Deposite ID <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Hash className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input type="text" placeholder="Withdraw / Deposite ID" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                        </div>
                    </div>
 
                    <div>
                        <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                            Amount <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Banknote className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input type="text" placeholder="Amount" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                        </div>
                    </div>
 
                    <div>
                        <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Cash Book</label>
                        <label className="flex items-center gap-3 h-[38px] cursor-pointer group w-fit">
                            <div className="relative shrink-0">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 peer-checked:bg-linear-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-600 rounded-full transition-colors duration-300 shadow-inner"></div>
                                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-emerald-500 opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
                                </div>
                            </div>
                            <span className="text-[12.5px] font-semibold text-slate-600 group-hover:text-emerald-600 transition-colors">Enable</span>
                        </label>
                    </div>
 
                    <div className="md:col-span-3">
                        <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Description</label>
                        <div className="relative">
                            <StickyNote className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-3 pointer-events-none" />
                            <textarea rows={3} placeholder="Description" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all resize-none" />
                        </div>
                    </div>
 
                </div>
 
                <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-slate-100">
                    <button type="button" className="flex items-center gap-1.5 bg-linear-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-white text-[12.5px] font-semibold rounded-lg px-5 py-2.5 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset
                    </button>
                    <button type="button" className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-6 py-2.5 shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                        <Save className="w-3.5 h-3.5" />
                        Save
                    </button>
                </div>
 
            </div>
        </div>
    );
}

export default AddNewTransaction
