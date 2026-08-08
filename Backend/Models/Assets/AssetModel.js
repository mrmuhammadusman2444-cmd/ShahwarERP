import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema({
    assetName: { type: String },
    assetType: { type: String },
    location: { type: String },
    purchaseDate: { type: Date },
    cost: { type: Number, default: 0 },
    residualValue: { type: Number, default: 0 },
    usefulLife: { type: Number, default: 0 },   
    depreciationMethod: { type: String },
    description: { type: String },
}, { timestamps: true })

const AssetModel = mongoose.model('Asset', AssetSchema)

export default AssetModel