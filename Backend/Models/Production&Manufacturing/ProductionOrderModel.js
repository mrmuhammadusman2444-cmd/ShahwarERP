import mongoose from "mongoose";

const ProductionOrderSchema = new mongoose.Schema({
    orderNo: { type: String },
    fgItemName: { type: String },
    fgItemCode: { type: String },
    quantity: { type: Number, default: 0 },
    unit: { type: String, default: "" },
    bomCode: { type: String },
    requiredMaterials: { type: Array },
    date: { type: Date },
    remark: { type: String, default: "" },
    status: { type: String, enum: ["draft", "completed", "cancelled"], default: "draft" },
}, { timestamps: true })

const ProductionOrderModel = mongoose.model('productionorder', ProductionOrderSchema)
export default ProductionOrderModel