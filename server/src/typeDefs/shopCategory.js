import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    shopCategories(pagination: PaginationInput): ShopCategories
    shopCategory(_id: ID!): ShopCategory
  }

  extend type Mutation {
    addShopCategory(name: String, description: String): ShopCategory
    updateShopCategory(
      _id: ID!
      name: String
      description: String
    ): ShopCategory
    deleteShopCategory(_id: ID!): String
  }

  type ShopCategory {
    _id: ID!
    name: String!
    slug: String!
    description: String
    createdAt: Date!
    updatedAt: Date!
  }

  type ShopCategories {
    meta: PaginationType
    data: [ShopCategory]
  }
`;
