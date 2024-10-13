// resolvers.js (or the file where you have defined your GraphQL resolvers)
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const { generateUserToken, generateAdminToken } = require('../authservice/authService'); // Adjust the path as needed

const resolvers = {
  Query: {
    users: async () => await User.findAll(),
    admins: async () => await Admin.findAll(),
  },
  Mutation: {
    createUser: async (_, { userName, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ userName, email, password: hashedPassword });
      return newUser;
    },
    createAdmin: async (_, { userName, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await Admin.create({ userName, email, password: hashedPassword });
      return newAdmin;
    },
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error('User not found');

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new Error('Invalid password');

      const token = generateUserToken(user); // Use the imported function
      return { token, user };
    },
    loginAdmin: async (_, { email, password }) => {
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) throw new Error('Admin not found');

      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) throw new Error('Invalid password');

      const token = generateAdminToken(admin); // Use the imported function
      return { token, admin };
    },
  },
};

module.exports = resolvers;
