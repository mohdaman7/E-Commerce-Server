import User from "../models/userModel.js";
import usereauthjoi from "../validation/Userauthjoi.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { value, error } = usereauthjoi.validate(req.body);
  if (error) {
    return res.status(400).json({ messege: "found validation error" });
  }

  const { username, email, password } = value;
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
  }
};

//login session
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isuservalid = await User.findOne({ email });

    console.log(password, "this login achievedlkjlkj");

    if (!isuservalid) {
      return res.status(404).json({ error: "user not found" });
    }

    const validPass = bcryptjs.compareSync(password, isuservalid.password);

    if (!validPass) {
      return res.status(404).json({ error: "wrong credential" });
    }

    //jwt setting
    const tocken = jwt.sign({ id: isuservalid._id }, process.env.JWT_SECRET);
    const { password: hashedpassword, ...data } = isuservalid._doc;
    const expairyDate = new Date(Date.now() + 60 * 1000);

    //cookie setting

    res
      .cookie("Access token", tocken, { httpOnly: true, expire: expairyDate })
      .status(200)
      .json({ messege: "user login success fully", user: data, tocken });
  } catch (error) {
    res.status(500).json({ error: "internel server error" });
    next(error);
  }
};
