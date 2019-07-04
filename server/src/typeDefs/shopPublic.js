import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    shopsPublic(latitude: Float!, longitude: Float!): [ShopPublic]
    shopPublic(_id: ID!): Shop
  }

  type ShopPublic {
    _id: ID!
    name: String!
    category: ShopCategory
    email: String!
    phone: String!
    address: AddressType
    location: LocationType
    isActive: Boolean!
    distance: Float
    createdAt: Date!
    updatedAt: Date!
  }
`;
