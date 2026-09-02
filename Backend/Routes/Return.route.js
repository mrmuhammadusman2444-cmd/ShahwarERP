import express from 'express'
import ReturnModel from '../Models/Return/ReturnModel.js'

const router = express.Router()

router.post('/add/return', async function (req, res) {
    try {
        let data = req.body

        let last = await ReturnModel.findOne({ returnNo: { $regex: /^RET-/ } }).sort({ createdAt: -1 })
        let nextNumber = 1
        if (last && last.returnNo) {
            let lastNum = parseInt(last.returnNo.replace("RET-", "")) || 0
            nextNumber = lastNum + 1
        }
        let returnNo = "RET-" + String(nextNumber).padStart(4, "0")

        let created = await ReturnModel.create({
            returnNo: returnNo,
            gatePass: data.gatePass || "",
            customerName: data.customerName || "",
            date: data.date,
            showRate: data.showRate || "",
            returnType: data.returnType || "",
            previousAmount: data.previousAmount || "",
            items: data.items || [],
            grandTotal: data.grandTotal || 0,
            saleBy: data.saleBy || "",
        })
        res.json({ success: true, data: created })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.get('/find/returns', async function (req, res) {
    let list = await ReturnModel.find().sort({ createdAt: 1 })
    res.json(list)
})

export default router