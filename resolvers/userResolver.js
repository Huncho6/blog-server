const User = require("../models/userModel");

const userResolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        return await User.findAll();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getUserById: async (_, { id }) => {
      try {
        const user = await User.findByPk(id);
        if (!user) throw new Error("User not found");
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    updateUser: async (_, { id, email, password, userName }) => {
      try {
        const user = await User.findByPk(id);
        if (!user) {
          throw new Error("User not found");
        }
        await user.update({ email, password, userName });
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Delete a user
    deleteUser: async (_, { id }) => {
      try {
        const user = await User.findByPk(id);
        if (!user) {
          throw new Error("User not found");
        }
        await user.destroy();
        return true; // Return true to indicate success
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = userResolvers;
