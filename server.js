import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';



config();

const PORT = process.env.PORT || 3000;
const DB = process.env.DB;
const app = express(express.json());

mongoose.connect(DB)
.then(()=>console.log("DB Connected"))
.catch((err) => console.log(err))



app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})

