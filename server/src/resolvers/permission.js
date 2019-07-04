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
    permissions: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "read-permission");
        return await DataLoaders.getAll("Permission", args);
      } catch (e) {
        return e;
      }
    },
    permission: async (_, { _id }, { authUser }) => {
      try {
        CheckPermission(authUser, "read-permission");
        MongoIdValidator(_id);
        return await DataLoaders.get("Permission", _id);
      } catch (e) {
        return e;
      }
    }
  },
  Mutation: {
    addPermission: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "create-permission");
        await Validate(args, rules);
        await UniqueValidator("Permission", "name", args.name);
        return await DataLoaders.create("Permission", args);
      } catch (e) {
        return e;
      }
    },
    updatePermission: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "update-permission");
        MongoIdValidator(args._id);
        let updateRule = Object.assign({}, rules);
        await Validate(args, updateRule);
        await UniqueValidator("Permission", "name", args.name, args._id);
        return await DataLoaders.update("Permission", args);
      } catch (e) {
        return e;
      }
    },
    deletePermission: async (_, { _id }, { authUser }) => {
      try {
        CheckPermission(authUser, "delete-permission");
        MongoIdValidator(_id);
        await DataLoaders.delete("Permission", _id);
        return "Permission successfuly deleted";
      } catch (e) {
        return e;
      }
    }
  }
};
