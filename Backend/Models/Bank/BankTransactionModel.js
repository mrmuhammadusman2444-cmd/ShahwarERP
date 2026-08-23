import mongoose from "mongoose"

const BankTransactionSchema = new mongoose.Schema({
    bankName: { type: String },
    date: { type: Date },
    description: { type: String },
    voucherNo: { type: String },
    debit: { type: Number, default: 0 },
    credit: { type: Number, default: 0 },
    source: { type: String },
    status: { type: String, default: "pending" },
    bankId: { type: String, default: "" },
}, { timestamps: true })

const BankTransactionModel = mongoose.model("BankTransaction", BankTransactionSchema)
export default BankTransactionModel