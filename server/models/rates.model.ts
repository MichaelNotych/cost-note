import { Schema, model } from "mongoose";
import type { Rate as RateType } from "~/types";

const RateSchema = new Schema({
	rates: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
}, { versionKey: false })

export const Rate = model<RateType>('Rate', RateSchema);