import User from "../../models/User";

export const userResolvers = {
  Query: {
    getAllUsers: async () => await User.find(),
    getUser: async (_, { _id }) => await User.findById(_id),
  },

  Mutation: {},
};
