import { gql } from "apollo-server-express";
import auth from "./auth";
import permission from "./permission";
import product from "./product";
import productCategory from "./productCategory";
import role from "./role";
import shop from "./shop";
import shopCategory from "./shopCategory";
import shopPublic from "./shopPublic";
import user from "./user";

const rootSchema = gql`
  scalar Date

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  input PaginationInput {
    page: Int
    limit: Int
    skip: Int
  }

  type PaginationType {
    totalDocs: Int
    limit: Int
    skip: Int
    hasPrevPage: Boolean
    hasNextPage: Boolean
    page: Int
    totalPages: Int
    pagingCounter: Int
    prevPage: Int
    nextPage: Int
  }
`;

export default [
  rootSchema,
  user,
  role,
  permission,
  auth,
  shopCategory,
  shop,
  shopPublic,
  productCategory,
  product
];
