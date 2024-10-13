const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');

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
  },
};

module.exports = resolvers;
