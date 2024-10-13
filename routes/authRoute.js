const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Admin Routes
router.post("/admin/create-account", authController.createAdminAccount);
router.post("/admin/login", authController.loginAdmin);
router.post("/admin/forgot-password", authController.forgotAdminPassword);
router.post("/admin/reset-password", authController.resetAdminPassword);

// User Routes
router.post("/user/create-account", authController.createUserAccount);
router.post("/user/login", authController.loginUser);
router.post("/user/forgot-password", authController.forgotUserPassword);
router.post("/user/reset-password", authController.resetUserPassword);

module.exports = router;
