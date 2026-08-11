import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({

    firstName: {
        type: String,

    },
    lastName: {
        type: String,

    },
    designation: {
        type: String

    },
    phone: {
        type: String,

    },
    rateType: {
        type: String,
        enum: [ "Hourly", "Salary", "" ],
        default: ""
    },
    hourRateSalary:
        { type: Number, default: 0 },

    email: {
        type: String,

    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", ""],
        default: ""
    },
    addressLine1: {
        type: String,

    },
    addressLine2: {
        type: String,

    },
    picture: {
        type: String,

    },
    country: {
        id: {
            type: Number
        },
        name: {
            type: String
        },

    },
    city: {
        type: String,

    },
    zipCode: {
        type: String,

    }
}, { timestamps: true });

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
export default EmployeeModel;