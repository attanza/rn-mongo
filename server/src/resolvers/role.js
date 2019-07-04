import { ApolloError } from "apollo-server-express";
import {
  CheckPermission,
  DataLoaders,
  ExistsValidator,
  MongoIdValidator,
  Redis,
  UniqueValidator,
  Validate
} from "../helpers";
import { Role } from "../models";

const rules = {
  name: "required|string|max:100",
  description: "string|max:255"
};

export default {
  Query: {
    roles: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "read-role");
        return await DataLoaders.getAll("Role", args);
      } catch (e) {
        return e;
      }
    },
    role: async (_, { _id }, { authUser }) => {
      try {
        CheckPermission(authUser, "read-role");
        MongoIdValidator(_id);
        return await DataLoaders.get("Role", _id);
      } catch (e) {
        return e;
      }
    }
  },
  Mutation: {
    addRole: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "create-role");
        await Validate(args, rules);
        await UniqueValidator("Role", "name", args.name);
        return await DataLoaders.create("Role", args);
      } catch (e) {
        return e;
      }
    },
    updateRole: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "update-role");
        MongoIdValidator(args._id);
        let updateRule = Object.assign({}, rules);
        await Validate(args, updateRule);
        await UniqueValidator("Role", "name", args.name, args._id);
        return await DataLoaders.update("Role", args);
      } catch (e) {
        return e;
      }
    },
    deleteRole: async (_, { _id }, { authUser }) => {
      try {
        CheckPermission(authUser, "delete-role");

        MongoIdValidator(_id);
        await DataLoaders.delete("Role", _id);
        return "Role successfuly deleted";
      } catch (e) {
        return e;
      }
    },
    roleAddPermission: async (_, { _id, permissions }, { authUser }) => {
      try {
        CheckPermission(authUser, "update-role");
        MongoIdValidator(_id);
        for (let i = 0; i < permissions.length; i++) {
          MongoIdValidator(permissions[i], "permission");
          await ExistsValidator("Permission", permissions[i]);
        }
        const role = await Role.findById(_id);
        if (!role) {
          throw new ApolloError(`Role not found`);
        }
        role.permission = permissions;
        Promise.all([role.save(), Redis.delete("Role_*")]);
        return "Permission attached";
      } catch (e) {
        console.log("e", e);
        return e;
      }
    }
  }
};
