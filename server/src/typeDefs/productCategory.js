import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    productCategories(pagination: PaginationInput): ProductCategories
    productCategory(_id: ID!): ProductCategory
  }

  extend type Mutation {
    addProductCategory(
      name: String!
      description: String
      shop: ID!
    ): ProductCategory
    updateProductCategory(
      _id: ID!
      name: String!
      description: String
      shop: ID!
    ): ProductCategory
    deleteProductCategory(_id: ID!): String
  }

  type ProductCategory {
    _id: ID!
    name: String!
    slug: String!
    shop: Shop!
    description: String
    createdAt: Date!
    updatedAt: Date!
  }

  type ProductCategories {
    meta: PaginationType
    data: [ProductCategory]
  }
`;
