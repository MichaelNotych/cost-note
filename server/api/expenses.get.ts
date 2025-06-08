import { Expense } from "../models/expense.model";

export default defineEventHandler(async (event) => {
	const { user } = await requireUserSession(event);
	const scope = getQuery(event).scope;

	let expenses = await Expense.find({ user: user.id });

	if (scope === 'today') {
		expenses = expenses.filter((expense) => expense.date.toDateString() === new Date().toDateString());
	}

	return expenses.map((expense) => expense.toObject());
});