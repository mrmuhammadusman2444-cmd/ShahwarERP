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
    phoneNo:{
        type:Number
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String
    },
    
    
})

const SignupModel = mongoose.model('Registration', SignupSchema)
export default SignupModel