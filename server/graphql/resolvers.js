import Project from "../models/Project.js";

export const resolvers = {
  Query: {
    hello: () => "hello!",
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
  },
};
