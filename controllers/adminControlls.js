import { config } from "dotenv";
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

config()

export const login = async(req,res,next) => {
    const {email,password} = req.body;
    console.log(email,password)

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign({email},process.env.ADMIN_SECRET_KEY)

        res.cookie('access_token',token,{httpOnly:true});

        return res.status(200).json({message:"Admin logged in successfully",token});
        
    }else{
        res.status(401).json({message:"unauthorized"})
    }
}



export const viewAllusers=async(req,res,next)=>{
    const users=await User.find()
    
    if(users.length===0){
        return res.status(404).json({message:'No users in database'})
    }

    res.status(200).json(users)
}


export const adminviewUserbyid=async(req,res,next)=>{
    const {id}=req.params;

    const user=await User.findById(id).populate({
        path:'orders',
        populate:{path:'productId'}
    })

    if(!user){
        return res.status(404).json({message:'user not found'})
    }

    res.status(200).json(user)
}


export const adminviewUserByUserName = async (req,res)=>{
    const {username}=req.params

    const user=await User.find({username:{$regex:new RegExp(username,'i')}}).select('username')

    if(!user){
        return res.status(404).json({message:'No users found with usernames containing the given category name'})
    }

    res.status(200).json(user)
}


export const adminBlockUserById= async (req,res)=>{
    const {userId}=req.params;
 const userblocked= await User.findByIdAndUpdate({_id:userId},{$set:{isDeleted:true}})

 if(!userblocked){
    return res.status(404).json({message:'user not foud'})
 }

 res.status(200).json({message:'User Blocked Successfully'})

}

export const adminUnblockUserById= async (req,res)=>{
    const {userId}=req.params;
 const userblocked= await User.findByIdAndUpdate({_id:userId},{$set:{isDeleted:false}})

 if(!userblocked){
    return res.status(404).json({message:'user not foud'})
 }

 res.status(200).json({message:'User Unblocked Successfully'})

}
