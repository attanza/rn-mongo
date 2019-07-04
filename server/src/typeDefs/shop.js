import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    shops(pagination: PaginationInput): Shops
    shop(_id: ID!): Shop
  }

  input ShopInput {
    name: String!
    category: ID!
    email: String!
    phone: String!
    street: String
    state: String
    city: String
    province: String
    country: String
    postCode: String
    latitude: Float
    longitude: Float
    isActive: Boolean!
  }

  extend type Mutation {
    addShop(shopInput: ShopInput): Shop
    updateShop(_id: ID!, shopInput: ShopInput): Shop
    deleteShop(_id: ID!): String
  }

  type AddressType {
    street: String
    state: String
    city: String
    province: String
    country: String
    postCode: String
  }

  type LocationType {
    type: String
    coordinates: [Float]
  }

  type Shop {
    _id: ID!
    name: String!
    category: ShopCategory
    email: String!
    phone: String!
    address: AddressType
    location: LocationType
    isActive: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  type Shops {
    meta: PaginationType
    data: [Shop]
  }
`;
