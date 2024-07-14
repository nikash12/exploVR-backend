import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connect = async () =>{
    try{
        await mongoose.connect(`${process.env.MONGO_DB}/${process.env.DB_NAME}`)
        console.log(`CONNECTED TO ${process.env.DB_NAME}`)
    }
    catch(err){
        console.log("Error in connecting to db",err.message)
    }
}
