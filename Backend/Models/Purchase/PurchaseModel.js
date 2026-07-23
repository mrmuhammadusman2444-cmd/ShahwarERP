import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
    supplier: { type: String },
    purchaseDate: { type: Date },
    factory: { type: String },
    builtyNo: { type: String },
    vehicleNo: { type: String },
    receivedBy: { type: String },
    invoiceNo: { type: String },
    gatePassNo: { type: String },
    details: { type: String },
})

const PurchaseModel = mongoose.model('purchase', PurchaseSchema)
export default PurchaseModel