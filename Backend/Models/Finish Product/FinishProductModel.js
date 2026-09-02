import mongoose from "mongoose";

const FinishProductSchema = new mongoose.Schema({
    finishNo: { type: String },
    employeeName: { type: String },
    date: { type: Date },
    items: { type: Array },
    totalWeight: { type: Number },
    saleBy: { type: String },
    status: { type: String, default: "pending" },
}, { timestamps: true })

const FinishProductModel = mongoose.model('finishproduct', FinishProductSchema)
export default FinishProductModel