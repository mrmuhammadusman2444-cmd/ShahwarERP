import express from 'express'
import UnitModel from '../Models/Products/UnitModel.js'



const router = express.Router()


router.post('/unit', async function (req, res) {
    let data = req.body
    let Unit = {
        unitName: data.unitName,
        shortCode: data.shortCode,
        Description: data.Description
    }

    let createUnit = await UnitModel.create(Unit)

    res.json({ success: true, createUnit })

})

router.get('/find/unit', async function (req, res) {

    let find = await UnitModel.find()
    res.json({ success: true, find })

})

router.post('/delete/unit', async function (req, res) {
    console.log("DELETE UNIT HIT:", req.body)
    try {
        let deleteUnit = await UnitModel.findByIdAndDelete(req.body._id)
        console.log("DELETE RESULT:", deleteUnit)   // 👈 yeh add karein
        if (!deleteUnit) {
            return res.json({ success: false, message: "Unit not found" })
        }
        res.json({ success: true, data: deleteUnit })
    } catch (err) {
        console.log("DELETE UNIT ERROR:", err.message)
        res.status(500).json({ success: false, message: err.message })
    }
})

export default router