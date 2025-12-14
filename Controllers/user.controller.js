import mongoose from "mongoose";
import User from "../Models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Register User

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Cannot register user Error in Register ${error}` });
  }
};

// Login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetail = await User.findOne({ email });
    if (!userDetail) {
      return res.status(404).json({ message: "Invalid email" });
    }
    const matchPassword = await bcrypt.compare(password, userDetail.password);
    if (!matchPassword) {
      return res.status(404).json({ message: "Invalid Password" });
    }
    //JWT
    const token = await jwt.sign(
      { _id: userDetail._id },
      process.env.JWT_SECRET
    );
    userDetail.token = token;
    await userDetail.save();

    res
      .status(200)
      .json({ message: "User LoggedIn Successfully", data: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Cannot Login user Error in Login ${error}` });
  }
};

// Get User for -- Authorization
export const getUser = async (req, res) => {
  try {
    const user = req.user;
    //const user = await User.findById({ _id: userId });
    res.status(200).json({ message: "Logged In User Detail:", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Cannot get user, Error in get User ${error}` });
  }
};
