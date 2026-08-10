import express from 'express'
import AttendanceModel from '../Models/Employee/AttendenceModal.js'
const router = express.Router()

router.post('/save/attendance', async function (req, res) {
    try {
        const { date, records, markedBy } = req.body

        for (let rec of records) {
            await AttendanceModel.findOneAndUpdate(
                { employeeId: rec.employeeId, date: date },
                {
                    employeeId: rec.employeeId,
                    employeeName: rec.employeeName,
                    date: date,
                    status: rec.status,
                    halfDay: rec.halfDay,
                    shortDay: rec.shortDay,
                    overtime: rec.overtime,
                    markedBy: markedBy,
                },
                { upsert: true, new: true }
            )
        }

        res.json({ message: "Attendance saved" })
    } catch (err) {
        res.status(500).json({ message: "Save failed", error: err.message })
    }
})

router.get('/find/attendance/:date', async function (req, res) {
    try {
        let records = await AttendanceModel.find({ date: req.params.date })
        res.json(records)
    } catch (err) {
        res.status(500).json({ message: "Fetch failed", error: err.message })
    }
})

export default router