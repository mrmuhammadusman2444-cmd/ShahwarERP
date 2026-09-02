import express from 'express'
import OrderModel from '../Models/Order/OrderModel.js'
import FinishProductModel from '../Models/Finish Product/FinishProductModel.js'

const router = express.Router()

router.post('/add/order', async function (req, res) {
    try {
        let data = req.body

        let lastOrder = await OrderModel.findOne({ orderNo: { $regex: /^ORD-/ } }).sort({ createdAt: -1 })
        let nextNumber = 1
        if (lastOrder && lastOrder.orderNo) {
            let lastNum = parseInt(lastOrder.orderNo.replace("ORD-", "")) || 0
            nextNumber = lastNum + 1
        }
        let orderNo = "ORD-" + String(nextNumber).padStart(4, "0")

        let newOrder = {
            orderNo: orderNo,
            customerName: data.customerName || "",
            orderDate: data.orderDate,
            deliveryDate: data.deliveryDate,
            items: data.items || [],
            totalWeight: data.totalWeight || 0,
            grandTotal: data.grandTotal || 0,
            saleBy: data.saleBy || "",
        }

        let created = await OrderModel.create(newOrder)
        res.json({ success: true, data: created })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.get('/find/orders', async function (req, res) {
    let orders = await OrderModel.find().sort({ createdAt: 1 })
    res.json(orders)
})

router.delete('/delete/order/:id', async function (req, res) {
    let deleted = await OrderModel.findByIdAndDelete(req.params.id)
    res.json({ success: true, data: deleted })
})

router.put('/update/order/:id', async function (req, res) {
    try {
        let data = req.body
        let updated = await OrderModel.findByIdAndUpdate(
            req.params.id,
            {
                customerName: data.customerName || "",
                orderDate: data.orderDate,
                deliveryDate: data.deliveryDate,
                items: data.items || [],
                totalWeight: data.totalWeight || 0,
                grandTotal: data.grandTotal || 0,
            },
            { new: true }
        )
        res.json({ success: true, data: updated })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.get('/order-report', async function (req, res) {
    try {
        let query = { status: "pending" }

        if (req.query.customers) {
            let customerList = req.query.customers.split(",").map((c) => c.trim()).filter(Boolean)
            if (customerList.length > 0) {
                query.customerName = { $in: customerList }
            }
        }

        console.log(">>> REPORT QUERY:", JSON.stringify(query))


        let orders = await OrderModel.find(query)
        console.log(">>> ORDERS FOUND:", orders.length, orders.map(o => o.customerName))
        let summary = {}
        orders.forEach((order) => {
            let items = order.items || []
            items.forEach((item) => {
                let name = item.name
                if (!name) return
                if (!summary[name]) {
                    summary[name] = {
                        productName: name,
                        cartonSize: item.cartonSize || 0,
                        mainCategory: item.mainCategory || "Uncategorized",
                        carton: 0,
                        desc: item.desc || "",
                    }
                }
                summary[name].carton += Number(item.carton) || 0
            })
        })

        let finishProducts = await FinishProductModel.find()
        let stockMap = {}
        finishProducts.forEach((fp) => {
            let items = fp.items || []
            items.forEach((it) => {
                if (!it.name) return
                stockMap[it.name] = (stockMap[it.name] || 0) + (Number(it.carton) || 0)
            })
        })

        let rows = Object.values(summary).map((r) => {
            let stock = stockMap[r.productName] || 0
            let remaining = r.carton - stock
            return {
                ...r,
                stock: stock,
                remaining: remaining > 0 ? remaining : 0,
                stockStatus: remaining <= 0 ? "complete" : "pending",
            }
        })

        res.json(rows)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.get('/order-with-stock/:id', async function (req, res) {
    try {
        let order = await OrderModel.findById(req.params.id)
        if (!order) return res.status(404).json({ message: "Order not found" })

        let finishProducts = await FinishProductModel.find()
        let stockMap = {}
        finishProducts.forEach((fp) => {
            (fp.items || []).forEach((it) => {
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

        let result = { ...order.toObject(), items }
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



export default router