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

 type Mutation {
  loginUser(email: String!, password: String!): AuthPayload!
  loginAdmin(email: String!, password: String!): AuthPayload!
}

type AuthPayload {
  token: String!
  user: User
  admin: Admin
}

`;

module.exports = typeDefs;
