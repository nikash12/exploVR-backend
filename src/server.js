import dotenv from 'dotenv';
import express from 'express';

dotenv.config()
const app = express();
const port = process.env.PORT || 2000;

var data = [
    {
        names:"NIkash",
        age:19
    },
    {
        names:"adidais",
        age:21
    },
]

app.get('/', (req,res)=>{
    res.json(data);
})

app.listen(port,()=>{
    console.log("Port is on "+port);
})