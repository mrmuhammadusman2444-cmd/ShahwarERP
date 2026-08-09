import express from 'express'
import AssetModel from '../Models/Assets/AssetModel.js'
const router = express.Router()


router.post('/add/new/asset', async function (req, res) {
    let data = req.body
    const AssetObject = {
        assetName: data.assetName,
        assetType: data.assetType,
        location: data.location,
        purchaseDate: data.purchaseDate,
        cost: data.cost,
        residualValue: data.residualValue,
        usefulLife: data.usefulLife,
        depreciationMethode: data.depreciationMethode,
        description: data.description
    }
    const createAsset = await AssetModel.create(AssetObject)
    res.json(createAsset)

})

router.get('/find/asset', async function (req, res) {
    let findAssets = await AssetModel.find()
    res.json(findAssets)
})

router.post('/delete/asset/:id', async (req, res) => {

    await AssetModel.findByIdAndDelete(req.params.id)
    res.json({ message: "Asset deleted" })


})

router.put('/update/asset/:id', async function (req, res) {
    try {
        let updatedAsset = await AssetModel.findByIdAndUpdate(
            req.params.id,
            {
                assetName: req.body.assetName,
                assetType: req.body.assetType,
                location: req.body.location,
                purchaseDate: req.body.purchaseDate,
                cost: req.body.cost,
                residualValue: req.body.residualValue,
                usefulLife: req.body.usefulLife,
                depreciationMethod: req.body.depreciationMethod,
                description: req.body.description,
            },
            { new: true }
        )
        res.json(updatedAsset)
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message })
    }
})


export default router