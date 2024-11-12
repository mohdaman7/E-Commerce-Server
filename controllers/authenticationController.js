import User from '../models/userModel' 
import express from 'express'
import UserAuthJoi from '../validation/Userauthjoi'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const app = express();
app.use(express.json())

export const signup = async (req, res, next) => {
    try {
      // collect value in body
      const checkJoi = await UserAuthJoi.validateAsync(req.body);
      // Checking if this email already exists
      const existsUser = await User.findOne({ email: checkJoi.email });
      if (existsUser) {
        return res.status(409).json({ message: "Email is already registered!" });
      }
  
      //Hashing Password
      const hashedPassword = bcrypt.hashSync(checkJoi.password, 10);
  
      //Add new user
      const newUser = new User({
        username: checkJoi.username,
        email: checkJoi.email,
        password: hashedPassword,
      });
  
      //Save user
      await newUser.save();
  
      //send response
      return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      // send serve error response
     return res.status(200).json({ message: "Server error" });
      next(error);
    }
};

export const login = async (req, res, next) => {
    try {
      //collect data in body
      const { email, password } = req.body;
      // check email found or not found
      const user = await User.findOne({ email:email });
       // admin blocking checking
       if(user.isDeleted === true ) return res.status(210).json({message:"Admin Blocked"});
       if (!user) {
        // user not found response send
        return res.status(230).json({ message: "User not found" });
      }
  
      // check match password
      const passwordMatch = bcrypt.compareSync(password, user.password);
  
      // check invalid or valid
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
      //jwt setting
      const token = jwt.sign({ id: user._id }, process.env.USER_JWT);
      const { password: hashedPassword, ...data } = user._doc;
      const expiryDate = new Date(Date.now() + 60 * 1000);
  
      //cookie setting
      res
        .cookie("Access_Token", token, { httpOnly: true, expire: expiryDate })
        .status(200)
        .json({message:'User Login success fully',user:data , token});
    } catch (error) {
      // send response server error
      res.status(500).json({ message: "Server error" });
      next(error);
    }
  };