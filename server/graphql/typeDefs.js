import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getAllProjects: [Project]
    getProject(_id: ID!): Project
    getAllTasks: [Task]
    getTask(_id: ID!): Task
    getAllUsers: [User]
    getUser(_id: ID!): User
    message(id: ID!): Message
  }

  type Mutation {
    createProject(name: String, description: String, user: ID): Project
    createTask(title: String, projectId: ID): Task
    deleteProject(_id: ID!): Project
    deleteTask(_id: ID!): Task
    updateProject(_id: ID!, name: String, description: String): Project
    updateTask(_id: ID!, title: String): Task
    createUser(name: String, email: String, password: String): User
    signup(name: String, email: String, password: String): User
    login(email: String, password: String): User
    deleteAccount(password: String): User
    createMessage(messageInput: MessageInput): Message!
  }

  type Project {
    _id: ID
    name: String
    description: String
    createdAt: String
    updatedAt: String
    tasks: [Task]
    owner: User
  }

  type Task {
    _id: ID
    title: String
    description: String
    assignedTo: User
    project: Project
    createdAt: String
    updatedAt: String
  }

  type User {
    _id: ID
    name: String
    email: String
    role: String
    projects: [Project]
    tasks: [Task]
  }

  type Message {
    text: String
    createdAt: String
    updatedAt: String
  }

  input MessageInput {
    text: String
    user: String
  }
`;
