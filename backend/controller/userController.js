import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../utils/userAuth.js";

export const Signup = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;
  console.log(name, email, password, confirmpassword);
  if (!name || !email || !password || !confirmpassword) {
    return res.status(400).json({ message: "all fields are required" });
  }
  if (password !== confirmpassword) {
    return res
      .status(400)
      .json({ message: "password and confirm password should be same" });
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "user already exist" });
  }

  const hashPasswords = await hashPassword({ password });

  const user = new User({
    name,
    email,
    password: hashPasswords,
    confirmpassword: hashPasswords,
  });

  await user.save();
  res.status(201).json({ message: "user created", user });
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid password and email" });
    }

    //create token

    const paylaod = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    // Generate JWT token
    const token = jwt.sign(paylaod, process.env.ACCESS_KEY_TOKEN, {
      expiresIn: "1hr", // Set token expiry time
    });
    // res.cookie("jwt", token, {
    //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    //   httpOnly: true,
    //   // secure: true,
    //   // sameSite: "strict",
    // });

    user.password = undefined;
    user.confirmpassword = undefined;
    res.status(200).json({ message: "user logged in", token, user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get profile controller

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    user.password = undefined;
    user.confirmpassword = undefined;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//logout routes from cookies

export const logout = async (req, res) => {
  res.clearCookie("token", "", {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "user logged out" });
};

//get all user data

export const getAllUsers = async (req, res) => {
  try {
    const islooged = req.userId;
    if (!islooged) {
      return res.status(400).json({ message: "user not found" });
    }

    const users = await User.find({ _id: { $ne: islooged } }).select("-password -confirmpassword");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
