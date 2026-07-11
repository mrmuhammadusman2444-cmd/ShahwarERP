import React from 'react'
import { Landmark, Home, ChevronRight, ListOrdered, ClipboardList, Building2, User, Hash, MapPin, ImagePlus, RotateCcw, Save } from 'lucide-react';
import {useNavigate} from 'react-router-dom';
const NewBank = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 bg-slate-50 min-h-screen">

      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
            <Landmark className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-[15.5px] font-bold text-slate-900 leading-tight">Add New Bank</h1>
            <p className="text-[11px] text-slate-400 leading-tight">Add a new bank account</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400">
          
        </div>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap mb-3.5">
        <button onClick={()=>{navigate('/add/new/transaction')}} type="button" className="flex items-center gap-1.5 bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white text-[12.5px] font-semibold rounded-lg px-4 py-2.5 shadow-sm shadow-teal-200 transition-all hover:-translate-y-0.5 cursor-pointer">
          <ListOrdered className="w-4 h-4" />
          Bank Transaction
        </button>
        <button onClick={()=>{navigate('/manage/bank')}} type="button" className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-4 py-2.5 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
          <ClipboardList className="w-4 h-4" />
          Manage Bank
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">

        <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-emerald-100">
          <div className="w-6 h-6 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
            <Landmark className="w-3.5 h-3.5 text-white" />
          </div>
          <p className="text-[12px] font-bold text-slate-700">Add New Bank</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-3.5">

          <div className="flex flex-col gap-3.5">

            <div>
              <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input type="text" placeholder="Bank Name" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                A/C Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input type="text" placeholder="A/C Name" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                A/C Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Hash className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input type="text" placeholder="A/C Number" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Branch <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input type="text" placeholder="Branch" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
              </div>
            </div>

          </div>

          <div>
            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Signature Picture</label>
            <label htmlFor="signaturePicture" className="relative flex flex-col items-center justify-center gap-2 h-full min-h-[172px] rounded-xl border-2 border-dashed border-emerald-200 hover:border-emerald-400 bg-emerald-50/40 hover:bg-emerald-50 transition-all cursor-pointer">
              <input id="signaturePicture" type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
              <div className="w-11 h-11 rounded-xl bg-white border border-emerald-100 shadow-sm flex items-center justify-center">
                <ImagePlus className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="text-center">
                <p className="text-[12.5px] font-semibold text-slate-600">Click to upload signature</p>
                <p className="text-[11px] text-slate-400 mt-0.5">PNG, JPG — max 2MB</p>
              </div>
            </label>
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

export default NewBank
