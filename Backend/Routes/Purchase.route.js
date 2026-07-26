import express from 'express'
import PurchaseModel from '../Models/Purchase/PurchaseModel.js'
const router = express.Router()

router.post('/new/purchase', async function (req, res) {
    try {
        let data = req.body

        let newPurchase = {
            supplierName: data.supplierName,
            factory: data.factory,
            vehicleNo: data.vehicleNo,
            invoiceNo: data.invoiceNo,
            Details: data.Details,
            purchaseDate: data.purchaseDate,
            builtyNo: data.builtyNo,
            receivedBy: data.receivedBy,
            gatePassNo: data.gatePassNo,
            items: data.items,
            freightCharges: data.freightCharges,
            totalAmount: data.totalAmount,
            totalDiscount: data.totalDiscount,
            grandTotal: data.grandTotal,
        }

        let createPurchase = await PurchaseModel.create(newPurchase)
        res.json(createPurchase)
    } catch (err) {
        console.log("PURCHASE ERROR:", err.message)
        res.status(500).json({ message: err.message })
    }
})

router.get('/find/purchase', async function (req, res) {
    try {
        let purchases = await PurchaseModel.find()
        res.json(purchases)
    } catch (err) {
        console.log("FIND ERROR:", err.message)
        res.status(500).json({ message: err.message })
    }
})
router.delete('/delete/purchase/:id', async function (req, res) {
    try {
        let id = req.params.id
        let deletedPurchase = await PurchaseModel.findByIdAndDelete(id)

        if (!deletedPurchase) {
            return res.status(404).json({ message: "Purchase not found" })
        }

        res.json({ message: "Purchase deleted successfully" })
    } catch (err) {
        console.log("DELETE ERROR:", err.message)
        res.status(500).json({ message: err.message })
    }
})

export default router