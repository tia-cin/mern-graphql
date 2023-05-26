import Message from "../../models/Message.js";

export const MessageResolvers = {
  Query: {
    message: (_, { _id }) => Message.findById(_id),
  },

  Mutation: {
    createMessage: async (_, { messageInput: { text, user } }) => {
      const newMessage = new Message({ text, createdBy: user });
      await newMessage.save();
      return newMessage;
    },
  },
};
