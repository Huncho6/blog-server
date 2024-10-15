const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const apolloServer = require("./apolloServer"); // Ensure this imports your Apollo server correctly
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 45;

// Middleware
app.use(cors());
app.use(express.json());

// Apollo Server setup
async function startServer() {
  try {
    console.log("Starting Apollo Server...");
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/graphql" });
    console.log("Apollo Server started and middleware applied.");

    // Test database connection before syncing
    await sequelize.authenticate();
    console.log("Database connected.");

    // Sync the database
    await sequelize.sync();
    console.log("Database & tables created!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`GraphQL endpoint available at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
}

// Start the server
startServer();
