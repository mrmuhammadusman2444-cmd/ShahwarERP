import React, { useState } from 'react'
import axios from 'axios'
import ImageCropModal from './ImageCropModal.jsx'
import { X, User, Save, Loader2, Check } from 'lucide-react'

const EmployeeUpdatePopup = ({ setShowUpdatePopup, updateData, handleFetchAllEmployee }) => {
    const [cropImage, setCropImage] = useState(null)
    const [showCrop, setShowCrop] = useState(false)

    const [employee, setEmployee] = useState({
        firstName: updateData.firstName || "",
        lastName: updateData.lastName || "",
        designation: updateData.designation || "",
        phone: updateData.phone || "",
        rateType: updateData.rateType || "",
        hourRateSalary: updateData.hourRateSalary || "",
        email: updateData.email || "",
        bloodGroup: updateData.bloodGroup || "",
        addressLine1: updateData.addressLine1 || "",
        addressLine2: updateData.addressLine2 || "",
        city: updateData.city || "",
        zipCode: updateData.zipCode || "",
        picture: updateData.picture || null,
    })

    const [status, setStatus] = useState("idle")


    async function handleUpdate() {
        setStatus("saving")
        try {
            const formData = new FormData()
            formData.append("firstName", employee.firstName)
            formData.append("lastName", employee.lastName)
            formData.append("designation", employee.designation)
            formData.append("phone", employee.phone)
            formData.append("rateType", employee.rateType)
            formData.append("hourRateSalary", employee.hourRateSalary)
            formData.append("email", employee.email)
            formData.append("bloodGroup", employee.bloodGroup)
            formData.append("addressLine1", employee.addressLine1)
            formData.append("addressLine2", employee.addressLine2)
            formData.append("city", employee.city)
            formData.append("zipCode", employee.zipCode)

            if (employee.picture && typeof employee.picture !== "string") {
                formData.append(updateData.isUser ? "image" : "picture", employee.picture)
            }

            console.log("UPDATING:", updateData._id, "isUser:", updateData.isUser)

            if (updateData.isUser) {
                // USER — PUT route
                await axios.put(`http://localhost:3000/update/user/${updateData._id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
            } else {
                // EMPLOYEE — POST route
                await axios.post(`http://localhost:3000/update/employee/${updateData._id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
            }

            setStatus("saved")
            if (handleFetchAllEmployee) handleFetchAllEmployee()
            setTimeout(() => setShowUpdatePopup(false), 800)
        } catch (err) {
            console.log("UPDATE FAILED:", err.response?.data || err.message)
            setStatus("idle")
        }
    }

    const field = (label, key, type = "text", placeholder = "") => (
        <div>
            <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">{label}</label>
            <input
                type={type}
                value={employee[key]}
                onChange={(e) => setEmployee({ ...employee, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
            />
        </div>
    )

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

                {/* header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-linear-to-r from-emerald-50 to-white shrink-0">
                    <div className="flex items-center gap-3">
                        {updateData.picture ? (
                            <img
                                src={`http://localhost:3000${updateData.picture}`}
                                alt=""
                                className="w-10 h-10 rounded-xl object-cover shadow-md shadow-emerald-200"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                                <User className="w-5 h-5 text-white" />
                            </div>
                        )}
                        <div>
                            <h3 className="text-gray-800 text-base font-bold">Update Employee</h3>
                            <p className="text-gray-400 text-xs">Edit the employee details below</p>
                        </div>
                    </div>
                    <button onClick={() => setShowUpdatePopup(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <X className="w-4.5 h-4.5 text-gray-500" />
                    </button>
                </div>

                {/* body */}
                <div className="overflow-y-auto flex-1 px-5 py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {field("First Name", "firstName", "text", "First name")}
                        {field("Last Name", "lastName", "text", "Last name")}
                        {field("Designation", "designation", "text", "e.g. Stock Manager")}
                        {field("Phone", "phone", "text", "Phone number")}

                        <div>
                            <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">Rate Type</label>
                            <select
                                value={employee.rateType}
                                onChange={(e) => setEmployee({ ...employee, rateType: e.target.value })}
                                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer"
                            >
                                <option value="">Select option</option>
                                <option value="Full Time">Full Time</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">Hour Rate / Salary</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">Rs.</span>
                                <input
                                    type="number"
                                    value={employee.hourRateSalary}
                                    onChange={(e) => setEmployee({ ...employee, hourRateSalary: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl pl-9 pr-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
                                />
                            </div>
                        </div>


                        {field("Email", "email", "email", "Email")}

                        <div>
                            <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">Blood Group</label>
                            <select
                                value={employee.bloodGroup}
                                onChange={(e) => setEmployee({ ...employee, bloodGroup: e.target.value })}
                                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer"
                            >
                                <option value="">Select option</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        {field("City", "city", "text", "City")}
                        {field("Zip Code", "zipCode", "text", "Zip code")}

                        <div className="sm:col-span-2">
                            <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">Address Line 1</label>
                            <textarea
                                value={employee.addressLine1}
                                onChange={(e) => setEmployee({ ...employee, addressLine1: e.target.value })}
                                rows={2}
                                placeholder="Address line 1"
                                className="w-full resize-none bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">Address Line 2</label>
                            <textarea
                                value={employee.addressLine2}
                                onChange={(e) => setEmployee({ ...employee, addressLine2: e.target.value })}
                                rows={2}
                                placeholder="Address line 2"
                                className="w-full resize-none bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">Picture</label>
                            <div className="flex items-center gap-4">
                                {/* preview */}
                                <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 flex items-center justify-center overflow-hidden shrink-0">
                                    {employee.picture ? (
                                        <img
                                            src={typeof employee.picture === "string" ? `http://localhost:3000${employee.picture}` : URL.createObjectURL(employee.picture)}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <svg className="w-8 h-8 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </div>

                                {/* upload button */}
                                <div className="flex-1">
                                    <label className="cursor-pointer inline-flex items-center gap-2 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-semibold rounded-lg px-4 py-2 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        Change Photo
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
                </div>


                {/* footer */}
                <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50/40 shrink-0">
                    <button onClick={() => setShowUpdatePopup(false)} className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-semibold rounded-xl transition-all cursor-pointer">
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={status !== "idle"}
                        className={`flex items-center gap-2 px-6 py-2.5 text-white text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer disabled:cursor-not-allowed ${status === "saved" ? "bg-emerald-500 shadow-emerald-200" : "bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-emerald-200"}`}
                    >
                        {status === "idle" && (<><Save size={15} /> Update Employee</>)}
                        {status === "saving" && (<><Loader2 size={15} className="animate-spin" /> Saving...</>)}
                        {status === "saved" && (<><Check size={15} strokeWidth={3} /> Updated!</>)}
                    </button>
                </div>

            </div>
            {showCrop && cropImage && (
                <ImageCropModal
                    imageSrc={cropImage}
                    onCancel={() => { setShowCrop(false); setCropImage(null) }}
                    onCropDone={(croppedFile) => {
                        setEmployee({ ...employee, picture: croppedFile })
                        setShowCrop(false)
                        setCropImage(null)
                    }}
                />
            )}
        </div>

    )
}

export default EmployeeUpdatePopup