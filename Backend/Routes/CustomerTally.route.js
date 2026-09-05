import express from 'express'
import CustomerTallyModel from '../Models/CustomerTallyLedger/CustomerTallyModel.js'

const router = express.Router()

router.get('/customer-tally/next-voucher', async function (req, res) {
    let last = await CustomerTallyModel.findOne({ voucherNo: { $regex: /^CTLY-/ } }).sort({ createdAt: -1 })
    let nextNumber = 1
    if (last && last.voucherNo) {
        let lastNum = parseInt(last.voucherNo.replace("CTLY-", "")) || 0
        nextNumber = lastNum + 1
    }
    res.json({ voucherNo: "CTLY-" + String(nextNumber).padStart(4, "0") })
})

router.post('/add/customer-tally', async function (req, res) {
    try {
        let data = req.body

        let last = await CustomerTallyModel.findOne({ voucherNo: { $regex: /^CTLY-/ } }).sort({ createdAt: -1 })
        let nextNumber = 1
        if (last && last.voucherNo) {
            let lastNum = parseInt(last.voucherNo.replace("CTLY-", "")) || 0
            nextNumber = lastNum + 1
        }
        let voucherNo = "CTLY-" + String(nextNumber).padStart(4, "0")

        let created = await CustomerTallyModel.create({
            voucherNo: voucherNo,
            customerName: data.customerName || "",
            date: data.date,
            remarks: data.remarks || "",
        })
        res.json({ success: true, data: created })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

export default router