import express from 'express'
import SignupModel from '../Models/SignUpModel.js'

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
        user: {
            _id: FindLogin._id,
            firstName: FindLogin.firstName,
            lastName: FindLogin.lastName,
            email: FindLogin.email,
            role: FindLogin.role,
            permissions: FindLogin.permissions,
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

export default router