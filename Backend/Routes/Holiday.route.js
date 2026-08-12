import express from 'express'
import HolidayModel from '../Models/Employee/HolidayModel.js'



const router = express.Router()

router.post('/add/holiday', async function (req, res) {
    try {
        let holiday = await HolidayModel.create({
            date: req.body.date,
            name: req.body.name,
        })
        res.json(holiday)
    } catch (err) {
        res.status(500).json({ message: "Add failed", error: err.message })
    }
})

router.get('/find/holidays', async function (req, res) {
    try {
        let holidays = await HolidayModel.find().sort({ date: 1 })
        res.json(holidays)
    } catch (err) {
        res.status(500).json({ message: "Fetch failed", error: err.message })
    }
})

router.delete('/delete/holiday/:id', async function (req, res) {
    try {
        await HolidayModel.findByIdAndDelete(req.params.id)
        res.json({ message: "Holiday deleted" })
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message })
    }
})

export default router