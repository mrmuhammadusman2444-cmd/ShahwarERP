import express from 'express'
import CashTransactionModel from '../Models/Cash Book/CashTransactionModel.js'

const router = express.Router()

// ── Cash Book (approved cash entries + running balance) ──
router.get('/cashbook', async function (req, res) {
    try {
        let transactions = await CashTransactionModel.find({ status: "approved" })
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
        res.status(500).json({ message: err.message })
    }
})

export default router