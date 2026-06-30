import { useNavigate } from "react-router-dom";
import {Users, Plus, Copy, FileText, Sheet, File, Printer, Search, ArrowUpDown, ChevronLeft, ChevronRight} from "lucide-react";

const ManageCustomers = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 p-4 md:p-6">


      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-gray-800 text-xl font-bold">Manage Customers</h1>
            <p className="text-gray-400 text-xs">Manage your Customers</p>
          </div>
        </div>

        <button onClick={() => { navigate('/newcustomer') }} className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white  shadow-blue-200 shadow-md text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-blue-200 transition-all cursor-pointer">
          <Plus className="w-4 h-4" />
          New Customer
        </button>

      </div>


      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-5">


        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">


          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">Show</span>
              <select className="bg-blue-50 border border-blue-100 rounded-lg px-2 py-1.5 text-gray-700 text-sm focus:outline-none focus:border-blue-400 cursor-pointer">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span className="text-gray-500 text-sm">entries</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button className="flex items-center gap-1.5 bg-gray-700 hover:bg-gray-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
              <button className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                <FileText className="w-3.5 h-3.5" /> CSV
              </button>
              <button className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                <Sheet className="w-3.5 h-3.5" /> Excel
              </button>
              <button className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                <File className="w-3.5 h-3.5" /> PDF
              </button>
              <button className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
            </div>
          </div>


          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none transition-all w-52 cursor-text"
            />
          </div>
        </div>


        <div className="overflow-x-auto rounded-xl border border-blue-100 h-115">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide rounded-tl-xl">SL</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">
                  <button className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer">
                    Customer Name <ArrowUpDown className="w-3.5 h-3.5" />
                  </button>
                </th>
                <th className="text-left px-4 py-3 font-semibold text-xs  tracking-wide">Distributor Name</th>
                <th className="text-left px-4 py-3 font-semibold text-xs  tracking-wide">Route Name</th>
                <th className="text-left px-4 py-3 font-semibold text-xs  tracking-wide">Address</th>
                <th className="text-left px-4 py-3 font-semibold text-xs  tracking-wide">Mobile No</th>
                <th className="text-left px-4 py-3 font-semibold text-xs  tracking-wide">Balance</th>

                <th className="text-left px-4 py-3 font-semibold text-xs  tracking-wide rounded-tr-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-3 ml-15 mt-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <Users className="w-7 h-7 text-blue-200" />
                    </div>
                    <p className="text-gray-500 text-sm font-medium">No customer recode found</p>
                    <p className="text-gray-400 text-xs">Click new customer</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
          <p className="text-gray-400 text-xs">Showing 0 to 0 of 0 entries</p>
          <div className="flex items-center gap-1.5">
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </button>
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center cursor-pointer">1</button>
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageCustomers;