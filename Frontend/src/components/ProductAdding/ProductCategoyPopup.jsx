import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const ProductCategoyPopup = () => {

  let [Category, setCategory] = useState({
    CategoryName: '',
    Description: '',
    Status: 'Active'
  })

  async function handleCategory() {

    await axios.post('http://localhost:3000/product/category', Category)
    handleFindCategory()
    setCategoryPopup(false)

  }






  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">

        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 w-full max-w-xl">

          <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h2 className="text-gray-800 text-sm font-bold">Add Category</h2>
                <p className="text-gray-400 text-xs">Create a new product category</p>
              </div>
            </div>
            <button onClick={() => { setCategoryPopup(false) }}
              type="button"
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
                onChange={(e) => {
                  setCategory({ ...Category, CategoryName: e.target.value })
                }}
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
                onChange={(e) => {
                  setCategory({ ...Category, Description: e.target.value })
                }}
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
                    onChange={(e) => setCategory({ ...Category, Status: e.target.value })}
                    type="radio" name="status" value="Active" defaultChecked
                    className="w-3.5 h-3.5 accent-emerald-600 cursor-pointer" />
                  <span className="text-gray-700 text-sm font-medium">Active</span>
                </label>
                <label className="flex-1 flex items-center gap-2 bg-emerald-50 border border-emerald-100 hover:border-emerald-300 rounded-xl px-4 py-2.5 cursor-pointer transition-all">
                  <input
                    onChange={(e) => setCategory({ ...Category, Status: e.target.value })}
                    type="radio" name="status" value="Inactive"
                    className="w-3.5 h-3.5 accent-emerald-600 cursor-pointer" />
                  <span className="text-gray-700 text-sm font-medium">Inactive</span>
                </label>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-emerald-50">
            <button onClick={() => { setCategoryPopup(false) }}
              type="button"
              className="cursor-pointer px-5 py-2.5 bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-600 text-sm font-semibold rounded-xl transition-all">
              Cancel
            </button>
            <button
              onClick={() => { handleCategory(); setCategoryPopup(false); }}
              type="button"
              className="cursor-pointer px-6 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0">
              Save Category
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default ProductCategoyPopup
