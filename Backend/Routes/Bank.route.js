import express from 'express'
import BankModel from '../Models/Bank/BankModel.js'
const router = express.Router()

router.post('/add/new/bank', async function (req, res) {
    let data = req.body
    console.log(data)

    const BankObject = {
        bankName: data.bankName,
        accountName: data.accountName,
        accountNumber: data.accountNumber,
        branch: data.branch,
        signaturePicture: data.signaturePicture
    }

    const createBank = await BankModel.create(BankObject)
    res.json(createBank)

})

router.get('/find/bank', async function (req, res) {
    let findBank = await BankModel.find()
    res.json(findBank)

})

router.delete('/delete/bank/:id', async function (req, res) {
    try {
        await BankModel.findByIdAndDelete(req.params.id)
        res.json({ message: "Bank deleted" })
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message })
    }
})
router.put('/update/bank/:id', async function (req, res) {
    try {
        let updated = await BankModel.findByIdAndUpdate(
            req.params.id,
            {
                bankName: req.body.bankName,
                accountName: req.body.accountName,
                accountNumber: req.body.accountNumber,
                branch: req.body.branch,
                balance: req.body.balance,
            },
            { new: true }
        )
        res.json(updated)
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message })
    }
})
export default router