import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { Token } from "./helpers";
import resolvers from "./resolvers";
import seeder from "./seeder";
import typeDefs from "./typeDefs";
const app = express();
dotenv.config();
app.disable("x-power-by");
app.use(cors());

const { DB_NAME, PORT, SEED } = process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    const authUser = await Token.getUser(token);
    return { authUser };
  }
});

const startServer = async () => {
  try {
    await mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
      useNewUrlParser: true
    });

    // mongoose.set("debug", true);
    mongoose.set("useCreateIndex", true);

    if (SEED == 1) {
      console.log("Seeder run");
      seeder();
    }
    server.applyMiddleware({ app });

    app.listen({ port: PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  } catch (e) {
    console.error(e);
  }
};

startServer();
