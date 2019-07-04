import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    products(pagination: PaginationInput): Products
    product(_id: ID!): Product
  }

  extend type Mutation {
    addProduct(
      name: String!
      price: Float!
      description: String
      mainImage: String

      category: ID!
    ): Product
    updateProduct(
      _id: ID!
      name: String!
      price: Float!
      description: String
      mainImage: String

      category: ID!
    ): Product
    deleteProduct(_id: ID!): String
  }

  type Product {
    _id: ID!
    name: String!
    price: Float!
    category: ProductCategory!
    mainImage: String
    description: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Products {
    meta: PaginationType
    data: [Product]
  }
`;
