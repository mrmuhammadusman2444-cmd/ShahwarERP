import express from 'express'
import PurchaseModel from '../Models/Purchase/PurchaseModel.js'
const router = express.Router()


router.post('/new/purchase', async function (req, res) {
    let data = req.body
    console.log(data)

    let newPurchase = {
        supplierName: data.supplierName,
        factory: data.factory,
        vehicleNo: data.vehicleNo,
        invoiceNo: data.invoiceNo,
        Details: data.Details,
        purchaseData: data.purchaseDate,
        builtyNo: data.builtyNo,
        receivedBy: data.receivedBy,
        gatePassNo: data.gatePassNo,
    };
    let createPurchase =await PurchaseModel.create(newPurchase)
    res.json(createPurchase)




    
    
})


export default router