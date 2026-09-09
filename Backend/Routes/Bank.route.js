import express from 'express'
import BankModel from '../Models/Bank/BankModel.js'
import BankTransactionModel from '../Models/Bank/BankTransactionModel.js'
import SupplierPaymentsModel from '../Models/Accounts/SupplierPaymentsModel.js'
import AssetPaymentModel from '../Models/Accounts/AssetPaymentModel.js'
import CashTransactionModel from '../Models/Cash Book/CashTransactionModel.js'
const router = express.Router()

router.post('/add/new/bank', async function (req, res) {
    let data = req.body
    console.log(data)

    const BankObject = {
        bankName: (data.bankName || "").trim(),
        accountName: data.accountName,
        accountNumber: data.accountNumber,
        branch: data.branch,
        signaturePicture: data.signaturePicture
    }

    const createBank = await BankModel.create(BankObject)
    res.json(createBank)
})

router.get('/find/bank', async function (req, res) {
    let findBank = await BankModel.find()
    res.json(findBank)
})

router.delete('/delete/bank/:id', async function (req, res) {
    try {
        await BankModel.findByIdAndDelete(req.params.id)
        res.json({ message: "Bank deleted" })
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message })
    }
})

router.put('/update/bank/:id', async function (req, res) {
    try {
        let updated = await BankModel.findByIdAndUpdate(
            req.params.id,
            {
                bankName: req.body.bankName,
                accountName: req.body.accountName,
                accountNumber: req.body.accountNumber,
                branch: req.body.branch,
                balance: req.body.balance,
            },
            { new: true }
        )
        res.json(updated)
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message })
    }
})

router.get('/bank/ledger/:bankId', async function (req, res) {
    try {
        console.log(">>> LEDGER FETCH bankId:", req.params.bankId)
        let transactions = await BankTransactionModel.find({
            bankId: req.params.bankId,
            status: "approved"
        })
        console.log(">>> LEDGER MATCHED:", transactions.length)

        transactions.sort((a, b) => new Date(a.date) - new Date(b.date))

        let runningBalance = 0
        let entries = transactions.map((t) => {
            runningBalance = runningBalance + (Number(t.debit) || 0) - (Number(t.credit) || 0)
            return {
                date: t.date,
                description: t.description || "",
                voucherNo: t.voucherNo || "",
                debit: Number(t.debit) || 0,
                credit: Number(t.credit) || 0,
                balance: runningBalance,
            }
        })

        res.json({ entries, closingBalance: runningBalance })
    } catch (err) {
        console.log("BANK LEDGER ERROR:", err)
        res.status(500).json({ message: err.message })
    }
})



router.get('/fix/bank/approve', async function (req, res) {
    let bank = await BankTransactionModel.updateMany(
        { status: "pending" },
        { status: "approved" }
    )
    let supplier = await SupplierPaymentsModel.updateMany(
        { voucherNo: { $regex: /^FT/ }, status: "pending" },
        { status: "approved" }
    )
    res.json({
        message: "Done",
        bankUpdated: bank.modifiedCount,
        customerUpdated: supplier.modifiedCount
    })
})

router.get('/debug/bank/all', async function (req, res) {
    let all = await BankTransactionModel.find({})
    res.json(all)
})

router.get('/fix/bank/backfill-id', async function (req, res) {
    try {
        let banks = await BankModel.find()
        let updatedTotal = 0

        for (let bank of banks) {
            // is bank ke naam wali purani entries ko iska _id do
            let r = await BankTransactionModel.updateMany(
                { bankName: bank.bankName, $or: [{ bankId: "" }, { bankId: { $exists: false } }] },
                { bankId: bank._id.toString() }
            )
            updatedTotal += r.modifiedCount
        }

        res.json({ message: "Done", updated: updatedTotal })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.get('/customer-transactions/all', async function (req, res) {
    let list = await SupplierPaymentsModel.find({
        fromCustomer: { $exists: true, $ne: "" }
    }).sort({ date: -1 })
    res.json(list)
})

router.put('/bank-transaction/update/:id', async function (req, res) {
    try {
        let updated = await BankTransactionModel.findByIdAndUpdate(
            req.params.id,
            {
                date: req.body.date,
                description: req.body.description,
                debit: Number(req.body.debit) || 0,
                credit: Number(req.body.credit) || 0,
            },
            { new: true }
        )

        if (updated && updated.voucherNo) {
            let amount = (Number(req.body.debit) || 0) + (Number(req.body.credit) || 0)

            let payments = await SupplierPaymentsModel.find({ voucherNo: updated.voucherNo })

            for (let pay of payments) {
                let updateObj = {
                    date: req.body.date,
                    remark: req.body.description,
                    totalAmount: amount,
                }
                if (pay.allocations && pay.allocations.length > 0) {
                    updateObj.allocations = pay.allocations.map((a) => ({
                        supplierName: a.supplierName,
                        amount: amount,
                    }))
                }
                await SupplierPaymentsModel.findByIdAndUpdate(pay._id, { $set: updateObj }, { new: true })
            }

            let amountAsset = (Number(req.body.debit) || 0) + (Number(req.body.credit) || 0)
            await AssetPaymentModel.updateMany(
                { voucherNo: updated.voucherNo },
                {
                    date: req.body.date,
                    remark: req.body.description,
                    amount: amountAsset,
                }
            )
            let amountCash = (Number(req.body.debit) || 0) + (Number(req.body.credit) || 0)
            let cashEntries = await CashTransactionModel.find({ voucherNo: updated.voucherNo })
            for (let ct of cashEntries) {
                let cashObj = {
                    date: req.body.date,
                    description: req.body.description,
                }
                if (Number(ct.debit) > 0) cashObj.debit = amountCash
                if (Number(ct.credit) > 0) cashObj.credit = amountCash
                await CashTransactionModel.findByIdAndUpdate(ct._id, { $set: cashObj })
            }
        }

        res.json({ success: true, data: updated })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})


export default router