import express from 'express'
import PurchaseModel from '../Models/Purchase/PurchaseModel.js'
import SupplierPaymentModel from '../Models/Accounts/SupplierPaymentsModel.js'
import SupplierModel from '../Models/Supplier/SupplierModel.js'
const router = express.Router()

router.post('/new/supplier', async function (req, res) {
    let data = req.body
    let supplierObject = {
        supplierName: data.supplierName,
        email: data.email,
        address: data.address,
        phoneNo: data.phoneNo,
        supplierDetails: data.supplierDetails,
        supplierCredits: data.supplierCredits,
        previousCreditsBalance: data.previousCreditsBalance
    }

    let createSupplier = await SupplierModel.create(supplierObject)
    res.json(createSupplier)
})

router.get('/find/supplier', async function (req, res) {
    let find = await SupplierModel.find()
    res.json(find)
})

router.delete('/delete/supplier/:id', async function (req, res) {
    try {
        let deleted = await SupplierModel.findByIdAndDelete(req.params.id)
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Supplier not found" })
        }
        res.json({ success: true, data: deleted })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.put('/update/supplier/:id', async function (req, res) {
    try {
        let updated = await SupplierModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(updated)
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})
router.get('/supplier/ledger/:supplierName', async function (req, res) {
    let supplierName = req.params.supplierName


    let supplier = await SupplierModel.findOne({ supplierName: supplierName })
    let openingBalance = Number(supplier?.previousCreditsBalance) || 0


    let purchases = await PurchaseModel.find({
        supplierName: supplierName,
        status: "approved"
    })


    let payments = await SupplierPaymentModel.find({
        status: "approved",
        "allocations.supplierName": supplierName
    })

    let combined = []

    purchases.forEach((pur) => {
        combined.push({
            date: pur.purchaseDate,
            description: `Purchase ${pur.invoiceNo || "-"}`,
            invoiceId: pur.invoiceNo || "",
            depositId: "",
            debit: 0,
            credit: Number(pur.grandTotal) || 0,
        })
    })

    payments.forEach((pay) => {
        let supplierAllocations = (pay.allocations || []).filter(
            (a) => a.supplierName === supplierName
        )
        let paidAmount = supplierAllocations.reduce(
            (sum, a) => sum + (Number(a.amount) || 0), 0
        )

        if (paidAmount > 0) {
            combined.push({
                date: pay.date,
                description: pay.remark ? pay.remark : `Paid ${pay.voucherNo || ""}`,
                invoiceId: "",
                depositId: pay.voucherNo || "",
                debit: paidAmount,
                credit: 0,
            })
        }
    })

    combined.sort((a, b) => {
        let aIsPayment = a.debit > 0 ? 1 : 0
        let bIsPayment = b.debit > 0 ? 1 : 0

        if (aIsPayment !== bIsPayment) {
            return aIsPayment - bIsPayment
        }
        return new Date(a.date) - new Date(b.date)
    })

    let runningBalance = openingBalance
    let entries = combined.map((item) => {
        runningBalance = runningBalance + item.credit - item.debit
        return { ...item, balance: runningBalance }
    })

    res.json({
        openingBalance: openingBalance,
        entries: entries,
        closingBalance: runningBalance,
    })
})

export default router