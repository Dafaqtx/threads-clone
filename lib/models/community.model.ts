import { Document, Model, Schema, model, models } from "mongoose";
import { IThread } from "./thread.model";
import { IUser } from "./user.model";

export interface ICommunity extends Document {
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  onBoarded: boolean;
  createdBy: IUser;
  threads: IThread[];
  members: IUser[];
}

export const communitySchema: Schema = new Schema(
  {
    id: { type: String, require: true },
    username: { type: String, require: true },
    name: { type: String, require: true },
    image: String,
    bio: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    threads: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thread",
      },
    ],
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Community: Model<ICommunity> =
  models.Community || model("Community", communitySchema);

export default Community;
