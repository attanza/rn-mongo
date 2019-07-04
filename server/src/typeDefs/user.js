import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    users(pagination: PaginationInput): Users
    user(_id: ID!): User
  }

  extend type Mutation {
    addUser(name: String, email: String!, password: String!, role: ID!): User
    updateUser(_id: ID!, name: String!, email: String!, role: ID!): User
    deleteUser(_id: ID!): String
  }

  type User {
    _id: ID!
    name: String
    email: String!
    role: Role
    createdAt: Date!
    updatedAt: Date!
  }

  type Users {
    meta: PaginationType
    data: [User]
  }
`;
