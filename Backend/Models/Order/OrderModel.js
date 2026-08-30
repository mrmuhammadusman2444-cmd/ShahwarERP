import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    orderNo: { type: String },
    customerName: { type: String },
    orderDate: { type: Date },
    deliveryDate: { type: Date },
    items: { type: Array },
    totalWeight: { type: Number },
    grandTotal: { type: Number },
    saleBy: { type: String },
    status: { type: String, default: "pending" },
}, { timestamps: true })

const OrderModel = mongoose.model('order', OrderSchema)
export default OrderModel