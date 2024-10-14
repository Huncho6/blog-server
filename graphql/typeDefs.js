const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    userName: String!
    email: String!
    password: String!
    role: String
    passwordResetToken: String
    passwordResetExpires: String
  }

  type Admin {
    id: ID!
    userName: String
    email: String!
    password: String!
    role: String
    passwordResetToken: String
    passwordResetExpires: String
  }

  type News {
    id: ID!
    newstitle: String!
    poster: String!
    description: String!
    video: String
    createdAt: String
    updatedAt: String
  }

  type AuthPayload {
    token: String!
    user: User
    admin: Admin
  }

  # Queries
  type Query {
    getAllUsers: [User]
    getAllAdmins: [Admin]
    getUserById(id: ID!): User
    updateUser(id: ID!) : User
    deleteUser(id: ID!): User
    getNews: [News]
    getAdminById(id: ID!): Admin
    updateAdmin(id: ID!) : Admin
     deleteAdmin(id: ID!): Admin
  }

  # Mutations
  type Mutation {
    createUser(userName: String!, email: String!, password: String!): User
    updateUser(id: ID!, userName: String, email: String, password: String, role: String): User
    deleteUser(id: ID!): Boolean
    createAdmin(userName: String!, email: String!, password: String!): Admin 
    createNews(newstitle: String!, poster: String!, description: String!, video: String): News
    loginUser(email: String!, password: String!): AuthPayload!
    loginAdmin(email: String!, password: String!): AuthPayload!
    forgotUserPassword(email: String!): Boolean
    resetUserPassword(newPassword: String!, token: String!): Boolean
    forgotAdminPassword(email: String!): Boolean
    resetAdminPassword(newPassword: String!, token: String!): Boolean
  }
`;

module.exports = typeDefs;
