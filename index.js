const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const sequelize = require("./db");
const typeDefs = require("./graphql/typeDefs");
const newsResolvers = require("./resolvers/newsResover");
const authResolvers = require("./resolvers/authResolver");
const adminResolvers = require("./resolvers/adminResolver");
const userResolvers = require("./resolvers/userResolver");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 45;

// Middleware
app.use(cors());
app.use(express.json());

// Combine all resolvers
const resolvers = {
  Query: {
    ...adminResolvers.Query,
    ...userResolvers.Query,
    ...newsResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...newsResolvers.Mutation,
  },
};

// Apollo Server setup
const apolloServer = new ApolloServer({ typeDefs });

async function startServer() {
  try {
    console.log("Starting Apollo Server...");
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/graphql" });
    console.log("Apollo Server started and middleware applied.");

    // Sync the database and start the server
    await sequelize.sync();
    console.log("Database & tables created!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`GraphQL endpoint available at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });

    // Test database connection
    await sequelize.authenticate();
    console.log("Database connected.");
  } catch (err) {
    console.error("Error starting server:", err);
  }
}

// Start the server
startServer();
