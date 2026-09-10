import express from 'express'
import ItemModel from '../Models/Production&Manufacturing/ItemModel.js'

const router = express.Router()

router.post('/add/item', async function (req, res) {
    try {
        let data = req.body

        let prefix = data.category || "RM"
        let last = await ItemModel.findOne({ itemCode: { $regex: `^${prefix}-` } }).sort({ createdAt: -1 })
        let nextNumber = 1
        if (last && last.itemCode) {
            let lastNum = parseInt(last.itemCode.split("-")[1]) || 0
            nextNumber = lastNum + 1
        }
        let itemCode = `${prefix}-${String(nextNumber).padStart(3, "0")}`

        let created = await ItemModel.create({
            itemCode: itemCode,
            itemName: data.itemName,
            category: data.category || "RM",
            unitOfMeasure: data.unitOfMeasure || "",
            currentStock: Number(data.currentStock) || 0,
            reorderLevel: Number(data.reorderLevel) || 0,
            costPerUnit: Number(data.costPerUnit) || 0,
            batchTracking: data.batchTracking || false,
            warehouseLocation: data.warehouseLocation || "",
            description: data.description || "",
        })
        res.json({ success: true, data: created })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.get('/find/items', async function (req, res) {
    let list = await ItemModel.find().sort({ createdAt: -1 })
    res.json(list)
})

router.put('/update/item/:id', async function (req, res) {
    try {
        let data = req.body
        let updated = await ItemModel.findByIdAndUpdate(req.params.id, {
            itemName: data.itemName,
            category: data.category,
            unitOfMeasure: data.unitOfMeasure,
            currentStock: Number(data.currentStock) || 0,
            reorderLevel: Number(data.reorderLevel) || 0,
            costPerUnit: Number(data.costPerUnit) || 0,
            batchTracking: data.batchTracking || false,
            warehouseLocation: data.warehouseLocation || "",
            description: data.description || "",
        }, { new: true })
        res.json({ success: true, data: updated })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.delete('/delete/item/:id', async function (req, res) {
    let deleted = await ItemModel.findByIdAndDelete(req.params.id)
    res.json({ success: true, data: deleted })
})

export default router