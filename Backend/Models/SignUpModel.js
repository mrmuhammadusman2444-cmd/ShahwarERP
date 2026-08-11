import mongoose from "mongoose";

const SignupSchema = new mongoose.Schema({

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    phoneNo: {
        type: String
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String
    },

    role: {
        type: String,
        enum: ["Admin", "Accountant", "Cash & Expense", "Raw Material", "Employee Attendance", "Stock Manager"],
        default: "Stock Manager"
    },

    permissions: {
        type: Object,
        default: {}
    },
    image: {
        type: String,
        default: ""
    },
    resetOtp: { type: String, default: "" },
    resetOtpExpiry: { type: Date, default: null },
    designation: { type: String },
    rateType: { type: String },
    hourRateSalary: { type: Number, default: 0 },
    bloodGroup: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    zipCode: { type: String },
})

const SignupModel = mongoose.model('Registration', SignupSchema)
export default SignupModel