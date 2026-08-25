import mongoose from 'mongoose'

const cashTransactionSchema = new mongoose.Schema({
    date: { type: Date },
    description: { type: String, default: "" },
    voucherNo: { type: String, default: "" },
    debit: { type: Number, default: 0 },    
    credit: { type: Number, default: 0 },   
    source: { type: String, default: "" },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
}, { timestamps: true })

const CashTransactionModel = mongoose.model('CashTransaction', cashTransactionSchema)

export default CashTransactionModel