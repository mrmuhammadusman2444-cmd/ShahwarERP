import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ImageCropModal from './ImageCropModal.jsx'


const AddEmployee = () => {
  const [cropImage, setCropImage] = useState(null)
  const [showCrop, setShowCrop] = useState(false)
  const [Employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    phone: "",
    rateType: "",
    hourRateSalary: "",
    email: "",
    bloodGroup: "",
    addressLine1: "",
    addressLine2: "",
    picture: null,
    country: "",
    city: "",
    zipCode: ""
  });

  function handleReset() {
    setEmployee({
      firstName: "",
      lastName: "",
      designation: "",
      phone: "",
      rateType: "",
      hourRateSalary: "",
      email: "",
      bloodGroup: "",
      addressLine1: "",
      addressLine2: "",
      picture: null,
      country: "",
      city: "",
      zipCode: ""
    })
  }




  async function handleAddEmployee() {
    try {
      const formData = new FormData()
      formData.append("firstName", Employee.firstName)
      formData.append("lastName", Employee.lastName)
      formData.append("designation", Employee.designation)
      formData.append("phone", Employee.phone)
      formData.append("rateType", Employee.rateType)
      formData.append("hourRateSalary", Employee.hourRateSalary)
      formData.append("email", Employee.email)
      formData.append("bloodGroup", Employee.bloodGroup)
      formData.append("addressLine1", Employee.addressLine1)
      formData.append("addressLine2", Employee.addressLine2)
      formData.append("city", Employee.city)
      formData.append("zipCode", Employee.zipCode)
      if (Employee.picture) {
        formData.append("picture", Employee.picture)
      }

      let res = await axios.post('http://localhost:3000/add/new/employee', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      console.log("SAVED:", res.data)
    } catch (err) {
      console.log("SAVE FAILED:", err.response?.data || err.message)
    }
  }






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
                value={Employee.firstName}
                onChange={(e) => { setEmployee({ ...Employee, firstName: e.target.value }) }}
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
                value={Employee.lastName}
                onChange={(e) => { setEmployee({ ...Employee, lastName: e.target.value }) }}
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
              <select value={Employee.designation} onChange={(e) => { setEmployee({ ...Employee, designation: e.target.value }) }} className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select option</option>
                <option value="Stock Manager">Stock Manager</option>
                <option value="Godam Manager">Godam Manager</option>
                <option value="Raw Material Stock manage">Raw Material Stock manager</option>

              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Phone <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2">
              <input
                value={Employee.phone}
                onChange={(e) => { setEmployee({ ...Employee, phone: e.target.value }) }}
                type="text"
                placeholder="Phone"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">Rate Type</label>
            <div className="col-span-2">
              <select value={Employee.rateType} onChange={(e) => { setEmployee({ ...Employee, rateType: e.target.value }) }} className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select option</option>
                <option value="Full Time">Full Time</option>

              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">Houre Rate/Salary</label>
            <div className="col-span-2">
              <input
                value={Employee.hourRateSalary}
                onChange={(e) => { setEmployee({ ...Employee, hourRateSalary: e.target.value }) }}
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
                value={Employee.email}
                onChange={(e) => { setEmployee({ ...Employee, email: e.target.value }) }}
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
                value={Employee.bloodGroup}
                onChange={(e) => { setEmployee({ ...Employee, bloodGroup: e.target.value }) }}
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
                value={Employee.addressLine1}
                onChange={(e) => { setEmployee({ ...Employee, addressLine1: e.target.value }) }}
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
                value={Employee.addressLine2}
                onChange={(e) => { setEmployee({ ...Employee, addressLine2: e.target.value }) }}
                rows={3}
                placeholder="Address Line 2"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-start gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right pt-2">Picture</label>
            <div className="col-span-2">
              <div className="flex items-center gap-4">

                <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 flex items-center justify-center overflow-hidden shrink-0">
                  {Employee.picture ? (
                    <img
                      src={typeof Employee.picture === "string" ? `http://localhost:3000${Employee.picture}` : URL.createObjectURL(Employee.picture)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-8 h-8 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>

                <div className="flex-1">
                  <label className="cursor-pointer inline-flex items-center gap-2 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-semibold rounded-lg px-4 py-2 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload Photo
                    <input
                      onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) {
                          setCropImage(URL.createObjectURL(file))
                          setShowCrop(true)
                        }
                        e.target.value = ""
                      }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-gray-400 mt-1.5">PNG, JPG up to 5MB</p>
                </div>

              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">Country</label>
            <div className="col-span-2">
              <select value={Employee.country} onChange={(e) => { setEmployee({ ...Employee, country: e.target.value }) }} className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select option</option>
                <option value="Pakistan">Pakistan</option>

              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">City</label>
            <div className="col-span-2">
              <input
                value={Employee.city}
                onChange={(e) => { setEmployee({ ...Employee, city: e.target.value }) }}
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
                value={Employee.zipCode}
                onChange={(e) => { setEmployee({ ...Employee, zipCode: e.target.value }) }}
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
            onClick={handleReset}
            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
            Reset
          </button>
          <button
            onClick={handleAddEmployee}
            type="button"
            className="px-8 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Save
          </button>
        </div>

      </div>
      {showCrop && cropImage && (
        <ImageCropModal
          imageSrc={cropImage}
          onCancel={() => { setShowCrop(false); setCropImage(null) }}
          onCropDone={(croppedFile) => {
            setEmployee({ ...Employee, picture: croppedFile })
            setShowCrop(false)
            setCropImage(null)
          }}
        />
      )}
    </div>

  );
}

export default AddEmployee
