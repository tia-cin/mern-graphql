import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const resolvers = {
  Query: {
    getAllProjects: async () => await Project.find(),
    getProject: async (_, { _id }) => await Project.find(_id),
    getAllTasks: async () => await Task.find(),
    getTask: async (_, { _id }) => await Task.find(_id),
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
        console.log(">> Error while creating Task");
      }
    },
  },
};
