import express from "express";
import EmployeeModel from '../Models/Employee/EmployeeModel.js'

const router = express.Router();

router.post('/add/new/employee', async function (req, res) {
    let data = req.body
    console.log(data)

    const EmployeeObject = {
        firstName: data.firstName,
        lastName: data.lastName,
        designation: data.designation,
        phone: data.phone,
        rateType: data.rateType,
        hourRateSalary: data.hourRateSalary,
        email: data.email,
        bloodGroup: data.bloodGroup,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        picture: data.picture,
        country: data.country,
        city: data.city,
        zipCode: data.zipCode
    }

    let createEmployee = await EmployeeModel.create(EmployeeObject)
    res.json(createEmployee)
})

router.get('/find/employee', async function (req, res) {
    let findEmployee = await EmployeeModel.find()
    res.json(findEmployee)
})

export default router;