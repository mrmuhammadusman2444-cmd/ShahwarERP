import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { X, Check, ZoomIn } from 'lucide-react'
import GetCroppedImg from '../GetCroppedImg.js'
const ImageCropModal = ({ imageSrc, onCancel, onCropDone }) => {

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [loading, setLoading] = useState(false)

    const onCropComplete = useCallback((croppedArea, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels)
    }, [])

    async function handleDone() {
        setLoading(true)
        try {
            const croppedFile = await GetCroppedImg(imageSrc, croppedAreaPixels)
            onCropDone(croppedFile)
        } catch (err) {
            console.log("CROP FAILED:", err.message)
        }
        setLoading(false)
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">

                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h3 className="text-gray-800 text-base font-bold">Crop Photo</h3>
                    <button onClick={onCancel} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <X className="w-4.5 h-4.5 text-gray-500" />
                    </button>
                </div>

                <div className="relative w-full h-72 bg-slate-900">
                    <Cropper
                        image={imageSrc}
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

                <div className="px-5 py-3 flex items-center gap-3 border-b border-gray-50">
                    <ZoomIn className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer"
                    />
                </div>

                <div className="flex items-center justify-end gap-3 px-5 py-4">
                    <button onClick={onCancel} className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-semibold rounded-xl transition-all cursor-pointer">
                        Cancel
                    </button>
                    <button
                        onClick={handleDone}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer disabled:opacity-60"
                    >
                        <Check size={15} strokeWidth={3} /> {loading ? "Cropping..." : "Apply"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageCropModal