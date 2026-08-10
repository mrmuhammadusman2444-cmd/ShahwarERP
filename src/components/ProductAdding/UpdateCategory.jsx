import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const UpdateCategory = ({ setCategoryUpdatePopup, editCategoryData, handleFindCategory }) => {
    const [formData, setFormData] = useState({
        _id: '',
        CategoryName: '',
        Description: '',
        Status: 'Active',
    })

    useEffect(() => {
        if (editCategoryData) {
            setFormData({
                _id: editCategoryData._id || '',
                CategoryName: editCategoryData.CategoryName || '',
                Description: editCategoryData.Description || '',
                Status: editCategoryData.Status || 'Active',
            })
        }
    }, [editCategoryData])

    async function handleUpdateCategory() {
        try {
            await axios.post('http://localhost:3000/update/category', formData)
            toast.success('Category Updated Successfully', { position: 'bottom-right', autoClose: 800 })
            handleFindCategory()
            setCategoryUpdatePopup(false)
        } catch (err) {
            console.log("UPDATE FAILED:", err.response?.data || err.message)
            toast.error('Something went wrong', { position: 'bottom-right', autoClose: 800 })
        }
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">

                <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 w-full max-w-xl">

                    <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-gray-800 text-sm font-bold">Edit Category</h2>
                                <p className="text-gray-400 text-xs">Update product category</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setCategoryUpdatePopup(false)}
                            className="cursor-pointer w-8 h-8 rounded-lg bg-emerald-50 hover:bg-red-50 hover:text-red-500 text-gray-400 flex items-center justify-center transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-5 flex flex-col gap-4">

                        <div>
                            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                                Category Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                value={formData.CategoryName}
                                onChange={(e) => setFormData({ ...formData, CategoryName: e.target.value })}
                                type="text"
                                placeholder="Enter category name..."
                                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3.5 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                                Description
                            </label>
                            <textarea
                                value={formData.Description}
                                onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
                                rows={3}
                                placeholder="Enter category description..."
                                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3.5 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all resize-none"
                            />
                        </div>

                        <div>
                            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Status</label>
                            <div className="flex gap-2">
                                <label className="flex-1 flex items-center gap-2 bg-emerald-50 border border-emerald-100 hover:border-emerald-300 rounded-xl px-4 py-2.5 cursor-pointer transition-all">
                                    <input
                                        type="radio" name="status" value="Active"
                                        checked={formData.Status === "Active"}
                                        onChange={(e) => setFormData({ ...formData, Status: e.target.value })}
                                        className="w-3.5 h-3.5 accent-emerald-600 cursor-pointer" />
                                    <span className="text-gray-700 text-sm font-medium">Active</span>
                                </label>
                                <label className="flex-1 flex items-center gap-2 bg-emerald-50 border border-emerald-100 hover:border-emerald-300 rounded-xl px-4 py-2.5 cursor-pointer transition-all">
                                    <input
                                        type="radio" name="status" value="Inactive"
                                        checked={formData.Status === "Inactive"}
                                        onChange={(e) => setFormData({ ...formData, Status: e.target.value })}
                                        className="w-3.5 h-3.5 accent-emerald-600 cursor-pointer" />
                                    <span className="text-gray-700 text-sm font-medium">Inactive</span>
                                </label>
                            </div>
                        </div>

                    </div>

                    <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-emerald-50">
                        <button
                            type="button"
                            onClick={() => setCategoryUpdatePopup(false)}
                            className="cursor-pointer px-5 py-2.5 bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-600 text-sm font-semibold rounded-xl transition-all">
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleUpdateCategory}
                            className="cursor-pointer px-6 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0">
                            Save Changes
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default UpdateCategory