import React, { useState, useEffect } from 'react'
import UnitPopup from './UnitPopup.jsx';
import axios from 'axios'
import { toast } from 'react-toastify'



const Unit = () => {
    const [unitPopup, setUnitPopup] = useState(false)

    const [findUnit, setFindUnit] = useState([])
    async function handleFind() {

        let res = await axios.get('http://localhost:3000/find/unit')
        setFindUnit(res.data.find)

    }
    useEffect(() => { handleFind() }, [])

    async function handleDeleteUnit(id) {
        let res = await axios.post('http://localhost:3000/delete/unit', { _id: id })
        toast.success('Unit Deleted Successfully', { position: 'bottom-right', autoClose: 800 })
        handleFind()
    }

    return (

        <div className="p-4 md:p-5">

            {
                unitPopup == true ? <UnitPopup setUnitPopup={setUnitPopup} handleFind={handleFind} /> : null
            }



            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-gray-800 text-lg font-bold">Unit</h1>
                        <p className="text-gray-400 text-xs">Category</p>
                    </div>
                </div>

            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <button className="flex items-center gap-2 px-4 cursor-pointer py-2 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    Manage Unit
                </button>
                <button onClick={() => { setUnitPopup(true) }} className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Unit
                </button>
                <button className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Category CSV Upload
                </button>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">

                <div className="px-5 py-3 border-b border-emerald-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Show</span>
                            <select className="bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1.5 text-gray-600 text-xs focus:outline-none focus:border-emerald-400 transition-all">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                            <span>entries</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            {[
                                { label: "Copy", bg: "bg-slate-500  hover:bg-slate-600" },
                                { label: "CSV", bg: "bg-green-500  hover:bg-green-600" },
                                { label: "Excel", bg: "bg-emerald-600 hover:bg-emerald-700" },
                                { label: "PDF", bg: "bg-red-500    hover:bg-red-600" },
                                { label: "Print", bg: "bg-emerald-500   hover:bg-emerald-600" },
                            ].map((btn) => (
                                <button key={btn.label}
                                    className={`${btn.bg} text-white cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors`}>
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 focus-within:border-emerald-400 transition-all">
                        <svg className="w-3.5 h-3.5 text-emerald-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" placeholder="Search..."
                            className="bg-transparent text-xs text-gray-600 placeholder-gray-400 focus:outline-none w-36" />
                    </div>
                </div>

                <div className="overflow-x-auto overflow-y-auto custom-scrollbar rounded-lg border border-emerald-100" style={{ maxHeight: "28rem" }}>
                    <table className="w-full text-sm border-collapse">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-emerald-600 text-white">
                                <th className="text-center text-xs font-semibold px-6 py-3 w-full">
                                    <div className="flex items-center justify-center gap-1">
                                        Unit Name
                                        <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="text-center text-xs font-semibold px-6 py-3 whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-1">
                                        Action
                                        <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {findUnit.length === 0 ? (
                                <tr>
                                    <td colSpan={2} className="text-center py-20">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                                                <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-500 text-sm font-medium">No unit found</p>
                                            <p className="text-gray-400 text-xs">Add some units to get started</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                findUnit.map((unit, idx) => {
                                    const tone = [
                                        "from-emerald-400 to-emerald-600",
                                        "from-sky-400 to-sky-600",
                                        "from-amber-400 to-amber-600",
                                        "from-violet-400 to-violet-600",
                                        "from-rose-400 to-rose-600",
                                    ][idx % 5]

                                    const initial = (unit.unitName || "?").trim().charAt(0).toUpperCase()

                                    return (
                                        <tr
                                            key={unit._id}
                                            className={`group cursor-pointer transition-all duration-200 hover:bg-blue-50/60 hover:shadow-sm ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                                                }`}
                                        >
                                            <td className="px-6 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-400 text-[10px] font-bold group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                                                        {idx + 1}
                                                    </span>
                                                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${tone} text-white text-sm font-bold shadow-sm ring-2 ring-white`}>
                                                        {initial}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-gray-700 text-sm font-semibold">{unit.unitName}</span>
                                                        {unit.shortCode && (
                                                            <span className="text-gray-400 text-xs">Code: {unit.shortCode}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <div className="flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="w-7 h-7 bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white hover:scale-110 active:scale-95 rounded-lg flex items-center justify-center transition-all cursor-pointer" title="Edit">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button onClick={() => handleDeleteUnit(unit._id)} className="w-7 h-7 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 active:scale-95 rounded-lg flex items-center justify-center transition-all cursor-pointer" title="Delete">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-5 py-3 border-t border-emerald-50 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/30">
                    <p className="text-gray-400 text-xs">Showing {findUnit.length === 0 ? 0 : 1} to {findUnit.length} of {findUnit.length} entries </p>
                    <div className="flex items-center gap-1">
                        <button className="px-3 py-1.5 text-xs text-gray-400 bg-white border border-emerald-100 rounded-lg hover:border-emerald-300 hover:text-emerald-600 transition-all">
                            Previous
                        </button>
                        <button className="px-3 py-1.5 text-xs text-white bg-emerald-600 rounded-lg">1</button>
                        <button className="px-3 py-1.5 text-xs text-gray-400 bg-white border border-emerald-100 rounded-lg hover:border-emerald-300 hover:text-emerald-600 transition-all">
                            Next
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Unit
