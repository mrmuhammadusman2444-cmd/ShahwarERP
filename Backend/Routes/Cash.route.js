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

router.post('/add/cash-adjustment', async function (req, res) {
    try {
        let data = req.body

        let lastVoucher = await CashTransactionModel
            .findOne({ voucherNo: { $regex: /^CHV-/ } })
            .sort({ createdAt: -1 })

        let voucherNo = "CHV-0001"
        if (lastVoucher && lastVoucher.voucherNo) {
            let lastNumber = parseInt(lastVoucher.voucherNo.replace("CHV-", ""))
            voucherNo = `CHV-${String(lastNumber + 1).padStart(4, "0")}`
        }

        let isDebit = data.adjustmentType === "debit"

        let entries = (data.lines || []).map((line) => ({
            date: data.date,
            description: `Cash Adjustment${line.code ? " [" + line.code + "]" : ""}${data.remark ? " - " + data.remark : ""}`,
            voucherNo: voucherNo,
            debit: isDebit ? (Number(line.amount) || 0) : 0,
            credit: !isDebit ? (Number(line.amount) || 0) : 0,
            source: "cash-adjustment",
            status: "approved",
        }))

        let created = await CashTransactionModel.insertMany(entries)

        res.json({ success: true, voucherNo: voucherNo, data: created })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router