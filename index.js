const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const sequelize = require("./db");
const User = require("./models/userModel");
const Admin = require("./models/adminModel");
const newsRoutes = require("./routes/newsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoute = require("./routes/authRoute");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Define REST routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoute);
app.use("/api/admins", adminRoutes);
app.use("/api/news", newsRoutes);

// Apollo Server setup
const apolloServer = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  // Sync the database and start the server
  sequelize
    .sync()
    .then(() => {
      console.log("Database & tables created!");
    })
    .catch((err) => {
      console.error("Error creating database:", err);
    });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`GraphQL endpoint available at http://localhost:${PORT}${apolloServer.graphqlPath}`);

    sequelize
      .authenticate()
      .then(() => {
        console.log("Database connected.");
      })
      .catch((err) => {
        console.log("Error connecting to the database:", err);
      });
  });
}

startServer();
