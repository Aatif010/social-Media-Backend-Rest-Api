import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await UserActivation.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No user Found" });
  }
  return res.status(200).json({ users });
};

export default getAllUser;

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "user already exist" });
  }
  const hashedPassword = bcryptjs.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(404).json({ message: "couldnt find user" });
  }
  const isPasswordCorrect = bcryptjs.compareSync(
    password,
    existingUser.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "incorrect password" });
  }
  return res.status(200).json({ message: "login succesfull" });
};
