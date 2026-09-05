import mongoose from "mongoose";

const SupplierTallySchema = new mongoose.Schema({
    voucherNo: { type: String },
    supplierName: { type: String },
    date: { type: Date },
    remarks: { type: String, default: "" },
}, { timestamps: true })

const SupplierTallyModel = mongoose.model('suppliertally', SupplierTallySchema)
export default SupplierTallyModel