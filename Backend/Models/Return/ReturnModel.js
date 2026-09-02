import mongoose from "mongoose";

const ReturnSchema = new mongoose.Schema({
    returnNo: { type: String },
    gatePass: { type: String },
    customerName: { type: String },
    date: { type: Date },
    showRate: { type: String },
    returnType: { type: String },
    previousAmount: { type: String },
    items: { type: Array },
    grandTotal: { type: Number },
    saleBy: { type: String },
}, { timestamps: true })

const ReturnModel = mongoose.model('return', ReturnSchema)
export default ReturnModel