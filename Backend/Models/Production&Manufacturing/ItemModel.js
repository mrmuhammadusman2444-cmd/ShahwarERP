import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    itemCode: { type: String },
    itemName: { type: String },
    category: { type: String, enum: ["RM", "PM", "WIP", "FG"], default: "RM" },
    unitOfMeasure: { type: String, default: "" },
    currentStock: { type: Number, default: 0 },
    reorderLevel: { type: Number, default: 0 },
    costPerUnit: { type: Number, default: 0 },
    batchTracking: { type: Boolean, default: false },
    warehouseLocation: { type: String, default: "" },
    description: { type: String, default: "" },
}, { timestamps: true })

const ItemModel = mongoose.model('item', ItemSchema)
export default ItemModel