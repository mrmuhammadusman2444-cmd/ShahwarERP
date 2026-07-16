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
    freightCharges: { type: String },
    previousAmount: { type: String },
})

const SaleModel = mongoose.model('sale', NewSaleSchema)
export default SaleModel