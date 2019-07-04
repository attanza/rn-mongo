import { UserInputError } from "apollo-server-express";
import { validateAll } from "indicative";
import messages from "./validatorMessages";
export default async (data, rules) => {
  try {
    await validateAll(data, rules, messages);
  } catch (e) {
    console.log("e", e);
    let errorMessage = [];
    e.map(message => errorMessage.push(message.message));
    throw new UserInputError(errorMessage.join(", "));
  }
};
