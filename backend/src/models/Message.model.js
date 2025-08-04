import mongoose from "mongoose";
const { model, Schema, models } = mongoose;

const messagesSchema = new Schema(
  {
    senderId: {
      type:Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String
    },
  },
  { timestamps: true }
);

export const Messages = models?.Messages || model("Messages", messagesSchema);
