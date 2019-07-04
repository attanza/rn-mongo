import { Redis } from "../helpers";
import shopCategory from "./shopCategory";
import user from "./user";

export default async () => {
  await Redis.clear();
  await user();
  await shopCategory();
};
