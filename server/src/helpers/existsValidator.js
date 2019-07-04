import { UserInputError } from "apollo-server-express";
import * as Model from "../models";
const existsValidator = async (modelName, value) => {
  try {
    const count = await Model[modelName].countDocuments({ _id: value });
    if (count < 1) {
      throw new UserInputError(`${modelName} is not exists`);
    }
    return true;
  } catch (e) {
    throw e;
  }
};

export default existsValidator;
