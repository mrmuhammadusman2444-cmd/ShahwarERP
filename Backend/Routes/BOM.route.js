import express from 'express'
import BOMModel from '../Models/Production&Manufacturing/B0MModel.js'

const router = express.Router()

router.post('/add/bom', async function (req, res) {
    try {
        let data = req.body

        let last = await BOMModel.findOne({ bomCode: { $regex: /^BOM-/ } }).sort({ createdAt: -1 })
        let nextNumber = 1
        if (last && last.bomCode) {
            let lastNum = parseInt(last.bomCode.replace("BOM-", "")) || 0
            nextNumber = lastNum + 1
        }
        let bomCode = "BOM-" + String(nextNumber).padStart(3, "0")

        let created = await BOMModel.create({
            bomCode: bomCode,
            fgItemName: data.fgItemName || "",
            fgItemCode: data.fgItemCode || "",
            batchSize: Number(data.batchSize) || 1,
            batchUnit: data.batchUnit || "",
            items: data.items || [],
            remark: data.remark || "",
        })
        res.json({ success: true, data: created })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.get('/find/boms', async function (req, res) {
    let list = await BOMModel.find().sort({ createdAt: -1 })
    res.json(list)
})

router.get('/bom/by-fg/:fgItemName', async function (req, res) {
    let bom = await BOMModel.findOne({ fgItemName: req.params.fgItemName })
    res.json(bom)
})

router.put('/update/bom/:id', async function (req, res) {
    try {
        let data = req.body
        let updated = await BOMModel.findByIdAndUpdate(req.params.id, {
            fgItemName: data.fgItemName,
            fgItemCode: data.fgItemCode,
            batchSize: Number(data.batchSize) || 1,
            batchUnit: data.batchUnit,
            items: data.items || [],
            remark: data.remark || "",
        }, { new: true })
        res.json({ success: true, data: updated })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.delete('/delete/bom/:id', async function (req, res) {
    let deleted = await BOMModel.findByIdAndDelete(req.params.id)
    res.json({ success: true, data: deleted })
})

export default router