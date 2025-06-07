import { PROMPT, AI_MODEL } from "~/constants";
import { Expense } from "../models/expense.model";
import { GoogleGenAI } from '@google/genai';
import type { Expense as ExpenseType } from "~/types";

export default defineEventHandler(async (event) => {
	const { user } = await requireUserSession(event);
	const { userDescription } = await readBody(event);

	const date = new Date();
	const expense = await Expense.create({ userDescription, date, user: user.id });

	parseExpense(expense);

	return expense.toObject();
});

const parseExpense = async (expense: ExpenseType) => {
	// parse the expense using AI
	const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
	const response = await ai.models.generateContent({
		model: AI_MODEL,
		contents: `${PROMPT} ${expense.userDescription}`,
	});

	// save info about expense
	try {
		const parsedExpense = JSON.parse(response.text || '{}');
		expense.amount = parsedExpense.amount;
		expense.currency = parsedExpense.currency;
		expense.title = parsedExpense.title;
		await expense.save();
	} catch (error) {
		console.error(error);
	}
};
