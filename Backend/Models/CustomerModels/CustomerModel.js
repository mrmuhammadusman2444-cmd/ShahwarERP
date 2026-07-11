import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({

    customerName: {
        type: String
    },

    email: {
        type: String
    },
    phoneNo: {
        type: Number
    },
    wareHouse: {
        type: String
    },
    amountLimit: {
        type: Number
    },
    CustomerProductRate: {
        type: String
    },
    scheme: {
        type: String
    },
    customerCredits: {
        type: Number
    },
    PreviouseCreditsBalance: {
        type: Number
    },

})

const CustomerModel = mongoose.model('Customer', CustomerSchema)
export default CustomerModel