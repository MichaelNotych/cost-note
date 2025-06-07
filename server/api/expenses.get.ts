import { Expense } from "../models/expense.model";

export default defineEventHandler(async (event) => {
	const { user } = await requireUserSession(event);
	const expenses = await Expense.find({ user: user.id });

	return expenses.map((expense) => expense.toObject());
});