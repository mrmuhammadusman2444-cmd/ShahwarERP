import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UnitPopup = ({ setUnitPopup, handleFind }) => {

    let [Unit, setUnit] = useState({
        unitName: '',
        shortCode: '',
        Description: ''
    })

    async function handleUnit() {
        try {
            let res = await axios.post('http://localhost:3000/unit', Unit)
            console.log(res.data)
            handleFind()
            setUnitPopup(false)
        } catch (err) {
            console.log("ADD UNIT FAILED:", err.response?.data || err.message)
        }
    }





    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">

            <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 w-full max-w-md">

                <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-50">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-sm shadow-emerald-200">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-gray-800 text-sm font-bold">Add Unit</h2>
                            <p className="text-gray-400 text-xs">Create a new unit</p>
                        </div>
                    </div>
                    <button onClick={() => { setUnitPopup(false) }}
                        type="button"
                        className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-400 transition-all cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-5 py-5 flex flex-col gap-4">

                    {/* Unit Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-gray-700 text-sm font-semibold">
                            Unit Name <span className="text-red-400">*</span>
                        </label>
                        <input onChange={(e) => { setUnit({ ...Unit, unitName: e.target.value }) }}
                            type="text"
                            placeholder="Enter unit name..."
                            className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-gray-700 text-sm font-semibold">Short Code</label>
                        <input onChange={(e) => { setUnit({ ...Unit, shortCode: e.target.value }) }}
                            type="text"
                            placeholder="e.g. PCS, KG, CTN..."
                            className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-gray-700 text-sm font-semibold">Description</label>
                        <textarea onChange={(e) => { setUnit({ ...Unit, Description: e.target.value }) }}
                            rows={3}
                            placeholder="Enter description..."
                            className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all resize-none"
                        />
                    </div>

                </div>

                <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-emerald-50">
                    <button onClick={() => { setUnitPopup(false) }}
                        type="button"
                        className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button onClick={handleUnit}
                        type="button"
                        className="px-6 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                        Save Unit
                    </button>
                </div>

            </div>

        </div>
    );
}

export default UnitPopup
