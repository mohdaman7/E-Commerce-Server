import express from 'express';
import {login, register} from '../controllers/authenticationController.js';
import multer from 'multer';
import uploadImage from '../middlewares/uploadmiddleware.js';

const route = express.Router();
const upload = multer(); 

route.post('/register',uploadImage,register)
route.post('/login',login)

export default route