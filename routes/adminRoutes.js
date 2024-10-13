const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminAuthController = require("../controllers/authController");



// Example CRUD routes for admin management (optional)
// Get all admins (only if needed for an admin dashboard)
router.get("/admins", adminController.getAllAdmins);

// Get admin by ID
router.get("/admins/:id", adminController.getAdminById);

// Update admin by ID
router.put("/admins/:id", adminController.updateAdmin);

// Delete admin by ID
router.delete("/admins/:id", adminController.deleteAdmin);

module.exports = router;
