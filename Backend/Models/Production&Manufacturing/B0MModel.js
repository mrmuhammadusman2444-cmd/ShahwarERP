import mongoose from "mongoose";

const BOMSchema = new mongoose.Schema({
    bomCode: { type: String },
    fgItemName: { type: String },
    fgItemCode: { type: String },
    batchSize: { type: Number, default: 1 },
    batchUnit: { type: String, default: "" },
    items: { type: Array },
    remark: { type: String, default: "" },
}, { timestamps: true })

const BOMModel = mongoose.model('bom', BOMSchema)
export default BOMModel