import { Document, Model, Schema, model, models } from "mongoose";
import { ICommunity } from "./community.model";
import { IUser } from "./user.model";

export interface IThread extends Document {
  text: string;
  author: IUser;
  community: ICommunity;
  parentId: string;
  children: IThread[];
}

export const threadSchema: Schema = new Schema(
  {
    text: { type: String, require: true },
    author: { type: Schema.Types.ObjectId, ref: "User", require: true },
    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },
    parentId: { type: String },
    children: [{ type: Schema.Types.ObjectId, ref: "Thread" }],
  },
  { timestamps: true }
);

const Thread: Model<IThread> = models.Thread || model("Thread", threadSchema);

export default Thread;
