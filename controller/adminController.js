import { Admin } from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const createAdmin = async (req, res) => {
  const { email, password } = req.body;

  console.log("signup parmaeters", req.body)

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  console.log("body parameters received ...");

  try {
    const exist = await Admin.findOne({ email });

    if (exist) {
      throw new Error("Email Already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Admin.create({ email, password: hashedPassword });

    const token = jwt.sign({ userId: user.id, email:user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // expiration set to 1 day
    });

    console.log("User signup successful", user);

    res.status(200).json({ message: "User signup successful", user });
  } catch (error) {
    console.log("Error signing up", error);
    res.status(400).json({ error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login parmaeters", req.body)

  try {
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    const token = jwt.sign({ userId: user.id, email:user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // expiration set to 1 day
    });

    console.log("Logged i succeessful")

    res.status(200).json({ message: "Log in successful", user });
  } catch (error) {
    console.log("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  
  res.clearCookie("jwt"); // Ensure token cookie is cleared
  console.log("Logged out successful")
  res.json({ message: "Logged out" });
};
