import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    permissions(pagination: PaginationInput): Permissions
    permission(_id: ID!): Permission
  }

  extend type Mutation {
    addPermission(name: String, description: String): Permission
    updatePermission(_id: ID!, name: String, description: String): Permission
    deletePermission(_id: ID!): String
  }

  type Permission {
    _id: ID!
    name: String!
    slug: String!
    description: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Permissions {
    meta: PaginationType
    data: [Permission]
  }
`;
