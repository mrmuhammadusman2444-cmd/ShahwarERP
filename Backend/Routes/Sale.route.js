import express from "express";
import SaleModel from '../Models/Sale Models/SalesModel.js'
import AddProductModel from '../Models/Products/AddProductModel.js'
const router = express.Router();


router.post("/new/sale", async (req, res) => {
    let data = req.body

    // last sale dhoondo (jiska invoice number sabse bada ho)
    let lastSale = await SaleModel.findOne().sort({ _id: -1 })
    // naya invoice number banao — INV-0001, INV-0002...
    let nextNumber = 1
    if (lastSale && lastSale.invoiceNo) {
        let lastNum = parseInt(lastSale.invoiceNo.replace("INV-", "")) || 0
        nextNumber = lastNum + 1
    }
    let invoiceNo = "INV-" + String(nextNumber).padStart(4, "0")

    let newSale = {
        gatePass: data.gatePass,
        customerName: data.customerName,
        Date: data.Date,
        showRate: data.showRate,
        invoiceNo: invoiceNo,
        freightCharges: data.freightCharges,
        previousAmount: data.previousAmount,
        items: data.items,
        grandTotal: data.grandTotal,
        totalCartons: data.totalCartons,
        saleBy: data.saleBy,
    }
    let createSale = await SaleModel.create(newSale)
    res.json(createSale)
})

router.get("/find/sale", async (req, res) => {
    let sales = await SaleModel.find()
    res.json(sales)
})

router.get('/find/sale/invoice/:invoiceNo', async function (req, res) {
    let invoiceNo = req.params.invoiceNo
    let sale = await SaleModel.findOne({ invoiceNo: invoiceNo })
    if (!sale) {
        return res.status(404).json({ message: "Sale not found" })
    }
    res.json(sale)
})

router.get('/find/sale/:id', async (req, res) => {
    let sale = await SaleModel.findById(req.params.id)
    if (!sale) return res.status(404).json({ message: "Sale not found" })
    res.json(sale)
})

router.get('/all/pending/invoices', async (req, res) => {
    const pendingInvoices = await SaleModel.find({ status: "pending" })
    res.json(pendingInvoices)
})

router.put('/update/sale/:id', async (req, res) => {
    let id = req.params.id
    let data = req.body
    let updated = await SaleModel.findByIdAndUpdate(id, data, { new: true })
    if (!updated) return res.status(404).json({ message: "Sale not found" })
    res.json(updated)
})

router.put('/invoice/approve/:id', async (req, res) => {
    let id = req.params.id
    let approved = await SaleModel.findByIdAndUpdate(
        id,
        { status: "approved" },
        { new: true }
    )
    if (!approved) return res.status(404).json({ message: "Sale not found" })
    res.json(approved)
})

router.put('/invoice/reject/:id', async (req, res) => {
    let id = req.params.id
    let rejected = await SaleModel.findByIdAndUpdate(
        id,
        { status: "rejected", rejectReason: req.body.rejectReason || "" },
        { new: true }
    )
    if (!rejected) return res.status(404).json({ message: "Sale not found" })
    res.json(rejected)
})

router.delete("/delete/sale/:id", async (req, res) => {
    let id = req.params.id
    let deleted = await SaleModel.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: "Sale not found" })
    res.json({ message: "Sale deleted successfully" })
})

router.get('/scheme-report', async function (req, res) {
    try {
        let { customerName, startDate, endDate, productName } = req.query

        let query = { status: "approved" }
        if (customerName) query.customerName = customerName
        if (startDate || endDate) {
            query.Date = {}
            if (startDate) query.Date.$gte = new Date(startDate)
            if (endDate) {
                let end = new Date(endDate)
                end.setHours(23, 59, 59, 999)
                query.Date.$lte = end
            }
        }

        let sales = await SaleModel.find(query)
        let products = await AddProductModel.find()

        let pointMap = {}
        products.forEach((p) => { pointMap[p.productName] = Number(p.unitSchemePoint) || 0 })

        let summary = {}
        sales.forEach((sale) => {
            (sale.items || []).forEach((item) => {
                let pname = item.name
                if (!pname) return
                if (productName && pname !== productName) return

                let cartons = Number(item.carton) || 0
                let pts = cartons * (pointMap[pname] || 0)

                if (!summary[pname]) summary[pname] = { productName: pname, qty: 0, points: 0 }
                summary[pname].qty += cartons
                summary[pname].points += pts
            })
        })

        let result = Object.values(summary)
        let totalPoints = result.reduce((sum, r) => sum + r.points, 0)

        res.json({ rows: result, totalPoints })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


export default router