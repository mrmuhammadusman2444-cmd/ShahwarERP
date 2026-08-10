import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { X, Mail, KeyRound, Lock, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'

const ForgotPassword = ({ onClose }) => {
    const [step, setStep] = useState(1)          
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // Step 1: send OTP
    async function sendOtp() {
        if (!email) {
            toast.error('Please enter your email', { position: 'bottom-right', autoClose: 800 })
            return
        }
        setLoading(true)
        try {
            let res = await axios.post('http://localhost:3000/forgot-password', { email })
            if (res.data.success) {
                toast.success('OTP sent to your email', { position: 'bottom-right', autoClose: 1200 })
                setStep(2)
            } else {
                toast.error(res.data.message, { position: 'bottom-right', autoClose: 1200 })
            }
        } catch (err) {
            toast.error('Something went wrong', { position: 'bottom-right', autoClose: 1200 })
        }
        setLoading(false)
    }

    // Step 2: verify OTP (just move to step 3, actual verify on reset)
    function verifyOtp() {
        if (!otp || otp.length !== 6) {
            toast.error('Enter the 6-digit OTP', { position: 'bottom-right', autoClose: 800 })
            return
        }
        setStep(3)
    }

    // Step 3: reset password
    async function resetPassword() {
        if (!newPassword || !confirmPassword) {
            toast.error('Fill both password fields', { position: 'bottom-right', autoClose: 800 })
            return
        }
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match', { position: 'bottom-right', autoClose: 800 })
            return
        }
        setLoading(true)
        try {
            let res = await axios.post('http://localhost:3000/reset-password', { email, otp, newPassword })
            if (res.data.success) {
                setStep(4)
            } else {
                toast.error(res.data.message, { position: 'bottom-right', autoClose: 1500 })
                if (res.data.message.includes('OTP')) setStep(2)   // OTP galat/expire -> wapas OTP step
            }
        } catch (err) {
            toast.error('Something went wrong', { position: 'bottom-right', autoClose: 1200 })
        }
        setLoading(false)
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                    <X size={20} />
                </button>

                {/* Back (step 2,3) */}
                {(step === 2 || step === 3) && (
                    <button
                        onClick={() => setStep(step - 1)}
                        className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 cursor-pointer flex items-center gap-1 text-sm"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                )}

                {/* ===== STEP 1: Email ===== */}
                {step === 1 && (
                    <div className="pt-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                            <Mail size={22} className="text-emerald-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 text-center">Forgot Password?</h2>
                        <p className="text-sm text-gray-500 text-center mt-1 mb-5">Enter your email and we'll send you a reset code</p>

                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                        />

                        <button
                            onClick={sendOtp}
                            disabled={loading}
                            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : 'Send OTP'}
                        </button>
                    </div>
                )}

                {/* ===== STEP 2: OTP ===== */}
                {step === 2 && (
                    <div className="pt-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                            <KeyRound size={22} className="text-emerald-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 text-center">Enter OTP</h2>
                        <p className="text-sm text-gray-500 text-center mt-1 mb-5">We sent a 6-digit code to <span className="font-medium text-gray-700">{email}</span></p>

                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="000000"
                            maxLength={6}
                            className="w-full border border-gray-200 rounded-lg px-3 py-3 text-center text-2xl tracking-[8px] font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                        />

                        <button
                            onClick={verifyOtp}
                            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer"
                        >
                            Verify OTP
                        </button>

                        <button
                            onClick={sendOtp}
                            disabled={loading}
                            className="w-full mt-2 text-emerald-600 text-sm font-medium cursor-pointer hover:text-emerald-700"
                        >
                            Resend OTP
                        </button>
                    </div>
                )}

                {/* ===== STEP 3: New Password ===== */}
                {step === 3 && (
                    <div className="pt-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                            <Lock size={22} className="text-emerald-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 text-center">New Password</h2>
                        <p className="text-sm text-gray-500 text-center mt-1 mb-5">Set a new password for your account</p>

                        <label className="block text-sm font-medium text-gray-700 mb-1.5">New password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                        />

                        <label className="block text-sm font-medium text-gray-700 mb-1.5 mt-3">Confirm password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                        />

                        <button
                            onClick={resetPassword}
                            disabled={loading}
                            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <><Loader2 size={16} className="animate-spin" /> Resetting...</> : 'Reset Password'}
                        </button>
                    </div>
                )}

                {/* ===== STEP 4: Done ===== */}
                {step === 4 && (
                    <div className="pt-6 pb-2 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                            <CheckCircle2 size={26} className="text-emerald-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">Password Reset!</h2>
                        <p className="text-sm text-gray-500 mt-1 mb-5">Your password has been changed. You can now log in with your new password.</p>
                        <button
                            onClick={onClose}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer"
                        >
                            Back to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ForgotPassword