// apolloServer.js
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const jwt = require("jsonwebtoken");
const typeDefs = require("./graphql/typeDefs");
const authResolvers = require("./resolvers/authResolver");
const adminResolvers = require("./resolvers/adminResolver");
const newsResolvers = require("./resolvers/newsResover");
const userResolvers = require("./resolvers/userResolver");
const { mergeResolvers } = require("@graphql-tools/merge");
const { isAdmin } = require("./middlewares/authMiddleware"); // Import the middleware

// Combine all resolvers
const resolvers = mergeResolvers([
  authResolvers,
  adminResolvers,
  newsResolvers,
  userResolvers,
]);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    let user = null;
    if (token) {
      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        throw new Error("Invalid token");
      }
    }
    return { req, user };
  },
  formatError: (err) => {
    console.error(err);
    return err;
  },
});

module.exports = apolloServer;
