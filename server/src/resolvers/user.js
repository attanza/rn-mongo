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
  email: "required|email",
  password: "required|string|min:6",
  role: "required"
};

export default {
  Query: {
    users: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "read-user");
        return await DataLoaders.getAll("User", args);
      } catch (e) {
        return e;
      }
    },
    user: async (_, { _id }, { authUser }) => {
      try {
        CheckPermission(authUser, "read-user");
        MongoIdValidator(_id);
        return await DataLoaders.get("User", _id);
      } catch (e) {
        return e;
      }
    }
  },
  Mutation: {
    addUser: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "create-user");

        await Validate(args, rules);
        MongoIdValidator(args.role, "role");
        await ExistsValidator("Role", args.role);
        await UniqueValidator("User", "email", args.email);
        return await DataLoaders.create("User", args);
      } catch (e) {
        return e;
      }
    },
    updateUser: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "update-user");

        MongoIdValidator(args._id);
        MongoIdValidator(args.role, "role");
        await ExistsValidator("Role", args.role);
        let updateRule = Object.assign({}, rules);
        delete updateRule["password"];
        await Validate(args, updateRule);
        await UniqueValidator("User", "email", args.email, args._id);
        return await DataLoaders.update("User", args, ["email"]);
      } catch (e) {
        return e;
      }
    },
    deleteUser: async (_, { _id }, { authUser }) => {
      try {
        CheckPermission(authUser, "delete-user");

        MongoIdValidator(_id);
        await DataLoaders.delete("User", _id);
        return "User successfuly deleted";
      } catch (e) {
        return e;
      }
    }
  }
};
