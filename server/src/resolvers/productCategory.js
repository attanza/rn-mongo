import {
  CheckPermission,
  DataLoaders,
  ExistsValidator,
  MongoIdValidator,
  UniqueValidator,
  Validate
} from "../helpers";

const rules = {
  name: "required|string|max:100",
  description: "string|max:255",
  shop: "required"
};

export default {
  Query: {
    productCategories: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "read-product-category");
        return await DataLoaders.getAll("ProductCategory", args);
      } catch (e) {
        return e;
      }
    },
    productCategory: async (_, { _id }, { authUser }) => {
      try {
        CheckPermission(authUser, "read-product-category");
        MongoIdValidator(_id);
        return await DataLoaders.get("ProductCategory", _id);
      } catch (e) {
        return e;
      }
    }
  },
  Mutation: {
    addProductCategory: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "create-product-category");
        MongoIdValidator(args.shop, "shop");

        await ExistsValidator("Shop", args.shop);
        await Validate(args, rules);
        await UniqueValidator("ProductCategory", "name", args.name);
        return await DataLoaders.create("ProductCategory", args);
      } catch (e) {
        return e;
      }
    },
    updateProductCategory: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "update-product-category");
        MongoIdValidator(args._id);
        MongoIdValidator(args.shop, "shop");

        await ExistsValidator("Shop", args.shop);
        let updateRule = Object.assign({}, rules);
        await Validate(args, updateRule);
        await UniqueValidator("ProductCategory", "name", args.name, args._id);
        return await DataLoaders.update("ProductCategory", args);
      } catch (e) {
        return e;
      }
    },
    deleteProductCategory: async (_, { _id }, { authUser }) => {
      try {
        CheckPermission(authUser, "delete-product-category");
        MongoIdValidator(_id);
        await DataLoaders.delete("ProductCategory", _id);
        return "ProductCategory successfuly deleted";
      } catch (e) {
        return e;
      }
    }
  }
};
