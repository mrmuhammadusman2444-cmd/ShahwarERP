import express from 'express'
import AssetPaymentModel from '../Models/Accounts/AssetPaymentModel.js'
import CashTransactionModel from '../Models/Cash Book/CashTransactionModel.js'
import BankTransactionModel from '../Models/Bank/BankTransactionModel.js'
import SupplierPaymentsModel from '../Models/Accounts/SupplierPaymentsModel.js'
import BankModel from '../Models/Bank/BankModel.js'

const router = express.Router()

router.post('/assetPayment', async function (req, res) {
    try {
        let data = req.body

        let last = await AssetPaymentModel.findOne({ voucherNo: { $regex: /^AS-/ } }).sort({ createdAt: -1 })
        let nextNumber = 1
        if (last && last.voucherNo) {
            let lastNum = parseInt(last.voucherNo.replace("AS-", "")) || 0
            nextNumber = lastNum + 1
        }
        let voucherNo = "AS-" + String(nextNumber)
        let created = await AssetPaymentModel.create({
            voucherNo: voucherNo,
            date: data.date,
            assetName: data.assetName,
            paymentType: data.paymentType,
            bankName: data.bankName,
            supplierName: data.supplierName,
            customerName: data.customerName,
            amount: Number(data.amount) || 0,
            remark: data.remark,
            status: "pending",
        })

        if (data.paymentType === 'cash') {
            console.log(">>> CREATING CASH ENTRY")
            await CashTransactionModel.create({
                date: data.date,
                description: `Asset Payment - ${data.assetName || ""}${data.remark ? " (" + data.remark + ")" : ""}`,
                voucherNo: voucherNo,
                debit: 0,
                credit: Number(data.amount) || 0,
                source: "asset-payment",
                status: "pending",
            })
        }

        if (data.paymentType === 'bank') {
            let bank = await BankModel.findOne({ bankName: data.bankName })
            await BankTransactionModel.create({
                bankId: bank?._id?.toString() || bank?.bankId || "",
                bankName: data.bankName || "",
                date: data.date,
                description: `Asset Payment - ${data.assetName || ""}${data.remark ? " (" + data.remark + ")" : ""}`,
                voucherNo: voucherNo,
                debit: 0,
                credit: Number(data.amount) || 0,
                source: "asset-payment",
                status: "pending",
            })
        }

        if (data.paymentType === 'supplier') {
            await SupplierPaymentsModel.create({
                date: data.date,
                voucherNo: voucherNo,
                totalAmount: Number(data.amount) || 0,
                remark: `Asset Payment - ${data.assetName || ""}${data.remark ? " (" + data.remark + ")" : ""}`,
                status: "pending",
                source: "asset-payment",
                allocations: [
                    {
                        supplierName: data.supplierName,
                        amount: Number(data.amount) || 0,
                    }
                ],
            })
        }

        if (data.paymentType === 'customer') {
            await SupplierPaymentsModel.create({
                date: data.date,
                voucherNo: voucherNo,
                fromCustomer: data.customerName,
                totalAmount: Number(data.amount) || 0,
                remark: `Asset Payment - ${data.assetName || ""}${data.remark ? " (" + data.remark + ")" : ""}`,
                status: "pending",
                source: "asset-payment",
            })
        }

        res.json({ success: true, data: created })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.get('/asset/ledger/:assetName', async function (req, res) {
    try {
        let assetName = req.params.assetName

        let payments = await AssetPaymentModel.find({ assetName: assetName }).sort({ date: 1 })
        console.log(">>> ASSET PAYMENTS:", payments.map(p => ({ date: p.date, amount: p.amount })))

        let combined = payments.map((p) => ({
            date: p.date,
            description: p.remark || `Payment ${p.voucherNo || ""}`,
            voucherNo: p.voucherNo || "",
            debit: Number(p.amount) || 0,
        }))

        combined.sort((a, b) => new Date(a.date) - new Date(b.date))

        let runningBalance = 0
        let entries = combined.map((item) => {
            runningBalance = runningBalance + item.debit
            return { ...item, balance: runningBalance }
        })

        res.json({
            entries: entries,
            closingBalance: runningBalance,
        })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.get('/assetPayment/next-voucher', async function (req, res) {
    let last = await AssetPaymentModel.findOne({ voucherNo: { $regex: /^AS-/ } }).sort({ createdAt: -1 })
    let nextNumber = 1
    if (last && last.voucherNo) {
        let lastNum = parseInt(last.voucherNo.replace("AS-", "")) || 0
        nextNumber = lastNum + 1
    }
    res.json({ voucherNo: "AS-" + String(nextNumber) })
})

export default router