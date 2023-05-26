import Project from "../../models/Project.js";
import Task from "../../models/Task.js";
import User from "../../models/User.js";
import Message from "../../models/Message.js";
import bcrypt from "bcrypt";
import { generateToken, hashPwd, comparePwds } from "../../auth.js";
import { ProjectResolvers } from "./project.js";
import { TaskResolver } from "./task.js";

export const resolvers = {
  Query: {
    ...ProjectResolvers.Query,
    ...TaskResolver.Query,
    getAllUsers: async () => await User.find(),
    getUser: async (_, { _id }) => await User.findById(_id),
    message: (_, { _id }) => Message.findById(_id),
  },

  Mutation: {
    ...ProjectResolvers.Mutation,
    ...TaskResolver.Mutation,
    createUser: async (_, args) => {
      try {
        const newUser = new User(args);
        await newUser.save();
        return newUser;
      } catch (error) {
        console.log(">> Error while creating user", error);
      }
    },
    signup: async (_, args) => {
      try {
        const user = await User.findOne({ email: args.email });

        if (user)
          throw new Error(
            "User with this email already exists, please use another one"
          );

        const hashedPwd = await hashPwd(args.password, 10);
        const newUser = new User({ ...args, password: hashedPwd });
        await newUser.save();

        const token = generateToken({ userId: newUser._id });
        return { ...newUser, token };
      } catch (error) {
        console.log(">> Error while sign up");
      }
    },
    login: async (_, args) => {
      try {
        const user = await User.findOne({ email: args.email });

        if (!user) throw new Error("Invalid email");

        const isPwdValid = await comparePwds(args.password, user.password);

        if (!isPwdValid) throw new Error("Invalid password");

        const token = generateToken({ userId: user._id });
        return { user, token };
      } catch (error) {
        console.log(">> Error while log in");
      }
    },
    deleteAccount: async (_, args, context) => {
      try {
        if (context.userId) throw new Error("User not authenticated");

        const user = await User.findById(context.userId);
        if (!user) throw new Error("User not found");

        const isPwdValid = await bcrypt.compare(args.password, user.password);
        if (!isPwdValid) throw new Error("Invalid password");

        await user.delete();
        return user;
      } catch (error) {
        console.log(">> Error while deleting account");
      }
    },
    createMessage: async (_, { messageInput: { text, user } }) => {
      const newMessage = new Message({ text, createdBy: user });
      await newMessage.save();
      return newMessage;
    },
  },

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
