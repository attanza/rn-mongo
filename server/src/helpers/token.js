import jwt from "jsonwebtoken";
import { User } from "../models";
class Token {
  async generate(dataToHash) {
    try {
      const { APP_SECRET } = process.env;
      const token = await jwt.sign(dataToHash, APP_SECRET, { expiresIn: "1h" });
      return token;
    } catch (e) {
      throw e;
    }
  }

  async getUser(token) {
    try {
      if (token === "") return null;
      const tokenSplit = token.split(" ");
      if (tokenSplit[0] !== "Bearer") return null;
      if (tokenSplit[1] === "") return null;

      const { APP_SECRET } = process.env;
      const extracted = await jwt.verify(tokenSplit[1], APP_SECRET);

      const user = await User.findById(extracted.uid);
      if (!user) return null;
      return user;
    } catch (e) {
      return null;
    }
  }
}

export default new Token();
