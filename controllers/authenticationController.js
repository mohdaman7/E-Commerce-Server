import User from "../models/userModel.js";
import usereauthjoi from "../validation/Userauthjoi.js";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res, next) => {
  const { value, error } = usereauthjoi.validate(req.body);
  if (error) {
    return res.status(400).json({ messege: "found validation error" });
  }

  const { username, email, password } = value;
  console.log(username,email)
  try {
    const isExcistinguser = await User.findOne({ email: email });

    if (isExcistinguser) {
      return res
        .status(400)
        .json({ status: "error", message: "email already taken!" });
    }

    const hashedpassword = await bcryptjs.hash(password, 10);

    const newuser = new User({
      username: username,
      image: req.cloudinaryImageUrl,
      email: email,
      password: hashedpassword,
    });

    await newuser.save();

    return res
      .status(201)
      .json({
        status: "success",
        message: "User registered successfully",
        data: newuser,
      });
  } catch (error) {
    res.status(500).json({ messege: "internel server error" });
    console.log(error)
  }
};

//login session
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isUserValid = await User.findOne({ email });

    console.log(password, email, "this login achieved");

    if (!isUserValid) {
      return res.status(404).json({ error: "User not found" });
    }

    const validPass = bcryptjs.compareSync(password, isUserValid.password);

    if (!validPass) {
      return res.status(404).json({ error: "Wrong credentials" });
    }

    // JWT setting
    const token = jwt.sign({ id: isUserValid._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...data } = isUserValid._doc;
    const expiryDate = new Date(Date.now() + 60 * 1000);

    // Cookie setting
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ message: "User logged in successfully", user: data, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    next(error);
  }
};

