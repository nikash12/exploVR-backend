import mongoose from 'mongoose'

const connectDB = async() =>{
    try{
        var result = await mongoose.connect('mongodb+srv://nikash:nikash13579@nikash.2r3b9o8.mongodb.net/nikash');
        console.log('Connected to MongoDataBase');
    }
    catch(error){
        console.log("Not Connected to MongoDataBase "+ error);
    }
}

export {connectDB};