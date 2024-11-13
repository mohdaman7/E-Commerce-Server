import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import path from 'path';
import productRoutes from './routes/productRoutes'

const PORT = process.env.PORT || 3000;
const app=express()
app.use(express.json())

app.use("/api/users",authRoutes)

app.use(express.static(__dirname))

mongoose.connect('mongodb://localhost:27017/testdb')
.then(()=>console.log("DB Connected"))
.catch((err) => console.log(err))



app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})

