import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({

   
    email: {
        type: String
    },
   
    password: {
        type: String
    },
   
 
    
    
})

const LoginModel = mongoose.model('Login', LoginSchema)
export default LoginModel