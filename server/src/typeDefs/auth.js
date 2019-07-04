import { gql } from "apollo-server-express";

export default gql`
  type Token {
    token: String
  }
  extend type Mutation {
    login(email: String!, password: String!): Token
  }
`;
