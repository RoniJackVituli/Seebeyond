import mongoose from "mongoose";
import { ObjectId } from 'mongodb';
const UserSchema = new mongoose.Schema({
    type:{type:String},
    first_name:{type:String},
    last_name:{type:String},
    password:{type:String},
    phone:{type:String},
    email:{type:String},
    available:{type:Boolean ,default:true},
    rate:{type:Number ,default:0},
    blind:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    volunteer:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    reviews:[
        {
            title:String,
            content:String,
            rate:Number,
        }
    ]

})

export const UserModel = mongoose.model('users', UserSchema);