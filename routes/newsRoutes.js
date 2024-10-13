const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

// Route to create a new news item
router.post("/news", newsController.createNews);

// Route to get all news items
router.get("/news", newsController.getAllNews);

// Route to get a single news item by ID
router.get("/news/:id", newsController.getOneNews);

// Route to update a news item by ID
router.put("/news/:id", newsController.updateNews);

// Route to delete a news item by ID
router.delete("/news/:id", newsController.deleteNews);

module.exports = router;
