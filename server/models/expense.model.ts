import { Schema, model } from "mongoose";
import type { Expense as ExpenseType } from "~/types";

const DefaultCurrencyExpenseSchema = new Schema({
	amount: {
		type: Number,
		required: true,
	},
	currency: {
		type: String,
		required: true,
	},
}, { versionKey: false });

const ExpenseSchema = new Schema({
	title: {
		type: String,
		required: false,
	},
	amount: {
		type: Number,
		required: false,
	},
	currency: {
		type: String,
		required: false,
	},
	category: {
		type: String,
		required: false,
	},
	userDescription: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	defaultCurrency: {
		type: DefaultCurrencyExpenseSchema,
		required: false,
	}
}, { versionKey: false });

export const Expense = model<ExpenseType>("Expense", ExpenseSchema);
