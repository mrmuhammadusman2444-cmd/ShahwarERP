import express from 'express'
import BankTransactionModel from '../Models/Bank/BankTransactionModel.js'
import SupplierPaymentsModel from '../Models/Accounts/SupplierPaymentsModel.js'
import CashTransactionModel from '../Models/Cash Book/CashTransactionModel.js'
import AssetPaymentModel from '../Models/Accounts/AssetPaymentModel.js'



const router = express.Router()

router.get('/payment-approval/supplier', async function (req, res) {
    try {
        let list = await SupplierPaymentsModel.find({
            status: "pending",
            "allocations.0": { $exists: true },
            voucherNo: { $not: /^AS-/ }
        }).sort({ createdAt: -1 })
        res.json(list)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/payment-approval/customer', async function (req, res) {
    try {
        let list = await SupplierPaymentsModel.find({
            status: "pending",
            fromCustomer: { $ne: "" },
            "allocations.0": { $exists: false },
            toType: { $ne: "bank" },
            voucherNo: { $not: /^AS-/ }
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

        if (approved.voucherNo) {
            await BankTransactionModel.updateMany(
                { voucherNo: approved.voucherNo, status: "pending" },
                { status: "approved" }
            )
            await CashTransactionModel.updateMany(
                { voucherNo: approved.voucherNo, status: "pending" },
                { status: "approved" }
            )
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
            await CashTransactionModel.deleteMany({ voucherNo: deleted.voucherNo })
        }

        res.json({ success: true, data: deleted })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.get('/payment-approval/count', async function (req, res) {
    try {
        let supplierCustomer = await SupplierPaymentsModel.countDocuments({
            status: "pending",
            voucherNo: { $not: /^AS-/ }
        })
        let asset = await AssetPaymentModel.countDocuments({ status: "pending" })
        res.json({ count: supplierCustomer + asset })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.get('/payment-approval/bank', async function (req, res) {
    try {
        let list = await SupplierPaymentsModel.find({
            status: "pending",
            $or: [
                { toType: "bank" },
                { fromType: "bank", toType: "cash" }
            ],
            voucherNo: { $not: /^AS-/ }
        }).sort({ createdAt: -1 })
        res.json(list)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.get('/payment-approval/asset', async function (req, res) {
    let list = await AssetPaymentModel.find({ status: "pending" }).sort({ createdAt: -1 })
    res.json(list)
})

router.put('/payment-approval/asset/approve/:id', async function (req, res) {
    try {
        let ap = await AssetPaymentModel.findById(req.params.id)
        if (!ap) return res.status(404).json({ message: "Not found" })

        await AssetPaymentModel.findByIdAndUpdate(req.params.id, { status: "approved" })

        await CashTransactionModel.updateMany({ voucherNo: ap.voucherNo }, { status: "approved" })
        await BankTransactionModel.updateMany({ voucherNo: ap.voucherNo }, { status: "approved" })
        await SupplierPaymentsModel.updateMany({ voucherNo: ap.voucherNo }, { status: "approved" })

        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.delete('/payment-approval/asset/reject/:id', async function (req, res) {
    try {
        let ap = await AssetPaymentModel.findById(req.params.id)
        if (!ap) return res.status(404).json({ message: "Not found" })

        await CashTransactionModel.deleteMany({ voucherNo: ap.voucherNo })
        await BankTransactionModel.deleteMany({ voucherNo: ap.voucherNo })
        await SupplierPaymentsModel.deleteMany({ voucherNo: ap.voucherNo })
        await AssetPaymentModel.findByIdAndDelete(req.params.id)

        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

export default router