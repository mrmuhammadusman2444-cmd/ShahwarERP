import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import Cropper from 'react-easy-crop'
import { X, Camera, Trash2, User, Mail, Phone, Save, Loader2, Check, ZoomIn } from 'lucide-react'

// ---- helper: cropped area se ek cropped image (blob) banata hai ----
function getCroppedImg(imageSrc, cropPixels) {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.crossOrigin = "anonymous"
        image.src = imageSrc
        image.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = cropPixels.width
            canvas.height = cropPixels.height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(
                image,
                cropPixels.x, cropPixels.y, cropPixels.width, cropPixels.height,
                0, 0, cropPixels.width, cropPixels.height
            )
            canvas.toBlob((blob) => {
                if (!blob) { reject(new Error("Canvas empty")); return }
                resolve(blob)
            }, 'image/jpeg', 0.9)
        }
        image.onerror = reject
    })
}

const ProfileModal = ({ onClose, setShowProfile }) => {
    const stored = JSON.parse(localStorage.getItem("user") || "{}")
    const userId = stored?._id

    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phoneNo: "" })
    const [image, setImage] = useState("")
    const [status, setStatus] = useState("idle")
    const [uploading, setUploading] = useState(false)
    const fileRef = useRef(null)

    // ---- cropper states ----
    const [cropSrc, setCropSrc] = useState(null)   // jo image crop karni hai (data url)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedPixels, setCroppedPixels] = useState(null)

    useEffect(() => {
        async function loadProfile() {
            try {
                let res = await axios.get(`http://localhost:3000/profile/${userId}`)
                setForm({
                    firstName: res.data.firstName || "",
                    lastName: res.data.lastName || "",
                    email: res.data.email || "",
                    phoneNo: res.data.phoneNo || "",
                })
                setImage(res.data.image || "")
            } catch (err) {
                console.log("LOAD PROFILE FAILED:", err.response?.data || err.message)
            }
        }
        if (userId) loadProfile()
    }, [userId])

    async function handleUpdate() {
        setStatus("saving")
        const minDelay = new Promise(r => setTimeout(r, 800))
        try {
            let res = await axios.post(`http://localhost:3000/profile/update/${userId}`, form)
            await minDelay
            let updated = { ...stored, firstName: res.data.firstName, lastName: res.data.lastName, email: res.data.email }
            localStorage.setItem("user", JSON.stringify(updated))
            setStatus("saved")
            setTimeout(() => { setStatus("idle"); onClose(); }, 1000)
        } catch (err) {
            console.log("UPDATE FAILED:", err.response?.data || err.message)
            await minDelay
            setStatus("idle")
        }
    }

    // file choose hote hi — crop screen kholo (upload abhi nahi)
    function handleFileChoose(e) {
        let file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
            setCropSrc(reader.result)   // crop screen khulega
            setCrop({ x: 0, y: 0 })
            setZoom(1)
        }
        reader.readAsDataURL(file)
        e.target.value = ""   // taake same file dobara choose ho sake
    }

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedPixels(croppedAreaPixels)
    }, [])

    // crop confirm — cropped image upload karo
    async function handleCropSave() {
        if (!croppedPixels || !cropSrc) return
        setUploading(true)
        try {
            const blob = await getCroppedImg(cropSrc, croppedPixels)
            let fd = new FormData()
            fd.append('image', blob, 'profile.jpg')
            let res = await axios.post(`http://localhost:3000/profile/image/${userId}`, fd, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            setImage(res.data.image || "")
            // localStorage me bhi image update
            let updated = { ...JSON.parse(localStorage.getItem("user") || "{}"), image: res.data.image }
            localStorage.setItem("user", JSON.stringify(updated))
            setCropSrc(null)
            setUploading(false)
            onClose()
        } catch (err) {
            console.log("IMAGE UPLOAD FAILED:", err.response?.data || err.message)
            setUploading(false)
        }
    }

    async function handleImageRemove() {
        try {
            await axios.post(`http://localhost:3000/profile/image/remove/${userId}`)
            setImage("")
            let updated = { ...JSON.parse(localStorage.getItem("user") || "{}"), image: "" }
            localStorage.setItem("user", JSON.stringify(updated))
        } catch (err) {
            console.log("IMAGE REMOVE FAILED:", err.response?.data || err.message)
        }
    }

    const initial = (form.firstName || "?").charAt(0).toUpperCase()

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

                {/* Header */}
                <div className="relative bg-linear-to-br from-emerald-500 to-emerald-700 px-5 pt-5 pb-14">
                    <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 cursor-pointer transition-colors">
                        <X size={18} />
                    </button>
                    <h2 className="text-white text-base font-bold">My Profile</h2>
                    <p className="text-emerald-100 text-xs">Manage your account information</p>
                </div>

                {/* Avatar */}
                <div className="flex justify-center -mt-11 mb-2">
                    <div className="relative">
                        <div className="w-22 h-22 rounded-full ring-4 ring-white bg-emerald-100 overflow-hidden flex items-center justify-center shadow-md">
                            {image ? (
                                <img src={`http://localhost:3000${image}`} alt="profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-emerald-600 text-2xl font-bold">{initial}</span>
                            )}
                            {uploading && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <Loader2 size={22} className="text-white animate-spin" />
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => fileRef.current?.click()}
                            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-md cursor-pointer transition-colors ring-2 ring-white"
                            title="Change photo"
                        >
                            <Camera size={14} />
                        </button>
                        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChoose} className="hidden" />
                    </div>
                </div>

                {image && (
                    <div className="flex justify-center mb-3">
                        <button onClick={handleImageRemove} className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 cursor-pointer">
                            <Trash2 size={12} /> Remove photo
                        </button>
                    </div>
                )}

                {/* Form */}
                <div className="px-5 pb-5 flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">First Name</label>
                            <div className="flex items-center gap-2 bg-emerald-50/60 border border-emerald-100 rounded-lg px-2.5 py-2 focus-within:border-emerald-400 transition-colors">
                                <User size={14} className="text-emerald-500 shrink-0" />
                                <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full bg-transparent text-sm text-gray-700 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">Last Name</label>
                            <div className="flex items-center gap-2 bg-emerald-50/60 border border-emerald-100 rounded-lg px-2.5 py-2 focus-within:border-emerald-400 transition-colors">
                                <User size={14} className="text-emerald-500 shrink-0" />
                                <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full bg-transparent text-sm text-gray-700 outline-none" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
                        <div className="flex items-center gap-2 bg-emerald-50/60 border border-emerald-100 rounded-lg px-2.5 py-2 focus-within:border-emerald-400 transition-colors">
                            <Mail size={14} className="text-emerald-500 shrink-0" />
                            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-transparent text-sm text-gray-700 outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">Phone</label>
                        <div className="flex items-center gap-2 bg-emerald-50/60 border border-emerald-100 rounded-lg px-2.5 py-2 focus-within:border-emerald-400 transition-colors">
                            <Phone size={14} className="text-emerald-500 shrink-0" />
                            <input value={form.phoneNo} onChange={(e) => setForm({ ...form, phoneNo: e.target.value })} className="w-full bg-transparent text-sm text-gray-700 outline-none" />
                        </div>
                    </div>

                    <button
                        onClick={handleUpdate} disabled={status !== "idle"} className={`mt-2 flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-semibold text-white cursor-pointer transition-colors disabled:cursor-not-allowed ${status === "saved" ? "bg-emerald-600" : "bg-emerald-600 hover:bg-emerald-700"}`}>{status === "saving" && <><Loader2 size={15} className="animate-spin" /> Saving...</>}{status === "saved" && <><Check size={15} /> Saved!</>}{status === "idle" && <><Save size={15} /> Save Changes</>}
                    </button>
                </div>
            </div>

            {/* ===== CROP SCREEN ===== */}
            {cropSrc && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
                        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-gray-800">Adjust your photo</h3>
                            <button onClick={() => setCropSrc(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Cropper area */}
                        <div className="relative w-full h-72 bg-gray-900">
                            <Cropper
                                image={cropSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>

                        {/* Zoom slider */}
                        <div className="px-5 py-3 flex items-center gap-3">
                            <ZoomIn size={16} className="text-gray-400 shrink-0" />
                            <input
                                type="range"
                                min={1}
                                max={3}
                                step={0.01}
                                value={zoom}
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full accent-emerald-600 cursor-pointer"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-end gap-2">
                            <button onClick={() => setCropSrc(null)} className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 cursor-pointer">
                                Cancel
                            </button>
                            <button
                                onClick={handleCropSave}
                                disabled={uploading}
                                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer transition-colors disabled:opacity-60"
                            >
                                {uploading ? <><Loader2 size={13} className="animate-spin" /> Saving...</> : <><Check size={13} /> Save Photo</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileModal