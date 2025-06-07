import { Schema, model } from "mongoose";
import type { User as UserType } from "~/types";

const UserSchema = new Schema({
	name: {
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
}, { versionKey: false });

export const User = model<UserType>("User", UserSchema);
