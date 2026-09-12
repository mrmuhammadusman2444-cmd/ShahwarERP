import express from 'express'
import ProductionOrderModel from '../Models/Production&Manufacturing/ProductionOrderModel.js'
import BOMModel from '../Models/Production&Manufacturing/B0MModel.js'
import ItemModel from '../Models/Production&Manufacturing/ItemModel.js'

const router = express.Router()

router.get('/production/calculate/:fgItemName/:quantity', async function (req, res) {
    try {
        let bom = await BOMModel.findOne({ fgItemName: req.params.fgItemName })
        if (!bom) return res.json({ found: false, message: "No BOM for this product" })

        let qty = Number(req.params.quantity) || 0
        let batchSize = Number(bom.batchSize) || 1
        let multiplier = qty / batchSize

        let materials = (bom.items || []).map((it) => {
            let required = (Number(it.qty) || 0) * multiplier
            return {
                itemName: it.itemName,
                itemCode: it.itemCode,
                category: it.category,
                unit: it.unit,
                requiredQty: required,
            }
        })

        let itemNames = materials.map((m) => m.itemName)
        let stockItems = await ItemModel.find({ itemName: { $in: itemNames } })
        let stockMap = {}
        stockItems.forEach((s) => { stockMap[s.itemName] = Number(s.currentStock) || 0 })

        let result = materials.map((m) => {
            let available = stockMap[m.itemName] || 0
            return {
                ...m,
                availableStock: available,
                shortage: m.requiredQty > available ? (m.requiredQty - available) : 0,
                enough: available >= m.requiredQty,
            }
        })

        res.json({ found: true, bomCode: bom.bomCode, batchSize, materials: result })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/add/production-order', async function (req, res) {
    try {
        let data = req.body

        let last = await ProductionOrderModel.findOne({ orderNo: { $regex: /^PRD-/ } }).sort({ createdAt: -1 })
        let nextNumber = 1
        if (last && last.orderNo) {
            let lastNum = parseInt(last.orderNo.replace("PRD-", "")) || 0
            nextNumber = lastNum + 1
        }
        let orderNo = "PRD-" + String(nextNumber).padStart(4, "0")

        let created = await ProductionOrderModel.create({
            orderNo: orderNo,
            fgItemName: data.fgItemName || "",
            fgItemCode: data.fgItemCode || "",
            quantity: Number(data.quantity) || 0,
            unit: data.unit || "",
            bomCode: data.bomCode || "",
            requiredMaterials: data.requiredMaterials || [],
            date: data.date || new Date(),
            remark: data.remark || "",
        })
        res.json({ success: true, data: created })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.get('/find/production-orders', async function (req, res) {
    let list = await ProductionOrderModel.find().sort({ createdAt: -1 })
    res.json(list)
})

router.delete('/delete/production-order/:id', async function (req, res) {
    let deleted = await ProductionOrderModel.findByIdAndDelete(req.params.id)
    res.json({ success: true, data: deleted })
})

router.put('/production-order/complete/:id', async function (req, res) {
    try {
        let order = await ProductionOrderModel.findById(req.params.id)
        if (!order) return res.status(404).json({ message: "Not found" })
        if (order.status === "completed") return res.status(400).json({ message: "Already completed" })

        for (let m of (order.requiredMaterials || [])) {
            let need = Number(m.requiredQty) || 0
            if (m.itemName && need > 0) {
                await ItemModel.findOneAndUpdate(
                    { itemName: m.itemName },
                    { $inc: { currentStock: -need } }
                )
            }
        }

        let fgQty = Number(order.quantity) || 0
        if (order.fgItemName && fgQty > 0) {
            await ItemModel.findOneAndUpdate(
                { itemName: order.fgItemName },
                { $inc: { currentStock: fgQty } }
            )
        }

        order.status = "completed"
        await order.save()

        res.json({ success: true, data: order })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

export default router