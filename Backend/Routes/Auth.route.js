import express from 'express'
import jwt from 'jsonwebtoken'
import SignupModel from '../Models/SignUpModel.js'
import multer from 'multer'
import path from 'path'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'atifbaanday@gmail.com',        
        pass: 'ycuusvoovpnfjmlr'             
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        let unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, 'profile-' + unique + ext)
    }
})
const upload = multer({ storage: storage })
const router = express.Router()

router.post('/signup', async function (req, res) {
    let data = req.body

    let existingUser = await SignupModel.findOne({ email: data.email })
    if (existingUser) {
        return res.json({ success: false, message: 'Email already registered. Please login instead.' })
    }

    let signupObject = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNo: data.phoneNo,
        password: data.password,
        confirmPassword: data.confirmPassword
    }

    let signUpCreate = await SignupModel.create(signupObject)
    res.json({ success: true, data: signUpCreate })
})


router.post('/signin', async function (req, res) {
    let data = req.body
    console.log("LOGIN ATTEMPT:", data)
    let FindLogin = await SignupModel.findOne({ email: data.email })
    console.log("FOUND USER:", FindLogin)
    if (!FindLogin) {
        return res.json({ success: false, message: 'Could not find user' })
    }
    if (FindLogin.password !== data.password) {
        return res.json({ success: false, message: 'Wrong Password' })
    }
    res.json({
        success: true,
        message: 'Login Successful',
        token: jwt.sign(
            { id: FindLogin._id, role: FindLogin.role },
            'shahwar_secret_key_123',   // secret — baad me .env me daalna
            { expiresIn: '7d' }
        ),
        user: {
            _id: FindLogin._id,
            firstName: FindLogin.firstName,
            lastName: FindLogin.lastName,
            email: FindLogin.email,
            role: FindLogin.role,
            permissions: FindLogin.permissions,
            image: FindLogin.image,
        }
    })
})



router.get('/all/users', async function (req, res) {
    let users = await SignupModel.find().select('-password -confirmPassword')
    res.json(users)
})

router.put('/update/user/permissions/:id', async function (req, res) {
    let id = req.params.id
    let { role, permissions } = req.body
    let updated = await SignupModel.findByIdAndUpdate(
        id,
        { role, permissions },
        { new: true }
    )
    if (!updated) return res.status(404).json({ message: "User not found" })
    res.json(updated)
})
router.get('/profile/:id', async function (req, res) {
    let user = await SignupModel.findById(req.params.id).select('-password -confirmPassword')
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
})

router.post('/profile/update/:id', async function (req, res) {
    let id = req.params.id
    let { firstName, lastName, email, phoneNo } = req.body
    let updated = await SignupModel.findByIdAndUpdate(
        id,
        { firstName, lastName, email, phoneNo },
        { new: true }
    ).select('-password -confirmPassword')
    if (!updated) return res.status(404).json({ message: "User not found" })
    res.json(updated)
})

router.post('/profile/image/:id', upload.single('image'), async function (req, res) {
    let id = req.params.id
    if (!req.file) return res.status(400).json({ message: "No image uploaded" })
    let imagePath = '/uploads/' + req.file.filename
    let updated = await SignupModel.findByIdAndUpdate(
        id,
        { image: imagePath },
        { new: true }
    ).select('-password -confirmPassword')
    res.json(updated)
})

router.post('/profile/image/remove/:id', async function (req, res) {
    let id = req.params.id
    let updated = await SignupModel.findByIdAndUpdate(
        id,
        { image: "" },
        { new: true }
    ).select('-password -confirmPassword')
    res.json(updated)
})
// Step 1: user email daale, OTP bhejो
router.post('/forgot-password', async function (req, res) {
    let { email } = req.body

    let user = await SignupModel.findOne({ email })
    if (!user) {
        return res.json({ success: false, message: 'No account with this email' })
    }

    // 6-digit OTP banao
    let otp = Math.floor(100000 + Math.random() * 900000).toString()

    // OTP + expiry (10 min) save karo
    user.resetOtp = otp
    user.resetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000)   // 10 minute
    await user.save()

    // email bhejो
    try {
        await transporter.sendMail({
            from: 'atifbaanday@gmail.com',
            to: email,
            subject: 'Password Reset OTP - Shahwar Foods',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
                    <h2 style="color: #059669;">Shahwar Foods</h2>
                    <p>Your password reset OTP is:</p>
                    <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #059669; text-align: center; padding: 16px; background: #f0fdf4; border-radius: 8px;">${otp}</div>
                    <p style="color: #64748b; font-size: 14px;">This code will expire in 10 minutes. If you didn't request this, please ignore.</p>
                </div>
            `
        })
        res.json({ success: true, message: 'OTP sent to your email' })
    } catch (err) {
        console.log('EMAIL ERROR:', err)
        res.json({ success: false, message: 'Failed to send email' })
    }
})
// Step 2: OTP verify + naya password set
router.post('/reset-password', async function (req, res) {
    let { email, otp, newPassword } = req.body

    let user = await SignupModel.findOne({ email })
    if (!user) {
        return res.json({ success: false, message: 'No account with this email' })
    }

    // OTP check
    if (!user.resetOtp || user.resetOtp !== otp) {
        return res.json({ success: false, message: 'Invalid OTP' })
    }

    // expiry check
    if (!user.resetOtpExpiry || user.resetOtpExpiry < new Date()) {
        return res.json({ success: false, message: 'OTP expired. Please request a new one.' })
    }

    // naya password set + OTP clear
    user.password = newPassword
    user.confirmPassword = newPassword
    user.resetOtp = ""
    user.resetOtpExpiry = null
    await user.save()

    res.json({ success: true, message: 'Password reset successful' })
})

export default router