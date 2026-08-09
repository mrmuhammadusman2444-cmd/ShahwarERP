import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    bankName: { type: String },
    accountName: { type: String },
    accountNumber: { type: String },
    branch: { type: String },
    signaturePicture: { type: String }
},
    { timestamps: true }
);

const Bank = mongoose.model("Bank", bankSchema);

export default Bank;