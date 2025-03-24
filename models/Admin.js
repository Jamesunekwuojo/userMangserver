import mongoose from "mongoose"



const adminSchema= new mongoose.Schema ({

    email: {type: String},
    password: {type: String},
    otp:String,
    otpExpiry:Date
 

})


const adminModel = mongoose.model('Admin', adminSchema)

export {adminModel as Admin}
