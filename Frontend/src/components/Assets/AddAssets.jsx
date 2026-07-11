import React from 'react'
import { Building2, Shapes, MapPin, CalendarDays, DollarSign, Coins, Clock3, Calculator, FileText, } from "lucide-react";

const AddAssets = () => {

  return (
    <div className="p-4 md:p-5">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">Add Assets</h1>
            <p className="text-gray-400 text-xs">Add New Assets</p>
          </div>
        </div>

      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-6">

        <h2 className="text-gray-700 text-sm font-bold mb-5 pb-3 border-b border-emerald-50">Add Assets</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Assets Name <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2 relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
              <input
                type="text"
                placeholder="Assets Name"
                className="w-full pl-10 bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Assets Type <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2 relative">
              <Shapes className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 pointer-events-none z-10" />

              <select className="w-full pl-10 bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select type</option>
                <option value="fixed">Fixed</option>
                <option value="current">Current</option>
                <option value="intangible">Intangible</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Location <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 pointer-events-none z-10" />

              <select className="w-full pl-10 bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select location</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Purchase Date <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2 relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 pointer-events-none z-10" />

              <input
                type="date"
                defaultValue="2026-07-08"
                className="w-full pl-10 bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Cost <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2 relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 pointer-events-none z-10" />

              <input
                type="number"
                placeholder="0.00"
                className="w-full pl-10 bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Residual Value <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2 relative">
              <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 pointer-events-none z-10" />

              <input
                type="number"
                placeholder="0.00"
                className="w-full pl-10 bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Useful Life (Years) <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2 relative">
              <Clock3 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 pointer-events-none z-10" />

              <input
                type="number"
                placeholder="Years"
                className="w-full pl-10 bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Depreciation Method <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2 relative">
              <Calculator className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 pointer-events-none z-10" />

              <select className="w-full pl-10 bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select method</option>
                <option value="none">None (e.g., Land)</option>
                <option value="straight">Straight Line</option>
                <option value="declining">Declining Balance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 items-start gap-4 md:col-span-1">
            <label className="text-gray-700 text-sm font-semibold text-right pt-2.5">
              Description
            </label>
            <div className="col-span-2 relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-emerald-500" />
              <textarea
                rows={3}
                placeholder="Description"
                className="w-full pl-10 bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all resize-none"
              />
            </div>
          </div>

        </div>

        <div className="flex items-center justify-center mt-6 pt-4 border-t border-emerald-50">
          <button
            type="button"
            className="px-10 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddAssets
