import React from 'react'

const AddEmployee = () => {
 return (
    <div className="p-4 md:p-5">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">HRM</h1>
            <p className="text-gray-400 text-xs">Add Employee</p>
          </div>
        </div>
       
      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-6">

        <h2 className="text-gray-700 text-sm font-bold mb-5 pb-3 border-b border-emerald-50">Add Employee</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              First Name <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2">
              <input
                type="text"
                placeholder="First Name"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Last Name <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Last Name"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Designation <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2">
              <select className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select option</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Phone <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Phone"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">Rate Type</label>
            <div className="col-span-2">
              <select className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select option</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">Houre Rate/Salary</label>
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Houre Rate/Salary"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">Email</label>
            <div className="col-span-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">Blood Group</label>
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Blood Group"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-start gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right pt-2.5">Address Line 1</label>
            <div className="col-span-2">
              <textarea
                rows={3}
                placeholder="Address Line 1"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-start gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right pt-2.5">Address Line 2</label>
            <div className="col-span-2">
              <textarea
                rows={3}
                placeholder="Address Line 2"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">Picture</label>
            <div className="col-span-2">
              <input
                type="file"
                accept="image/*"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 rounded-xl px-3 py-2 text-gray-700 text-sm focus:outline-none transition-all cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">Country</label>
            <div className="col-span-2">
              <select className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select option</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">City</label>
            <div className="col-span-2">
              <input
                type="text"
                placeholder="City"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">Zip Code</label>
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Zip code"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-emerald-50">
          <button
            type="button"
            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Reset
          </button>
          <button
            type="button"
            className="px-8 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddEmployee
