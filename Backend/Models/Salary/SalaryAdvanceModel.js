import mongoose from "mongoose";

const SalaryAdvanceSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    },
    employeeName: {
        type: String
    },
    advanceType: {
        type: String,
        enum: ["Payment", "Deduction"],
        default: "Payment"
    },
    category: {
        type: String,
        enum: ["Salary", "Advance", "Fine"],
        default: "Salary"
    },
    amount: {
        type: Number,
        required: true
    },
    details: {
        type: String
    },
}, { timestamps: true });

const SalaryAdvanceModel = mongoose.model("SalaryAdvance", SalaryAdvanceSchema);
export default SalaryAdvanceModel;