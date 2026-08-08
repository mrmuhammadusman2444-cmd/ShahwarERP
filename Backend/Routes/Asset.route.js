import express from 'express'
import AssetModel from '../Models/Assets/AssetModel.js'
const router = express.Router()


router.post('/add/new/asset', async function (req,res) {
    let data = req.body
    const AssetObject={
        assetName:data.assetName,
        assetType:data.assetType,
        location:data.location,
        purchaseDate:data.purchaseDate,
        cost:data.cost,
        residualValue:data.residualValue,
        usefulLife:data.usefulLife,
        depreciationMethode:data.depreciationMethode,
        description:data.description
    }
 const createAsset= await AssetModel.create(AssetObject)
    res.json(createAsset)
    
})

router.get('/find/asset', async function (req, res) {
    let findAssets = await AssetModel.find()
    res.json(findAssets)      
})

export default router