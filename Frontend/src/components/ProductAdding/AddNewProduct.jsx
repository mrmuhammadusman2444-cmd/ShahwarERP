const AddProduct = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 p-4 md:p-6">

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-xl font-bold">Add New Product</h1>
            <p className="text-gray-400 text-xs">Fill in the details to add a new product</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">


        </div>
      </div>

      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-6">

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-6 mb-8 pb-8 border-b border-blue-50">

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-linear-to-b from-blue-500 to-blue-700 rounded-full" />
              <h2 className="text-gray-700 text-sm font-bold uppercase tracking-wide">Basic Information</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">

              <div className="col-span-2">
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                  Product Name <span className="text-red-400">*</span>
                </label>
                <input type="text" placeholder="Enter product name..."
                  className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
              </div>

              <div>
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Carton Size</label>
                <input type="number" placeholder="e.g. 12"
                  className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
              </div>

              <div>
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Weight</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="500"
                    className="flex-1 min-w-0 bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
                  <select className="w-16 bg-blue-50 border border-blue-100 focus:border-blue-400 rounded-xl px-2 py-2.5 text-gray-600 text-sm focus:outline-none appearance-none cursor-pointer">
                    <option>g</option><option>kg</option><option>ml</option><option>L</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Model</label>
                <input type="text" placeholder="Enter model..."
                  className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
              </div>

              <div>
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Main Category</label>
                <select className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                  <option value="">Select category</option>
                  <option>Zaiqa Recipe Bucket's 5kg/10kg</option>
                  <option>Tea Pouch and Bag's</option>
                  <option>Shahwar Syrup</option>
                  <option>Spices Box (Shahwar)</option>
                  <option>Shahwar Sachet Mix Rs.50</option>
                  <option>Shahwar Pouch Mix</option>
                  <option>Shahwar Mix</option>
                  <option>Custard Boxes</option>
                  <option>Shahwar Juices</option>
                  <option>Salan Masala Bucket's 5kg/10kg</option>
                  <option>General Spices</option>
                  <option>Garam Masala Bucket's 5kg/10kg</option>
                  <option>Dessert & Beverage</option>
                </select>
              </div>

              <div>
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Sale / Raw Category</label>
                <select className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                  <option value="">Select category</option>
                  <option>Sale</option>
                  <option>Raw</option>
                </select>
              </div>

            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-linear-to-b from-blue-500 to-blue-700 rounded-full" />
              <h2 className="text-gray-700 text-sm font-bold uppercase tracking-wide">Pricing</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">

              {[
                { label: "Cost Price", required: true },
                { label: "Distributor Price", required: true },
                { label: "Retail Price", required: true },
                { label: "Wholesale Rate", required: false },
                { label: "COD / Online Price", required: false },
                { label: "Unit Scheme Point", required: false, plain: true },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>
                  {field.plain ? (
                    <input type="number" placeholder="0"
                      className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
                  ) : (
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">Rs.</span>
                      <input type="number" placeholder="0.00"
                        className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl pl-9 pr-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
                    </div>
                  )}
                </div>
              ))}

              <div className="col-span-2">
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Store Limit</label>
                <input type="number" placeholder="0"
                  className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
              </div>

            </div>
          </div>
          <div className="flex items-center gap-2 mb-4  w-40">
            <div className="w-1 h-5 bg-linear-to-b from-blue-500 to-blue-700 rounded-full" />
            <h2 className="text-gray-700 text-sm font-bold uppercase tracking-wide">Product Category</h2>
            <select className="w-140 bg-blue-50 border border-blue-100 absolute mt-20  focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
              <option value="">Select category</option>
              <option>Recipe</option>
              <option>Juices</option>
              <option>Beverages</option>

            </select>
          </div>

        </div>

        <div className="flex flex-col xl:flex-row gap-6 items-end ">

          <div className="relative w-72 h-28 rounded-xl border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/40 hover:bg-blue-50 transition-all cursor-pointer flex flex-row items-center justify-center gap-4">
            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" />

            <div className="w-11 h-11 rounded-xl bg-white border border-blue-100 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Click to upload image</p>
              <p className="text-gray-400 text-xs mt-0.5">PNG, JPG — max 5MB</p>
            </div>
            <div className="absolute bottom-2 right-2 w-7 h-7 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md z-20">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          <div className="w-full xl:w-48 shrink-0 flex flex-col gap-3">


            <button className="flex items-center cursor-pointer gap-2 justify-center h-12 w-40 ml-170  px-4 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5">
             
              Save Sale
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AddProduct;