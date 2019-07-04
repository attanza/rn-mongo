import { UserInputError } from "apollo-server-express";
import mongoose from "mongoose";
export default (id, fieldName = "_id") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new UserInputError(`${fieldName} is not valid`);
  }
  return true;
};
