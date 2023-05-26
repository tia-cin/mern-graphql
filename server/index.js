import { startServer } from "./app.js";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers/index.js";
import { connectDb } from "./db.js";

connectDb();
startServer(typeDefs, resolvers);
