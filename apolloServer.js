// apolloServer.js
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = require("./graphql/typeDefs"); // Import your type definitions
const authResolvers = require("./resolvers/authResolver"); // Import your resolvers
const adminResolvers = require("./resolvers/adminResolver");
const newsResolvers = require("./resolvers/newsResover");
const userResolvers = require("./resolvers/userResolver");
const { mergeResolvers } = require("@graphql-tools/merge");

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
    // Add any context you need
    return { req };
  },
  formatError: (err) => {
    console.error(err);
    return err;
  },
});

module.exports = apolloServer;
