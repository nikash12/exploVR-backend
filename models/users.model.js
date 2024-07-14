import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config();
const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index:true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
    },
    fullName:{
        type: String,
        unique: true,
        index:true,
        trim:true
    },
    password:{
        type: String,
        required: [true,"Password is must"]
    },
    refreshToken:{
        type: String
    },
    favourites:{
        type: [String]
    }

},{timestamps:true})



userSchema.methods.passwordChecker = async function (pass) {
    if (this.password === pass) {
        return pass;
    }
    return undefined;
}




userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id:this._id,
        userName:this.userName
    },process.env.ACCESS_SECRET_TOKEN,
    {
        expiresIn:"1d"
    }
)}

userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "10d"
        }
    )
}


userSchema.methods.checkPassword = async function(pass){
    return pass == this.password
}

export const User = mongoose.model("User",userSchema)



/* const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index:true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
    },
    fullname:{
        type: String,
        unique: true,
        index:true,
        trim:true
    },
    avatar:{
        type: String //cloud 
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type: String,
        required: [true,"Password is must"]
    },
    refreshToken:{
        type: String,
        
    }

},{timestamps:true})
*/