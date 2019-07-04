import { UserInputError } from "apollo-server-express";
import * as Model from "../models";
const uniqueValidator = async (modelName, field, value, id = null) => {
  try {
    let query = {};
    switch (field) {
      case "email":
        query = { email: value };
        break;

      default:
        query = { name: value };
        break;
    }
    if (id) {
      const addCondition = { _id: { $ne: id } };
      query = { ...query, addCondition };
    }

    const count = await Model[modelName].countDocuments(query);
    if (count > 0) {
      throw new UserInputError(`${field} is already been taken`);
    }
    return true;
  } catch (e) {
    throw e;
  }
};

export default uniqueValidator;
