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
  category: "required",
  price: "required|number"
};

export default {
  Query: {
    products: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "read-product");
        return await DataLoaders.getAll("Product", args);
      } catch (e) {
        return e;
      }
    },
    product: async (_, { _id }, { authUser }) => {
      try {
        CheckPermission(authUser, "read-product");
        MongoIdValidator(_id);
        return await DataLoaders.get("Product", _id);
      } catch (e) {
        return e;
      }
    }
  },
  Mutation: {
    addProduct: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "create-product");
        MongoIdValidator(args.category, "ProductCategory");

        await ExistsValidator("ProductCategory", args.category);
        await Validate(args, rules);
        await UniqueValidator("Product", "name", args.name);
        return await DataLoaders.create("Product", args);
      } catch (e) {
        return e;
      }
    },
    updateProduct: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "update-product");
        MongoIdValidator(args._id);
        MongoIdValidator(args.category, "ProductCategory");

        await ExistsValidator("ProductCategory", args.category);

        let updateRule = Object.assign({}, rules);
        await Validate(args, updateRule);
        await UniqueValidator("Product", "name", args.name, args._id);
        return await DataLoaders.update("Product", args);
      } catch (e) {
        return e;
      }
    },
    deleteProduct: async (_, { _id }, { authUser }) => {
      try {
        CheckPermission(authUser, "delete-product");
        MongoIdValidator(_id);
        await DataLoaders.delete("Product", _id);
        return "Product successfuly deleted";
      } catch (e) {
        return e;
      }
    }
  }
};
