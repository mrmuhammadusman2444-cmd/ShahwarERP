import express from 'express'
import FinishProductModel from '../Models/Finish Product/FinishProductModel.js'

const router = express.Router()

router.post('/add/finish-product', async function (req, res) {
    try {
        let data = req.body

        let last = await FinishProductModel.findOne({ finishNo: { $regex: /^FIN-/ } }).sort({ createdAt: -1 })
        let nextNumber = 1
        if (last && last.finishNo) {
            let lastNum = parseInt(last.finishNo.replace("FIN-", "")) || 0
            nextNumber = lastNum + 1
        }
        let finishNo = "FIN-" + String(nextNumber).padStart(4, "0")

        let created = await FinishProductModel.create({
            finishNo: finishNo,
            employeeName: data.employeeName || "",
            date: data.date,
            items: data.items || [],
            totalWeight: data.totalWeight || 0,
            saleBy: data.saleBy || "",
        })
        res.json({ success: true, data: created })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.get('/find/finish-products', async function (req, res) {
    let list = await FinishProductModel.find().sort({ createdAt: 1 })
    res.json(list)
})

router.delete('/delete/finish-product/:id', async function (req, res) {
    let deleted = await FinishProductModel.findByIdAndDelete(req.params.id)
    res.json({ success: true, data: deleted })
})

router.put('/update/finish-product/:id', async function (req, res) {
    try {
        let data = req.body
        let updated = await FinishProductModel.findByIdAndUpdate(
            req.params.id,
            {
                employeeName: data.employeeName || "",
                date: data.date,
                items: data.items || [],
                totalWeight: data.totalWeight || 0,
            },
            { new: true }
        )
        res.json({ success: true, data: updated })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.get('/finish-stock', async function (req, res) {
    try {
        let finishProducts = await FinishProductModel.find()

                let summary = {}
        finishProducts.forEach((fp) => {
            let items = fp.items || []
            items.forEach((item) => {
                let name = item.name
                if (!name) return
                if (!summary[name]) {
                    summary[name] = {
                        productName: name,
                        cartonSize: item.cartonSize || 0,
                        mainCategory: item.mainCategory || "Uncategorized",
                        carton: 0,
                        date: fp.date,
                    }
                }
                summary[name].carton += Number(item.carton) || 0
                if (fp.date && (!summary[name].date || new Date(fp.date) > new Date(summary[name].date))) {
                    summary[name].date = fp.date
                }
            })
        })

        let rows = Object.values(summary).map((r) => ({
            ...r,
            dozen: r.cartonSize ? (r.carton * r.cartonSize) / 12 : 0,
        }))

        res.json(rows)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router