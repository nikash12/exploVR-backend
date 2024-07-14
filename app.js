import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();



// Register routes
app.use(cors());
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


import userRouter from './routes/user.router.js';
app.use("/", userRouter );
// Export the Express application instance
export default app;

