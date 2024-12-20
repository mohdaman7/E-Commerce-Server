import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import adminRoute from './routes/adminRoute.js'
import { fileURLToPath} from 'url';
import cors from 'cors'
import bodyParser from 'body-parser';
import multer from 'multer';
import cookieParser from 'cookie-parser';

// Fix for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();
const upload = multer(); 
app.use(express.json()); // To parse JSON payload
app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use(cors())
app.use(cookieParser())
app.use(express.json())


app.use('/api/users', authRoutes);
app.use('/api/users', productRoutes); 
app.use('/api/admin',adminRoute);


app.use(express.static(__dirname));


app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log('DB connected successfully'))
    .catch(error => console.log(error));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




