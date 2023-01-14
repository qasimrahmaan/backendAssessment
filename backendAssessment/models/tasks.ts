import mongoose from "mongoose";

interface ITask {
  name: string;
}

const Schema = mongoose.Schema;

const tasksSchema = new Schema<ITask>({
	name: {
		type: String,
		required: true,
	},
});

export default mongoose.model<ITask>("Task", tasksSchema);
