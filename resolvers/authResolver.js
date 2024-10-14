const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { User, Admin } = require("../models");
const { generateUserToken, generateAdminToken } = require("../utils/authService");
const { sendEmail } = require("../utils/emailService");
const { Op } = require("sequelize");

const authResolvers = {

  Mutation: {
    createAdmin: async (_, { userName, email, password }) => {
      try {
        const existingAdmin = await Admin.findOne({ where: { email } });
        const existingAdminByUsername = await Admin.findOne({ where: { userName } });
    
        if (existingAdmin || existingAdminByUsername) {
          throw new Error("Email or username is already taken");
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create({ userName, email, password: hashedPassword });
    
        await sendEmail(email, "Account Created Successfully", `Hi ${userName}, your admin account has been successfully created.`);
        const token = generateAdminToken(newAdmin);
    
        return { token, admin: newAdmin };
      } catch (error) {
        console.error("Error creating admin:", error);
        throw new Error("Failed to create admin");
      }
    },
    
    loginAdmin: async (_, { email, password }) => {
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) {
        throw new Error("Invalid credentials");
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = generateAdminToken(admin);
      return { token, admin };
    },

    forgotAdminPassword: async (_, { email }) => {
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) {
        throw new Error("Email not found");
      }

      const token = crypto.randomBytes(20).toString("hex");
      admin.passwordResetToken = token;
      admin.passwordResetExpires = Date.now() + 3600000;
      await admin.save();

      const subject = "Password Reset";
      const text = `This is your password reset token: ${token}`;
      await sendEmail(email, subject, text);

      return "Password reset token sent to email";
    },

    resetAdminPassword: async (_, { token, newPassword }) => {
      const admin = await Admin.findOne({
        where: {
          passwordResetToken: token,
          passwordResetExpires: { [Op.gt]: Date.now() },
        },
      });

      if (!admin) {
        throw new Error("Token is invalid or has expired");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedPassword;
      admin.passwordResetToken = null;
      admin.passwordResetExpires = null;
      await admin.save();

      return "Password has been reset successfully";
    },

    createUser: async (_, { userName, email, password }) => {
      const existingUser = await User.findOne({ where: { email } });
      const existingUserByUsername = await User.findOne({ where: { userName } });

      if (existingUser || existingUserByUsername) {
        throw new Error("Email or username is already taken");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ userName, email, password: hashedPassword });

      await sendEmail(email, "Account Created Successfully", `Hi ${userName}, your account has been successfully created.`);
      const token = generateUserToken(newUser);

      return { token, user: newUser };
    },

    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("Invalid credentials");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = generateUserToken(user);
      return { token, user };
    },

    forgotUserPassword: async (_, { email }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("Email not found");
      }

      const token = crypto.randomBytes(20).toString("hex");
      user.passwordResetToken = token;
      user.passwordResetExpires = Date.now() + 3600000;
      await user.save();

      const subject = "Password Reset";
      const text = `This is your password reset token: ${token}`;
      await sendEmail(email, subject, text);

      return "Password reset token sent to email";
    },

    resetUserPassword: async (_, { token, newPassword }) => {
      const user = await User.findOne({
        where: {
          passwordResetToken: token,
          passwordResetExpires: { [Op.gt]: Date.now() },
        },
      });

      if (!user) {
        throw new Error("Token is invalid or has expired");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.passwordResetToken = null;
      user.passwordResetExpires = null;
      await user.save();

      return "Password has been reset successfully";
    },
  },
};

module.exports = authResolvers;
