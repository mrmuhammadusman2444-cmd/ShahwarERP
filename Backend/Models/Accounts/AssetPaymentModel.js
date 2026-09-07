import mongoose from 'mongoose'

const AssetPaymentSchema = new mongoose.Schema({
    voucherNo: {
        type: String,
    },
    date: {
        type: Date,
    },
    assetName: {
        type: String,
    },
    paymentType: {
        type: String,
    },
    bankName: {
        type: String,
    },
    supplierName: {
        type: String,
    },
    customerName: {
        type: String,
    },
    amount: {
        type: Number,
        default: 0
    },
    remark: {
        type: String,
    },
    status: {
        type: String,
        default: "pending"
    },

}, { timestamps: true })

const AssetPaymentModel = mongoose.model('AssetPayment', AssetPaymentSchema)
export default AssetPaymentModel