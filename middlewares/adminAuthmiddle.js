import JWT from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export const adminToken=async(req,res,next)=>{
    try{
        const token=req.headers['authorization']

        if(!token){
            return res.status(404).json({message:'admin token not provided'})
        }

        JWT.verify(token,process.env.ADMIN_SECRET_KEY,(error,decode)=>{
            if(error){
               return  res.status(401).json({message:'Unauthorized'})
            }

            req.email=decode.email
            next()
        })
    }catch (error) {
        return  res.status(500).json({message:'intrenel server error'})
         
      }
}