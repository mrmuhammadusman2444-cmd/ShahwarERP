import express from 'express'
import DistributorOrderModel from '../Models/Distributor Order/DistributorOrderModel.js'
import FinishProductModel from '../Models/Finish Product/FinishProductModel.js'
const router = express.Router()

router.post('/distributor/place-order', async function (req, res) {
    try {
        let data = req.body

        let last = await DistributorOrderModel.findOne({ orderNo: { $regex: /^DORD-/ } }).sort({ createdAt: -1 })
        let nextNumber = 1
        if (last && last.orderNo) {
            let lastNum = parseInt(last.orderNo.replace("DORD-", "")) || 0
            nextNumber = lastNum + 1
        }
        let orderNo = "DORD-" + String(nextNumber).padStart(4, "0")

        let created = await DistributorOrderModel.create({
            orderNo: orderNo,
            distributorId: data.distributorId || "",
            distributorName: data.distributorName || "",
            date: data.date || new Date(),
            items: data.items || [],
            grandTotal: data.grandTotal || 0,
            totalWeight: data.totalWeight || 0,
            remark: data.remark || "",
        })
        res.json({ success: true, data: created })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.get('/distributor/my-orders/:distributorId', async function (req, res) {
    let list = await DistributorOrderModel.find({ distributorId: req.params.distributorId }).sort({ createdAt: -1 })
    res.json(list)
})

router.get('/distributor/all-orders', async function (req, res) {
    try {
        let orders = await DistributorOrderModel.find().sort({ createdAt: -1 })

        let finishProducts = await FinishProductModel.find()
        let stockMap = {}
        finishProducts.forEach((fp) => {
            let items = fp.items || []
            items.forEach((it) => {
                if (!it.name) return
                stockMap[it.name] = (stockMap[it.name] || 0) + (Number(it.carton) || 0)
            })
        })

        let result = orders.map((order) => {
            let totalOrdered = 0
            let totalAvailable = 0
                ; (order.items || []).forEach((it) => {
                    let ordered = Number(it.carton) || 0
                    let stock = stockMap[it.name] || 0
                    totalOrdered += ordered
                    totalAvailable += Math.min(ordered, stock)
                })
            let percent = totalOrdered > 0 ? Math.round((totalAvailable / totalOrdered) * 100) : 0
            return { ...order.toObject(), completion: percent }
        })

        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/distributor/order/status/:id', async function (req, res) {
    try {
        let updated = await DistributorOrderModel.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status, rejectReason: req.body.rejectReason || "" },
            { new: true }
        )
        res.json({ success: true, data: updated })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.delete('/distributor/order/:id', async function (req, res) {
    let deleted = await DistributorOrderModel.findByIdAndDelete(req.params.id)
    res.json({ success: true, data: deleted })
})

router.get('/distributor/order-with-stock/:id', async function (req, res) {
    try {
        let order = await DistributorOrderModel.findById(req.params.id)
        if (!order) return res.status(404).json({ message: "Order not found" })

        let finishProducts = await FinishProductModel.find()
        let stockMap = {}
        finishProducts.forEach((fp) => {
            let items = fp.items || []
            items.forEach((it) => {
                if (!it.name) return
                stockMap[it.name] = (stockMap[it.name] || 0) + (Number(it.carton) || 0)
            })
        })

        let items = (order.items || []).map((it) => {
            let ordered = Number(it.carton) || 0
            let stock = stockMap[it.name] || 0
            let remaining = ordered - stock
            return {
                ...it,
                stock: stock,
                remaining: remaining > 0 ? remaining : 0,
                stockStatus: remaining <= 0 ? "complete" : "pending",
            }
        })

        res.json({ ...order.toObject(), items })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/distributor/orders/count', async function (req, res) {
    try {
        let count = await DistributorOrderModel.countDocuments({ status: { $ne: "completed" } })
        res.json({ count: count })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router