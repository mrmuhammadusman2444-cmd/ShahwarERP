import express from 'express'
import SignupModel from '../Models/SignUpModel.js'

const router = express.Router()

router.post('/signup', async function (req, res) {
    let data = req.body

    let signupObject = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNo: data.phoneNo,
        password: data.password,
        confirmPassword: data.confirmPassword
    }

    let signUpCreate = await SignupModel.create(signupObject)
    res.json(signUpCreate)
})


router.post('/signin', async function (req, res) {
    let data = req.body
    let FindLogin = await SignupModel.findOne({ email: data.email })
    if (!FindLogin) {
        return res.json({ success: false, message: 'Could not find user' })
    }
    if (FindLogin.password !== data.password) {
        return res.json({ success: false, message: 'Wrong Password' })
    }
    res.json({ success: true, message: 'Login Successful' })
})



export default router