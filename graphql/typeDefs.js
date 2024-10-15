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
    createdAt: String!
    updatedAt: String!
  }

  type Admin {
    id: ID!
    userName: String!
    email: String!
    password: String!
    role: String!
    passwordResetToken: String
    passwordResetExpires: String
    createdAt: String!
    updatedAt: String!
  }

  type News {
    id: ID!
    newstitle: String!
    description: String!
    poster: String!
    video: String
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User
    admin: Admin
  }

type MutationResponse {
  success: Boolean!
  message: String!
}

  # Queries
  type Query {
    healthCheck: String
    getAllUsers: [User]
    getAllAdmins: [Admin]
    getUserById(id: ID!): User
    getAllNews: [News]          # Updated to match the resolver
    getNewsById(id: ID!): News   # Updated to match the resolver
    getAdminById(id: ID!): Admin
  }

  # Mutations
  type Mutation {
    createUser(userName: String!, email: String!, password: String!): AuthPayload
    updateUser(id: ID!, userName: String, email: String, password: String, role: String): User
    deleteUser(id: ID!): Boolean
    createAdmin(userName: String!, email: String!, password: String!): AuthPayload
    updateAdmin(id: ID!, email: String, password: String, userName: String): Admin
    deleteAdmin(id: ID!): Boolean
    createNews(newstitle: String!, description: String!, poster: String!, video: String): News
    updateNews(id: ID!, newstitle: String, description: String): News
    deleteNews(id: ID!): Boolean   # Added deleteNews mutation
    loginUser(email: String!, password: String!): AuthPayload!
    loginAdmin(email: String!, password: String!): AuthPayload!
    forgotUserPassword(email: String!): MutationResponse
    resetUserPassword(newPassword: String!, token: String!): MutationResponse
    forgotAdminPassword(email: String!): MutationResponse
    resetAdminPassword(newPassword: String!, token: String!): MutationResponse
  }
`;

module.exports = typeDefs;
