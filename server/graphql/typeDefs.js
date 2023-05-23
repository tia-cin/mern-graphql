import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getAllProjects: [Project]
    getProject(_id: ID!): Project
    getAllTasks: [Task]
    getTask(_id: ID!): Task
  }

  type Mutation {
    createProject(name: String, description: String, user: ID): Project
    createTask(title: String, projectId: ID): Task
    deleteProject(_id: ID!): Project
    deleteTask(_id: ID!): Task
    updateProject(_id: ID!, name: String, description: String): Project
    updateTask(_id: ID!, title: String): Task
  }

  type Project {
    _id: ID
    name: String
    description: String
    createdAt: String
    updatedAt: String
  }

  type Task {
    _id: ID
    title: String
    projectId: ID
    createdAt: String
    updatedAt: String
  }
`;
