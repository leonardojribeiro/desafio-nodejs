import { model, Schema } from "mongoose";
import { IUser } from "../../../entities/IUser";

const usersSchema = new Schema<IUser>({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthDate:{
    type: Date,
    required: true,
  },
  photoUrl: {
    type: String,
  }
});

export const UserModel = model<IUser>('user', usersSchema);