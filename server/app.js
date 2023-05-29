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

  app.use(
    "/graphql",
    cors <
      cors.CorsRequest >
      { origin: ["http://localhost:3000", "http://localhost:5173"] },
    express.json(),
    expressMiddleware(server)
  );

  app.get("/", (req, res) => res.redirect("/graphql"));

  await new Promise((res) => httpServer.listen({ port: 3000 }, res));
  console.log(">> Server running on port 3000");
};
