const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    userName: String!
    email: String!
  }

  type Admin {
    id: ID!
    email: String!
  }

  type Query {
    users: [User]
    admins: [Admin]
  }

  type Mutation {
    createUser(userName: String!, email: String!, password: String!): User
    createAdmin(email: String!, password: String!): Admin
  }
`;

module.exports = typeDefs;
