import mongoose, { Schema } from "mongoose";

const videoSchema = new mongoose.Schema({
    videoFile:{
        type: String, //cloud
        required: true,
    },
    thumbnail:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    duration:{
        type: String,  
        required: true
    },
    views:{
        type: Number,
        default:0
    },
    isPublished:{
        type: Boolean,
        required: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
    
},{timestamps:true})

export const Video = mongoose.model("Video",videoSchema)