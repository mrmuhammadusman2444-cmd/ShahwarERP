import mongoose from "mongoose";

const NewSaleSchema = new mongoose.Schema({
    gatePass: { type: String },
    customerName: { type: String },
    Date: { type: Date },
    showRate: {
        type: String,
        enum: ["Distributor Rate", "Retail Rate", "Wholesale Rate"],
        default: "Distributor Rate"
    },
    invoiceNo: { type: String },
    freightCharges: { type: String },
    previousAmount: { type: String },
    items: { type: Array },
    grandTotal: { type: Number },
    totalCartons: { type: Number },
    saleBy: { type: String },
    order: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    rejectReason: { type: String, default: "" },
})

const SaleModel = mongoose.model('sale', NewSaleSchema)
export default SaleModel