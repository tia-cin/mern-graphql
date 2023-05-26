import User from "../../models/User";
import { generateToken, hashPwd, comparePwds } from "../../auth.js";
import bcrypt from "bcrypt";

export const UserResolvers = {
  Query: {
    getAllUsers: async () => await User.find(),
    getUser: async (_, { _id }) => await User.findById(_id),
  },

  Mutation: {
    registerUser: async (_, { registerInput: { name, email, password } }) => {},
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
  },
};
