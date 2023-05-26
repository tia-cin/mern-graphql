import Task from "../../models/Task.js";

export const TaskResolver = {
  Query: {
    getAllTasks: async () => await Task.find(),
    getTask: async (_, { _id }) => await Task.findById(_id),
  },

  Mutation: {
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
    deleteTask: async (_, { _id }) => {
      const deletedTask = await Task.findByIdAndDelete(_id);
      if (!deletedTask) throw new Error("Task not found");
      return deletedTask;
    },
    updateTask: async (_, args) => {
      const updatedTask = await Task.findByIdAndUpdate(args._id, args);
      if (updatedTask) throw new Error("Task not found");
      return updatedTask;
    },
  },
};
