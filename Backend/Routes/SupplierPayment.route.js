import express from 'express'
import SupplierPaymentsModel from '../Models/Accounts/SupplierPaymentsModel.js'

const router = express.Router()


router.post('/supplier/payment', async function (req, res) {
    let data = req.body

    // last payment dhoondo — voucher number ke liye
    let lastPayment = await SupplierPaymentsModel.findOne().sort({ _id: -1 })

    // naya voucher number banao — VCH-0001, VCH-0002...
    let nextNumber = 1
    if (lastPayment && lastPayment.voucherNo) {
        let lastNum = parseInt(lastPayment.voucherNo.replace("VCH-", "")) || 0
        nextNumber = lastNum + 1
    }
    let voucherNo = "VCH-" + String(nextNumber).padStart(4, "0")

    const supplierPaymentObject = {
        date: data.date,
        paymentType: data.paymentType,
        fromCustomer: data.fromCustomer,
        voucherNo: voucherNo,
        remark: data.remark,
        amountInWords: data.amountInWords,
        allocations: data.allocations,
        totalAmount: data.totalAmount
    }

    let createPayment = await SupplierPaymentsModel.create(supplierPaymentObject)
    res.json(createPayment)
})
// saare payments laao (approval list ke liye)
router.get('/find/supplier/payment', async function (req, res) {
    let payments = await SupplierPaymentsModel.find().sort({ createdAt: -1 })
    res.json(payments)
})

// approve
router.post('/approve/supplier/payment/:id', async function (req, res) {
    let id = req.params.id
    let approved = await SupplierPaymentsModel.findByIdAndUpdate(
        id,
        { status: "approved" },
        { new: true }
    )
    if (!approved) return res.status(404).json({ message: "Payment not found" })
    res.json(approved)
})

// reject
router.post('/reject/supplier/payment/:id', async function (req, res) {
    let id = req.params.id
    let rejected = await SupplierPaymentsModel.findByIdAndUpdate(
        id,
        { status: "rejected", rejectReason: req.body.rejectReason || "" },
        { new: true }
    )
    if (!rejected) return res.status(404).json({ message: "Payment not found" })
    res.json(rejected)
})










export default router