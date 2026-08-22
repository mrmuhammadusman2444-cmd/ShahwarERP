import express from 'express'
import BankModel from '../Models/Bank/BankModel.js'
import BankTransactionModel from '../Models/Bank/BankTransactionModel.js'
import SupplierPaymentsModel from '../Models/Accounts/SupplierPaymentsModel.js'
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

router.get('/bank/ledger/:bankName', async function (req, res) {
    try {
        let transactions = await BankTransactionModel.find({
            bankName: req.params.bankName,
            status: "approved"
        })

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
export default router