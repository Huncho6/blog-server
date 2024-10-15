const Admin = require("../models/adminModel");

const adminResolvers = {
  Query: {
    getAllAdmins: async () => {
      try {
        return await Admin.findAll();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getAdminById: async (_, { id }) => {
      try {
        const admin = await Admin.findByPk(id);
        if (!admin) throw new Error("Admin not found");
        return admin;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    updateAdmin: async (_, { id, email, password, userName }) => {
      try {
        const admin = await Admin.findByPk(id);
        if (!admin) {
          throw new Error("Admin not found");
        }
        await admin.update({ email, password, userName });
        return admin;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Delete an admin
    deleteAdmin: async (_, { id }) => {
      try {
        const admin = await Admin.findByPk(id);
        if (!admin) {
          throw new Error("Admin not found");
        }
        await admin.destroy();
        return true; // Return true to indicate success
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = adminResolvers;
