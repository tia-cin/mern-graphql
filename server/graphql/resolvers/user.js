import User from "../../models/User.js";
import bcrypt from "bcrypt";
import { generateToken, hashPwd, comparePwds } from "../../auth.js";
import { ApolloError } from "apollo-server-errors";

export const UserResolvers = {
  Query: {
    getAllUsers: async () => await User.find(),
    getUser: async (_, { _id }) => await User.findById(_id),
  },

  Mutation: {
    registerUser: async (_, { registerInput: { name, email, password } }) => {
      try {
        const user = await User.findOne({ email });

        if (user)
          throw new ApolloError(
            "User with this email already exists, please use another one",
            "EMAIL_ALREADY_EXISTS"
          );

        const hashedPwd = await hashPwd(password);
        const newUser = new User({ name, email, password: hashedPwd });

        const token = generateToken({ userId: newUser._id, email });
        newUser.token = token;

        await newUser.save();
        return newUser;
      } catch (error) {
        console.log(">> Error while sign up");
      }
    },
    login: async (_, { loginInput: { email, password } }) => {
      try {
        const user = await User.findOne({ email });
        const isPwdValid = await comparePwds(password, user.password);

        if (!user) throw new ApolloError("Invalid email", "INVALID_EMAIL");
        if (!isPwdValid)
          throw new ApolloError("Invalid password", "INVALID_PASSWORD");

        const token = generateToken({ userId: user._id, email });
        user.token = token;
        return user;
      } catch (error) {
        console.log(">> Error while log in", error);
      }
    },
    deleteAccount: async (_, args, context) => {
      try {
        if (context.userId)
          throw new ApolloError(
            "User not authenticated",
            "USER_NOT_AUTHENTICATED"
          );

        const user = await User.findById(context.userId);
        if (!user) throw new ApolloError("User not found", "USER_NOT_FOUND");

        const isPwdValid = await bcrypt.compare(args.password, user.password);
        if (!isPwdValid)
          throw new ApolloError("Invalid password", "INVALID_PASSWORD");

        await user.delete();
        return user;
      } catch (error) {
        console.log(">> Error while deleting account");
      }
    },
  },
};
