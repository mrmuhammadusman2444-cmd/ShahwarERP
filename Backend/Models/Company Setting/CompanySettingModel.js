import mongoose from "mongoose";

const CompanySettingsSchema = new mongoose.Schema({
    companyName: {
        type: String,
        default: "Shahwar Foods"
    },
    businessType: {
        type: String,
        default: "Food & Beverages"
    },
    phone: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: "info@shahwarfoods.com"
    },
    address: {
        type: String,
        default: ""
    },
    currency: {
        type: String,
        default: "PKR"
    },
    dateFormat: {
        type: String,
        default: "DD/MM/YYYY"
    },
    language: {
        type: String,
        default: "English"
    },
    timeZone: {
        type: String,
        default: "Asia/Karachi (UTC+5)"
    },
}, { timestamps: true });

const CompanySettingsModel = mongoose.model("CompanySettings", CompanySettingsSchema);
export default CompanySettingsModel;