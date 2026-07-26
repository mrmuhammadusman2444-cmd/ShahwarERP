import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
    supplierName: { type: String },
    purchaseDate: { type: Date },
    factory: { type: String },
    builtyNo: { type: String },
    vehicleNo: { type: String },
    receivedBy: { type: String },
    invoiceNo: { type: String },
    gatePassNo: { type: String },
    Details: { type: String },
    items: { type: Array },
    freightCharges: { type: String },
    totalAmount: { type: Number },
    totalDiscount: { type: Number },
    grandTotal: { type: Number },
})

const PurchaseModel = mongoose.model('purchase', PurchaseSchema)
export default PurchaseModel