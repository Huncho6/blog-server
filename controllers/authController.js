const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const { sendEmail } = require("../emailService");
const crypto = require("crypto");
const { Op } = require("sequelize");
require("dotenv").config();
const { generateUserToken, generateAdminToken } = require('../authservice/authService'); 


exports.createAdminAccount = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ where: { email } });
    const existingAdminByUsername = await Admin.findOne({ where: { userName } });

    if (existingAdmin || existingAdminByUsername) {
      return res.status(400).json({ message: "Email or username is already taken" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin
    const newAdmin = await Admin.create({
      userName,
      email,
      password: hashedPassword,
    });

    // Send a congratulatory email
    await sendEmail(
      email,
      "Admin Account Created Successfully",
      `Hi ${userName}, your admin account has been successfully created.`
    );

    const token = generateAdminToken(newAdmin);
    res.status(201).json({ admin: newAdmin, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateAdminToken(admin);
    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.forgotAdminPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the admin exists
        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            return res.status(400).json({ message: "Email not found" });
        }

        // Generate a password reset token
        const token = crypto.randomBytes(20).toString("hex");
        admin.passwordResetToken = token;
        admin.passwordResetExpires = Date.now() + 3600000; // Token valid for 1 hour
        await admin.save();

        // Send email with the password reset token
        const subject = "Password Reset";
        const text = `You are receiving this because you (or someone else) have requested the reset of the password for your admin account.\n\n
This is your password reset token: ${token}\n\n
If you did not request this, please ignore this email.\n`;

        await sendEmail(email, subject, text);

        res.status(200).json({ message: "Password reset token sent to email" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.resetAdminPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Find the admin by the reset token and check if it has not expired
        const admin = await Admin.findOne({
            where: {
                passwordResetToken: token,
                passwordResetExpires: { [Op.gt]: Date.now() }, // Token valid check
            },
        });

        if (!admin) {
            return res.status(400).json({ message: "Token is invalid or has expired" });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the admin's password and clear the token
        admin.password = hashedPassword;
        admin.passwordResetToken = null;
        admin.passwordResetExpires = null;
        await admin.save();

        res.status(200).json({ message: "Password has been reset successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createUserAccount = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    const existingUserByUsername = await User.findOne({ where: { userName } });

    if (existingUser || existingUserByUsername) {
      return res.status(400).json({ message: "Email or username is already taken" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    // Send a congratulatory email
    await sendEmail(
      email,
      "Account Created Successfully",
      `Hi ${userName}, your account has been successfully created.`
    );

    const token = generateUserToken(newUser);
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = generateUserToken(user);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.forgotUserPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    // Generate a password reset token
    const token = crypto.randomBytes(20).toString("hex");
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Send email with the password reset token
    const subject = "Password Reset";
    const text = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
This is your password reset token: ${token}\n\n
If you did not request this, please ignore this email.\n`;

    await sendEmail(email, subject, text);

    res.status(200).json({ message: "Password reset token sent to email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetUserPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find the user by the reset token and check if it has not expired
    const user = await User.findOne({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { [Op.gt]: Date.now() }, // Token valid check
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Token is invalid or has expired" });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the token
    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
