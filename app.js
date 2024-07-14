import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
const app = express();
dotenv.config()

app.use(cors({
    origin : "*",
    credentials: true
}))
app.use(bodyParser.json());
export  {app};