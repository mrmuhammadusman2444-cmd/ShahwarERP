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
        type: Number
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
})

const SignupModel = mongoose.model('Registration', SignupSchema)
export default SignupModel