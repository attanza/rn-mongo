import { GraphQLDateTime } from "graphql-iso-date";
import auth from "./auth";
import permission from "./permission";
import product from "./product";
import productCategory from "./productCategory";
import role from "./role";
import shop from "./shop";
import shopCategory from "./shopCategory";
import shopPublic from "./shopPublic";
import user from "./user";

const customScalarResolver = {
  Date: GraphQLDateTime
};

const rootResolvers = {
  Query: {
    _: () => "Hello"
  },
  Mutation: {
    _: () => "Hello"
  }
};

export default [
  rootResolvers,
  customScalarResolver,
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
