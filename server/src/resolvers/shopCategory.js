import {
  CheckPermission,
  DataLoaders,
  MongoIdValidator,
  UniqueValidator,
  Validate
} from "../helpers";

const rules = {
  name: "required|string|max:100",
  description: "string|max:255"
};

export default {
  Query: {
    shopCategories: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "read-shop-category");
        return await DataLoaders.getAll("ShopCategory", args);
      } catch (e) {
        return e;
      }
    },
    shopCategory: async (_, { _id }, { authUser }) => {
      try {
        CheckPermission(authUser, "read-shop-category");
        MongoIdValidator(_id);
        return await DataLoaders.get("ShopCategory", _id);
      } catch (e) {
        return e;
      }
    }
  },
  Mutation: {
    addShopCategory: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "create-shop-category");
        await Validate(args, rules);
        await UniqueValidator("ShopCategory", "name", args.name);
        return await DataLoaders.create("ShopCategory", args);
      } catch (e) {
        return e;
      }
    },
    updateShopCategory: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "update-shop-category");
        MongoIdValidator(args._id);
        await Validate(args, rules);
        await UniqueValidator("ShopCategory", "name", args.name, args._id);
        return await DataLoaders.update("ShopCategory", args);
      } catch (e) {
        return e;
      }
    },
    deleteShopCategory: async (_, { _id }, { authUser }) => {
      try {
        CheckPermission(authUser, "delete-shop-category");
        MongoIdValidator(_id);
        await DataLoaders.delete("ShopCategory", _id);
        return "ShopCategory successfuly deleted";
      } catch (e) {
        return e;
      }
    }
  }
};
