import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    createProject(name: String, description: String, user: ID): Project
  }

  type Project {
    _id: ID
    name: String
    description: String
    createdAt: String
    updatedAt: String
  }
`;
