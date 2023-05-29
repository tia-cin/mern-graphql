import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import express from "express";
import cors from "cors";
import http from "http";

export const startServer = async (typeDefs, resolvers) => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  });

  app.use(
    "/graphql",
    cors({ allowedHeaders: ["Authorization"] }),
    express.json(),
    expressMiddleware(server)
  );

  app.get("/", (req, res) => res.redirect("/graphql"));

  await new Promise((res) => httpServer.listen({ port: 3000 }, res));
  console.log(">> Server running on port 3000");
};
