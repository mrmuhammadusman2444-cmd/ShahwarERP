import mongoose from "mongoose";

const CustomerTallySchema = new mongoose.Schema({
    voucherNo: { type: String },
    customerName: { type: String },
    date: { type: Date },
    remarks: { type: String, default: "" },
}, { timestamps: true })

const CustomerTallyModel = mongoose.model('customertally', CustomerTallySchema)
export default CustomerTallyModel