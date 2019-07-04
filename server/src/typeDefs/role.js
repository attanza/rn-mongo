import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    roles(pagination: PaginationInput): Roles
    role(_id: ID!): Role
  }

  extend type Mutation {
    addRole(name: String, description: String): Role
    updateRole(_id: ID!, name: String, description: String): Role
    deleteRole(_id: ID!): String
    roleAddPermission(_id: ID!, permissions: [ID!]!): String
  }

  type Role {
    _id: ID!
    name: String!
    slug: String!
    description: String
    permissions: [Permission]
    createdAt: Date!
    updatedAt: Date!
  }

  type Roles {
    meta: PaginationType
    data: [Role]
  }
`;
