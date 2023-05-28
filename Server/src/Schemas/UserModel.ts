import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    type:{type:String},
    first_name:{type:String},
    last_name:{type:String},
    password:{type:String},
    phone:{type:String},
    email:{type:String},

})

export const UserModel = mongoose.model('users', UserSchema);