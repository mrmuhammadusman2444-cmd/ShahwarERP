import { useNavigate } from "react-router-dom";




const NewCustomer = () => {



  const navigate = useNavigate()

  return (
    <div className="p-4 md:p-5">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">Add New Customer</h1>
            <p className="text-gray-400 text-xs">Fill in the customer details below</p>
          </div>
        </div>

      </div>

      <div className="flex flex-col xl:flex-row gap-4 items-start">

        <div className="flex-1 min-w-0 bg-white border border-blue-100 rounded-2xl shadow-sm p-5 flex flex-col gap-5">

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-linear-to-b from-blue-500 to-blue-700 rounded-full" />
              <h2 className="text-gray-700 text-xs font-bold uppercase tracking-widest">Basic Information</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">

              <div className="col-span-2">
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1">
                  Customer Name <span className="text-red-400">*</span>
                </label>
                <input type="text" placeholder="Enter customer name..."
                  className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
              </div>

              <div>
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1">
                  Email <span className="text-red-400">*</span>
                </label>
                <input type="email" placeholder="customer@email.com"
                  className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
              </div>

              <div>
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1">
                  Phone No <span className="text-red-400">*</span>
                </label>
                <input type="tel" placeholder="03xx-xxxxxxx"
                  className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
              </div>

              <div>
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1">Warehouse</label>
                <select className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                  <option value="">Select warehouse</option>
                  <option>Main Warehouse</option>
                  <option>Warehouse A</option>
                  <option>Warehouse B</option>
                  <option>Warehouse C</option>
                </select>
              </div>

              <div>
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1">Amount Limit</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">Rs.</span>
                  <input type="number" placeholder="0.00"
                    className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl pl-9 pr-3 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
                </div>
              </div>

            </div>
          </div>

          <div className="border-t border-blue-50" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-linear-to-b from-blue-500 to-blue-700 rounded-full" />
              <h2 className="text-gray-700 text-xs font-bold uppercase tracking-widest">Rate & Scheme</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">

              <div className="col-span-2 sm:col-span-1">
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1">
                  Customer Product Rate <span className="text-red-400">*</span>
                </label>
                <select className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                  <option value="">Select rate type</option>
                  <option value="distributor">Distributor Rate</option>
                  <option value="dealer">Dealer Rate</option>
                  <option value="retail">Retail Rate</option>
                </select>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1">Scheme</label>
                <div className="flex gap-2">
                  <label className="flex-1 flex items-center gap-2 bg-blue-50 border border-blue-100 hover:border-blue-300 rounded-xl px-3 py-2 cursor-pointer transition-all">
                    <input type="radio" name="scheme" value="yes"
                      className="w-3.5 h-3.5 accent-blue-600 cursor-pointer" />
                    <span className="text-gray-700 text-sm font-medium">Yes</span>
                  </label>
                  <label className="flex-1 flex items-center gap-2 bg-blue-50 border border-blue-100 hover:border-blue-300 rounded-xl px-3 py-2 cursor-pointer transition-all">
                    <input type="radio" name="scheme" value="no"
                      className="w-3.5 h-3.5 accent-blue-600 cursor-pointer" />
                    <span className="text-gray-700 text-sm font-medium">No</span>
                  </label>
                </div>
              </div>

            </div>
          </div>

          <div className="border-t border-blue-50" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-linear-to-b from-blue-500 to-blue-700 rounded-full" />
              <h2 className="text-gray-700 text-xs font-bold uppercase tracking-widest">Credits</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">

              <div>
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1">Customer Credits</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">Rs.</span>
                  <input type="number" placeholder="0.00"
                    className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl pl-9 pr-3 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1">Previous Credits Balance</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">Rs.</span>
                  <input type="number" placeholder="0.00"
                    className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl pl-9 pr-3 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className="w-full xl:w-52 shrink-0 flex flex-col gap-4 sticky top-4">

          <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-4 flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-gray-700 text-sm font-semibold">New Customer</p>
              <p className="text-gray-400 text-xs mt-0.5">Fill in details on the left</p>
            </div>

            <div className="w-full border-t border-blue-50 pt-3 flex flex-col gap-2">
              {[
                { label: "Rate Type", value: "Not set" },
                { label: "Scheme", value: "Not set" },
                { label: "Warehouse", value: "Not set" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{item.label}</span>
                  <span className="text-gray-500 text-xs font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-4 flex flex-col gap-2.5">
            <p className="text-gray-400 text-xs flex items-center gap-1">
              <span className="text-red-400 font-bold">*</span> Required fields must be filled
            </p>
            <button type="button"
              className="w-full py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 cursor-pointer text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5 active:translate-y-0">
              Save Customer
            </button>
            <button onClick={() => { navigate('/manageCustomer') }} type="button"
              className="w-full py-2 bg-white border border-blue-200 hover:bg-blue-50 text-blue-600 text-sm cursor-pointer font-semibold rounded-xl transition-all">
              Manage Customer
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default NewCustomer;