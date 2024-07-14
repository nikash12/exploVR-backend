import dotenv from 'dotenv'
import { connectDB } from './db/index.js';
import app from './app.js'


dotenv.config();
const port = 2000

try{
    connectDB().then(() =>
        app.listen(port, () => console.log("Listening  on port: "+port))
    ).catch((error) => console.log("Couldnt connect to DB "+error))
}
catch(error){
    console.log(error);
}




