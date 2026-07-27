import express from 'express'
import SupplierModel from '../Models/Supplier/SupplierModel.js'
const router = express.Router()

router.post('/new/supplier', async function (req, res) {
    let data = req.body
    let supplierObject = {
        supplierName: data.supplierName,
        email: data.email,
        address: data.address,
        phoneNo: data.phoneNo,
        supplierDetails: data.supplierDetails,
        supplierCredits: data.supplierCredits,
        previousCreditsBalance: data.previousCreditsBalance
    }

    let createSupplier = await SupplierModel.create(supplierObject)
    res.json(createSupplier)
})

router.get('/find/supplier', async function (req, res) {
    let find = await SupplierModel.find()
    res.json(find)
})

router.delete('/delete/supplier/:id', async function (req, res) {
    try {
        let deleted = await SupplierModel.findByIdAndDelete(req.params.id)
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Supplier not found" })
        }
        res.json({ success: true, data: deleted })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.put('/update/supplier/:id', async function (req, res) {
    try {
        let updated = await SupplierModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(updated)
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

export default router