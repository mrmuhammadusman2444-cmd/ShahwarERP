import mongoose from "mongoose";

const SupplierPaymentSchema = new mongoose.Schema({

    date: { type: Date },
    paymentType: {
        type: String,
        enum: ["Cash Payment", "Bank Transfer", "Cheque", "Online Transfer"],
        default: "Cash Payment"
    },
    fromCustomer: { type: String },
    bankName: { type: String, default: "" },
    voucherNo: { type: String },
    remark: { type: String },
    amountInWords: { type: String },

    allocations: [
        {
            supplierName: { type: String },
            code: { type: String },
            amount: { type: Number, default: 0 },
        }
    ],

    totalAmount: { type: Number, default: 0 },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    rejectReason: { type: String, default: "" },
    fromType: { type: String, default: "" },
    toType: { type: String, default: "" },
    toOther: { type: String, default: "" },

}, { timestamps: true })

const SupplierPaymentModel = mongoose.model('SupplierPayment', SupplierPaymentSchema)
export default SupplierPaymentModel