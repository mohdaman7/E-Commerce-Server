import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const userToken = (req,res,next) => {
    try{
        const token = req.headers["authorization"];
        if(!token){
            return res.status(403).json({message: "Token not provided"});
        }
        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                res.status(401).json({message:"unauthorized"})
            }
            req.email = decode.email;
            next();
        })
    }catch(error){
        res.status(500).json({message: "Server error"});
        next(error);
    }
}
