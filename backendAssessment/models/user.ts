import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
}

const Schema = mongoose.Schema;

const userSchema = new Schema<IUser>({
	email: {
		type: String,
		required: true,
	},
  password: {
		type: String,
		required: true,
	},
});

export default mongoose.model<IUser>("User", userSchema);