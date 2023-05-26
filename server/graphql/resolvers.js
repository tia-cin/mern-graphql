import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken, hashPwd, comparePwds } from "../auth.js";
import Message from "../models/Message.js";

export const resolvers = {
  Query: {
    getAllProjects: async () => await Project.find(),
    getProject: async (_, { _id }) => await Project.findById(_id),
    getAllTasks: async () => await Task.find(),
    getTask: async (_, { _id }) => await Task.findById(_id),
    getAllUsers: async () => await User.find(),
    getUser: async (_, { _id }) => await User.findById(_id),
    message: (_, { _id }) => Message.findById(_id),
  },

  Mutation: {
    createProject: async (_, args) => {
      try {
        const newProject = new Project(args);
        const createdProject = await newProject.save();

        return createdProject;
      } catch (error) {
        console.log(">> Error while creating project", error);
      }
    },
    createTask: async (_, args) => {
      try {
        const taskProject = Project.findById(args.projectId);
        if (!taskProject) throw new Error("Project not found");

        const newTask = new Task(args);
        await newTask.save();

        return newTask;
      } catch (error) {
        console.log(">> Error while creating Task", error);
      }
    },
    deleteProject: async (_, { _id }) => {
      const deletedProject = await Project.findByIdAndDelete(_id);
      if (!deletedProject) throw new Error("Project not Found");
      await Task.deleteMany({ projectId: deletedProject._id });
      return deletedProject;
    },
    deleteTask: async (_, { _id }) => {
      const deletedTask = await Task.findByIdAndDelete(_id);
      if (!deletedTask) throw new Error("Task not found");
      return deletedTask;
    },
    updateProject: async (_, args) => {
      const updatedProject = await Project.findByIdAndUpdate(args._id, args);
      if (updatedProject) throw new Error("Project not found");
      return updatedProject;
    },
    updateTask: async (_, args) => {
      const updatedTask = await Task.findByIdAndUpdate(args._id, args);
      if (updatedTask) throw new Error("Task not found");
      return updatedTask;
    },
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
};
