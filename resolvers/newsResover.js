// newsResolvers.js
const News = require("../models/newsModel")

const newsResolvers = {
  Query: {
    getAllNews: async () => {
      try {
        return await News.findAll();
      } catch (error) {
        throw new Error(error.message);
      }
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
  },
  Mutation: {
    createNews: async (_, { newstitle, description, poster, video }) => {
      try {
        const news = await News.create({ newstitle, description, poster, video });
        return news;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateNews: async (_, { id, newstitle, description }) => {
      try {
        const news = await News.findByPk(id);
        if (!news) {
          throw new Error("News not found");
        }
        await news.update({ newstitle, description });
        return news;
      } catch (error) {
        throw new Error(error.message);
      }
    },
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
