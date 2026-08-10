import express from "express";
import multer from 'multer'
import path from 'path'
import EmployeeModel from '../Models/Employee/EmployeeModel.js'



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        let unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, 'employee-' + unique + ext)
    }
})
const upload = multer({ storage: storage })
const router = express.Router();

router.post('/add/new/employee', upload.single('picture'), async function (req, res) {
    try {

        let picturePath = req.file ? '/uploads/' + req.file.filename : ""

        let newEmployee = await EmployeeModel.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            designation: req.body.designation,
            phone: req.body.phone,
            rateType: req.body.rateType,
            hourRateSalary: req.body.hourRateSalary,
            email: req.body.email,
            bloodGroup: req.body.bloodGroup,
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2,
            picture: picturePath,
            country: req.body.country,
            city: req.body.city,
            zipCode: req.body.zipCode,
        })

        res.json(newEmployee)
    } catch (err) {
        res.status(500).json({ message: "Employee create failed", error: err.message })
    }
})

router.get('/find/employee', async function (req, res) {
    let findEmployee = await EmployeeModel.find()
    res.json(findEmployee)
})


router.delete('/delete/employee/:id', async function (req, res) {
    try {
        await EmployeeModel.findByIdAndDelete(req.params.id)
        res.json({ message: "Employee deleted" })
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message })
    }
})


router.post('/update/employee/:id', upload.single('picture'), async function (req, res) {
    try {
        let updateFields = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            designation: req.body.designation,
            phone: req.body.phone,
            rateType: req.body.rateType,
            hourRateSalary: req.body.hourRateSalary,
            email: req.body.email,
            bloodGroup: req.body.bloodGroup,
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2,
            city: req.body.city,
            zipCode: req.body.zipCode,
        }
        if (req.file) {
            updateFields.picture = '/uploads/' + req.file.filename
        }

        let updated = await EmployeeModel.findByIdAndUpdate(req.params.id, updateFields, { new: true })
        res.json(updated)
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message })
    }
})





















export default router;