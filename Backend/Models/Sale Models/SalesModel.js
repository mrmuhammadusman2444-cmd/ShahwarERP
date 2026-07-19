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
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
})

const SaleModel = mongoose.model('sale', NewSaleSchema)
export default SaleModel