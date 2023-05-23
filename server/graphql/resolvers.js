import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const resolvers = {
  Query: {
    getAllProjects: async () => await Project.find(),
    getProject: async (_, { _id }) => await Project.findById(_id),
    getAllTasks: async () => await Task.find(),
    getTask: async (_, { _id }) => await Task.findById(_id),
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
  },

  Project: {
    tasks: async (parent) => await Task.find({ projectId: parent._id }),
  },

  Task: {
    project: async (parent) => await Project.findById(parent.projectId),
  },
};
