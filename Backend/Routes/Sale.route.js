import express from "express";
import SaleModel from '../Models/Sale Models/SalesModel.js'
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

export default router