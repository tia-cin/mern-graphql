import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import http from "http";

export const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: ``,
    resolvers: () => {},
  });

  await server.start();
  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  await new Promise((res) => httpServer.listen({ port: 3000 }));
  console.log(">> Server running on port 3000");
};
