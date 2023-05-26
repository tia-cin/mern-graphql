import Project from "../../models/Project.js";

export const ProjectResolvers = {
  Query: {
    getAllProjects: async () => await Project.find(),
    getProject: async (_, { _id }) => await Project.findById(_id),
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
    deleteProject: async (_, { _id }) => {
      const deletedProject = await Project.findByIdAndDelete(_id);
      if (!deletedProject) throw new Error("Project not Found");
      await Task.deleteMany({ projectId: deletedProject._id });
      return deletedProject;
    },
    updateProject: async (_, args) => {
      const updatedProject = await Project.findByIdAndUpdate(args._id, args);
      if (updatedProject) throw new Error("Project not found");
      return updatedProject;
    },
  },
};
