import express from 'express'
import AddProductModel from '../Models/Products/AddProductModel.js'

const router = express.Router()

router.post('/add/new/product', async (req, res) => {
    let data = req.body
    let AddProductObject = {
        productName: data.productName,
        cartonSize: data.cartonSize,
        weight: data.weight,
        weightUnit: data.weightUnit,
        model: data.model,
        mainCategory: data.mainCategory,
        saleRawCategory: data.saleRawCategory,
        productCategory: data.productCategory,
        costPrice: data.costPrice,
        distributorPrice: data.distributorPrice,
        retailPrice: data.retailPrice,
        wholesaleRate: data.wholesaleRate,
        codOnlinePrice: data.codOnlinePrice,
        unitSchemePoint: data.unitSchemePoint,
        storeLimit: data.storeLimit
    }
    let CreationProduct = await AddProductModel.create(AddProductObject)
    res.json({ success: true, data: CreationProduct })
})

router.get('/find/product', async function (req, res) {
    let findProduct = await AddProductModel.find()
    res.json(findProduct)
})

router.post('/delete/product', async (req, res) => {
    let deleted = await AddProductModel.findByIdAndDelete(req.body._id)
    res.json({ success: true, data: deleted })
})

router.post('/update/product/:id', async function (req, res) {
    let updateProduct = await AddProductModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.json(updateProduct)
})

export default router