import express from 'express'
import SalaryAdvanceModel from '../Models/Salary/SalaryAdvanceModel.js'
const router = express.Router()

router.post('/add/salary-advance', async function (req, res) {
    try {
        let advance = await SalaryAdvanceModel.create({
            date: req.body.date,
            employeeId: req.body.employeeId,
            advanceType: req.body.advanceType,
            category: req.body.category,
            amount: req.body.amount,
            details: req.body.details,
        })
        res.json(advance)
    } catch (err) {
        res.status(500).json({ message: "Save failed", error: err.message })
    }
})

router.get('/find/salary-advances/:employeeId', async function (req, res) {
    try {
        const { from, to } = req.query
        let filter = { employeeId: req.params.employeeId }
        if (from && to) {
            filter.date = { $gte: from, $lte: to }
        }
        let advances = await SalaryAdvanceModel.find(filter).sort({ date: 1 })
        res.json(advances)
    } catch (err) {
        res.status(500).json({ message: "Fetch failed", error: err.message })
    }
})

export default router