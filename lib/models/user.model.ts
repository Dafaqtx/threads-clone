import { Document, Model, Schema, model, models } from "mongoose";
import { ICommunity } from "./community.model";
import { IThread } from "./thread.model";

export interface IUser extends Document {
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  threads: IThread[];
  onBoarded: boolean;
  communities: ICommunity[];
}

export const userSchema: Schema = new Schema(
  {
    id: { type: String, require: true },
    username: { type: String, require: true },
    name: { type: String, require: true },
    image: String,
    bio: String,
    threads: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thread",
      },
    ],
    onBoarded: {
      type: Boolean,
      default: false,
    },
    communities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Community",
      },
    ],
  },
  { timestamps: true }
);

const User: Model<IUser> = models.User || model("User", userSchema);

export default User;
