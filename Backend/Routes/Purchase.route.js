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

router.get('/find/purchase/:id', async function (req, res) {
    try {
        let id = req.params.id
        let purchase = await PurchaseModel.findById(id)

        if (!purchase) {
            return res.status(404).json({ message: "Purchase not found" })
        }

        res.json(purchase)
    } catch (err) {
        console.log("FIND ONE ERROR:", err.message)
        res.status(500).json({ message: err.message })
    }
})

router.put('/update/purchase/:id', async function (req, res) {
    try {
        let id = req.params.id
        let data = req.body

        let updatedData = {
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

        let updatedPurchase = await PurchaseModel.findByIdAndUpdate(id, updatedData, { new: true })

        if (!updatedPurchase) {
            return res.status(404).json({ message: "Purchase not found" })
        }

        res.json(updatedPurchase)
    } catch (err) {
        console.log("UPDATE ERROR:", err.message)
        res.status(500).json({ message: err.message })
    }
})
router.post('/approve/purchase/:id', async function (req, res) {
    try {
        let id = req.params.id
        let approvedPurchase = await PurchaseModel.findByIdAndUpdate(
            id,
            { status: "approved" },
            { new: true }
        )

        if (!approvedPurchase) {
            return res.status(404).json({ message: "Purchase not found" })
        }

        res.json(approvedPurchase)
    } catch (err) {
        console.log("APPROVE ERROR:", err.message)
        res.status(500).json({ message: err.message })
    }
})
router.put('/reject/purchase/:id', async function (req, res) {
    try {
        let id = req.params.id
        let rejectedPurchase = await PurchaseModel.findByIdAndUpdate(
            id,
            { status: "rejected", rejectReason: req.body.rejectReason || "" },
            { new: true }
        )

        if (!rejectedPurchase) {
            return res.status(404).json({ message: "Purchase not found" })
        }

        res.json(rejectedPurchase)
    } catch (err) {
        console.log("REJECT ERROR:", err.message)
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