import express from 'express'
import CompanySettingsModel from '../Models/Company Setting/CompanySettingModel.js'
const router = express.Router()

router.get('/company-settings', async function (req, res) {
    try {
        let settings = await CompanySettingsModel.findOne()
        if (!settings) {
            settings = await CompanySettingsModel.create({})
        }
        res.json(settings)
    } catch (err) {
        res.status(500).json({ message: "Fetch failed", error: err.message })
    }
})

router.post('/update/company-settings', async function (req, res) {
    try {
        let settings = await CompanySettingsModel.findOne()
        if (!settings) {
            settings = await CompanySettingsModel.create(req.body)
        } else {
            settings = await CompanySettingsModel.findByIdAndUpdate(settings._id, req.body, { new: true })
        }
        res.json(settings)
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message })
    }
})

export default router