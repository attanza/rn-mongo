import { ApolloError, AuthenticationError } from "apollo-server-express";
import { compare } from "bcryptjs";
import { Token } from "../helpers";
import { User } from "../models";
export default {
  Mutation: {
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError("User not found");
        }
        const isPasswordMatchs = await compare(password, user.password);
        if (!isPasswordMatchs) {
          throw new AuthenticationError("Password incorrect");
        }
        const dataToHash = { uid: user._id };
        const token = await Token.generate(dataToHash);
        return { token };
      } catch (e) {
        return new ApolloError(e);
      }
    }
  }
};
