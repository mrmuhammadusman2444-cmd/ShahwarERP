import express from 'express'
import SupplierTallyModel from '../Models/Supplier Tally Ledger/SupplierTallyModel.js'

const router = express.Router()

router.get('/tally/next-voucher', async function (req, res) {
    let last = await SupplierTallyModel.findOne({ voucherNo: { $regex: /^TLY-/ } }).sort({ createdAt: -1 })
    let nextNumber = 1
    if (last && last.voucherNo) {
        let lastNum = parseInt(last.voucherNo.replace("TLY-", "")) || 0
        nextNumber = lastNum + 1
    }
    res.json({ voucherNo: "TLY-" + String(nextNumber).padStart(4, "0") })
})

router.post('/add/supplier-tally', async function (req, res) {
    try {
        let data = req.body

        let last = await SupplierTallyModel.findOne({ voucherNo: { $regex: /^TLY-/ } }).sort({ createdAt: -1 })
        let nextNumber = 1
        if (last && last.voucherNo) {
            let lastNum = parseInt(last.voucherNo.replace("TLY-", "")) || 0
            nextNumber = lastNum + 1
        }
        let voucherNo = "TLY-" + String(nextNumber).padStart(4, "0")

        let created = await SupplierTallyModel.create({
            voucherNo: voucherNo,
            supplierName: data.supplierName || "",
            date: data.date,
            remarks: data.remarks || "",
        })
        res.json({ success: true, data: created })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

export default router