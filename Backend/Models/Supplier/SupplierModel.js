import mongoose from 'mongoose'

const SupplierSchema = new mongoose.Schema({
    supplierName: { type: String },
    email: { type: String },
    phoneNo: { type: String },
    address: { type: String },
    supplierDetails: { type: String },
    supplierCredits: { type: Number, default: 0 },
    previousCreditsBalance: { type: Number, default: 0 },
}, { timestamps: true })

const SupplierModel = mongoose.model('Supplier', SupplierSchema)

export default SupplierModel