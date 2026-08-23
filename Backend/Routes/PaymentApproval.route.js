import express from 'express'
import BankTransactionModel from '../Models/Bank/BankTransactionModel.js'
import SupplierPaymentsModel from '../Models/Accounts/SupplierPaymentsModel.js'

const router = express.Router()

// ── Pending SUPPLIER payments (allocations me supplier hai) ──
router.get('/payment-approval/supplier', async function (req, res) {
    try {
        let list = await SupplierPaymentsModel.find({
            status: "pending",
            "allocations.0": { $exists: true }
        }).sort({ createdAt: -1 })
        res.json(list)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// ── Pending CUSTOMER payments (fromCustomer hai, allocations nahi) ──
router.get('/payment-approval/customer', async function (req, res) {
    try {
        let list = await SupplierPaymentsModel.find({
            status: "pending",
            fromCustomer: { $ne: "" },
            "allocations.0": { $exists: false },   // supplier nahi
            toType: { $ne: "bank" }                 // bank nahi (wo Bank tab me)
        }).sort({ createdAt: -1 })
        res.json(list)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.put('/payment-approval/approve/:id', async function (req, res) {
    try {
        let approved = await SupplierPaymentsModel.findByIdAndUpdate(
            req.params.id,
            { status: "approved" },
            { new: true }
        )
        if (!approved) return res.status(404).json({ message: "Payment not found" })

        // isi voucher ki bank entry bhi approve karo (agar hai)
        if (approved.voucherNo) {
            let r = await BankTransactionModel.updateMany(
                { voucherNo: approved.voucherNo, status: "pending" },
                { status: "approved" }
            )
            console.log(">>> BANK ENTRIES APPROVED:", r.modifiedCount)
        }

        res.json({ success: true, data: approved })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.delete('/payment-approval/delete/:id', async function (req, res) {
    try {
        let deleted = await SupplierPaymentsModel.findByIdAndDelete(req.params.id)
        if (!deleted) return res.status(404).json({ message: "Payment not found" })

        if (deleted.voucherNo) {
            await BankTransactionModel.deleteMany({ voucherNo: deleted.voucherNo })
        }

        res.json({ success: true, data: deleted })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// ── Total pending count (badge ke liye) ──
router.get('/payment-approval/count', async function (req, res) {
    try {
        let count = await SupplierPaymentsModel.countDocuments({ status: "pending" })
        res.json({ count: count })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// ── Pending BANK payments (To = bank; jaise Customer → Bank) ──
router.get('/payment-approval/bank', async function (req, res) {
    try {
        let list = await SupplierPaymentsModel.find({
            status: "pending",
            toType: "bank"
        }).sort({ createdAt: -1 })
        res.json(list)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router