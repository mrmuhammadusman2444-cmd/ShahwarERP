import React from 'react'

const MainCategoryPopup = ({setShowPopup}) => {
 return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
 
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 w-full max-w-xl">
 
          <div className="flex items-center justify-between px-5 py-4 border-b border-blue-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h2 className="text-gray-800 text-sm font-bold">Add Category</h2>
                <p className="text-gray-400 text-xs">Create a new Main category</p>
              </div>
            </div>
            <button onClick={()=>{setShowPopup(false)}} 
              type="button"
              className="cursor-pointer w-8 h-8 rounded-lg bg-blue-50 hover:bg-red-50 hover:text-red-500 text-gray-400 flex items-center justify-center transition-all"
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
                type="text"
                placeholder="Enter category name..."
                className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3.5 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
 
           
 
            {/* Description */}
            <div>
              <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Enter category description..."
                className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3.5 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all resize-none"
              />
            </div>
 
            {/* Status */}
            <div>
              <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Status</label>
              <div className="flex gap-2">
                <label className="flex-1 flex items-center gap-2 bg-blue-50 border border-blue-100 hover:border-blue-300 rounded-xl px-4 py-2.5 cursor-pointer transition-all">
                  <input type="radio" name="status" value="active" defaultChecked
                    className="w-3.5 h-3.5 accent-blue-600 cursor-pointer" />
                  <span className="text-gray-700 text-sm font-medium">Active</span>
                </label>
                <label className="flex-1 flex items-center gap-2 bg-blue-50 border border-blue-100 hover:border-blue-300 rounded-xl px-4 py-2.5 cursor-pointer transition-all">
                  <input type="radio" name="status" value="inactive"
                    className="w-3.5 h-3.5 accent-blue-600 cursor-pointer" />
                  <span className="text-gray-700 text-sm font-medium">Inactive</span>
                </label>
              </div>
            </div>
 
          </div>
 
          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-blue-50">
            <button  onClick={()=>{setShowPopup(false)}} 
              type="button"
              className="cursor-pointer px-5 py-2.5 bg-white border border-blue-200 hover:bg-blue-50 text-blue-600 text-sm font-semibold rounded-xl transition-all">
              Cancel
            </button>
            <button
              type="button"
              className="cursor-pointer px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5 active:translate-y-0">
              Save Category
            </button>
          </div>
 
        </div>
      </div>
    </>
  );
}

export default MainCategoryPopup
