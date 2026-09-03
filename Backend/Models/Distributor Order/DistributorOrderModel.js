import mongoose from "mongoose";

const DistributorOrderSchema = new mongoose.Schema({
    orderNo: { type: String },
    distributorId: { type: String },
    distributorName: { type: String },
    date: { type: Date },
    items: { type: Array },
    grandTotal: { type: Number },
    totalWeight: { type: Number },
    remark: { type: String, default: "" },
    status: { type: String, enum: ["placed", "processing", "completed"], default: "placed" },
    rejectReason: { type: String, default: "" },
}, { timestamps: true })

const DistributorOrderModel = mongoose.model('distributororder', DistributorOrderSchema)
export default DistributorOrderModel