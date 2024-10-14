const News = require("../models/newsModel");

const newsResolvers = {
  Mutation: {
    createNews: async (_, { title, content }) => {
      try {
        const news = await News.create({ title, content });
        return news;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  Query: {
    getAllNews: async () => {
      try {
        return await News.findAll();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    },
    getNewsById: async (_, { id }) => {
      try {
        const news = await News.findByPk(id);
        if (!news) throw new Error("News not found");
        return news;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateNews: async (_, { id, title, content }) => {
      try {
        const news = await News.findByPk(id);
        if (!news) {
          throw new Error("News not found");
        }
        await news.update({ title, content });
        return news;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Delete a news
    deleteNews: async (_, { id }) => {
      try {
        const news = await News.findByPk(id);
        if (!news) {
          throw new Error("News not found");
        }
        await news.destroy();
        return true; // Return true to indicate success
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = newsResolvers;