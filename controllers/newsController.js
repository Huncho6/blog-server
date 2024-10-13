const News = require("../models/newsModel");

// Create a new news item
exports.createNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all news items
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.findAll();
    res.status(200).json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single news item by ID
exports.getOneNews = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a news item by ID
exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    await news.update(req.body);
    res.status(200).json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a news item by ID
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    await news.destroy();
    res.status(204).json(); // No content, successful deletion
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
