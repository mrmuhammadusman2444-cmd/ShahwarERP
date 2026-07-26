import express from 'express'
import SupplierModel from '../Models/Supplier/SupplierModel.js'
const router = express.Router()

router.post('/new/supplier', async function (req, res) {
    let data = req.body
    console.log(data)
    let supplierObject = {
        supplierName: data.supplierName,
        email: data.email,
        address:data.address,
        phoneNo: data.phoneNo,
        supplierDetails: data.supplierDetails,
        supplierCredits: data.supplierCredits,
        previouseCreditsBalance: data.previouseCreditsBalance
    }

    let createSupplier = await SupplierModel.create(supplierObject)
    res.json( createSupplier )

})

router.get('/find/supplier',async function (req,res) {
    let find =await SupplierModel.find()
    res.json(find)
})

export default router