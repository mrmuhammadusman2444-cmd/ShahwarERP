import express from 'express'
import SaleModel from '../Models/Sale Models/SalesModel.js'

const router = express.Router()

router.post('/new/sale', async function (req, res) {
    try {
        let data = req.body
        let count = await SaleModel.countDocuments()
        let invoiceNo = "INV-" + String(count + 1).padStart(4, "0")

        const object = {
            invoiceNo: invoiceNo,
            customerName: data.customerName,
            Date: data.Date,
            showRate: data.showRate,
            freightCharges: data.freightCharges,
            previouseAmount: data.previouseAmount,
            items: data.items,
            grandTotal: data.grandTotal,
            totalCartons: data.totalCartons,
        }

        let createNewSale = await SaleModel.create(object)
        res.json(createNewSale)
    } catch (err) {
        console.log("SALE ERROR:", err.message)
        res.status(500).json({ message: err.message })
    }
})

router.get('/find/new/sale', async function (req, res) {
    try {
        let sales = await SaleModel.find()
        res.json(sales)
    } catch (err) {
        console.log("FIND ERROR:", err.message)
        res.status(500).json({ message: err.message })
    }
})

router.get('/find/sale/:id', async function (req, res) {
    let sale = await SaleModel.findById(req.params.id)
    res.json(sale)
})

router.put('/update/sale/:id', async function (req, res) {
    let updatedSale = await SaleModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.json(updatedSale)
})

router.get('/find/pending/sale', async function (req, res) {
    let pendingSales = await SaleModel.find({ status: "pending" })
    res.json(pendingSales)
})

router.put('/approve/sale/:id', async function (req, res) {
    let approvedSale = await SaleModel.findByIdAndUpdate(
        req.params.id,
        { status: "approved" },
        { new: true }
    )
    res.json(approvedSale)
})

router.put('/reject/sale/:id', async function (req, res) {
    let rejectedSale = await SaleModel.findByIdAndUpdate(
        req.params.id,
        { status: "rejected" },
        { new: true }
    )
    res.json(rejectedSale)
})

router.post('/delete/sale', async function (req, res) {
    try {
        let deleteSale = await SaleModel.findByIdAndDelete(req.body._id)
        if (!deleteSale) {
            return res.json({ success: false, msg: 'Sale not found' })
        }
        res.json({ success: true, data: deleteSale })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, msg: 'Server error while deleting sale' })
    }
})

export default router