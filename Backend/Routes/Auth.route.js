import express from 'express'
import jwt from 'jsonwebtoken'
import SignupModel from '../Models/SignUpModel.js'
import multer from 'multer'
import path from 'path'

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

router.get('/make/admin/:email', async function (req, res) {
    let updated = await SignupModel.findOneAndUpdate(
        { email: req.params.email },
        { role: "Admin", permissions: {} },
        { new: true }
    )
    res.json(updated)
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

export default router