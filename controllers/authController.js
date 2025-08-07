import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Admin from "../models/admin.js";

dotenv.config();

export const login = async (req, res) => {
  const { email, oldPassword,password } = req.body;

  try {
    
    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(400).json({ message: "Email is incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAdmin = async (req, res) => {
  const { email, oldPassword, password } = req.body;

  try {
    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Update email if provided
    if (email) {
      admin.email = email;
    }

    // Update password if provided
    if (password) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    // Save the updated admin information
    await admin.save();

    // Respond with a success message
    res.status(200).json({ message: "Admin updated successfully" });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOwner = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json({
      email: admin.email,
      password: admin.password,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
