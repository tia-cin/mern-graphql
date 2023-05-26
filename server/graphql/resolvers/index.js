import Project from "../../models/Project.js";
import Task from "../../models/Task.js";
import User from "../../models/User.js";
import Message from "../../models/Message.js";
import { ProjectResolvers } from "./project.js";
import { TaskResolver } from "./task.js";
import { MessageResolvers } from "./message.js";
import { UserResolvers } from "./user.js";

export const resolvers = {
  ...ProjectResolvers,
  ...TaskResolver,
  ...MessageResolvers,
  ...UserResolvers,

  Project: {
    tasks: async (parent) => await Task.find({ projectId: parent._id }),
    owner: async (parent) => await User.findById(parent._id),
  },

  Task: {
    project: async (parent) => await Project.findById(parent.projectId),
    assignedTo: async (parent) => await User.findById(parent._id),
  },

  User: {
    projects: async (parent) => await Project.find({ owner: parent._id }),
    tasks: async (parent) => await Task.find({ assignedTo: parent._id }),
  },

  Message: {
    createdBy: async (parent) => await User.findById({ _id: parent._id }),
  },
};
