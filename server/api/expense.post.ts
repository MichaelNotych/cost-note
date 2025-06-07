import { PROMPT, AI_MODEL, DEFAULT_CURRENCY } from "~/constants";
import { Expense } from "../models/expense.model";
import { GoogleGenAI } from '@google/genai';
import type { Expense as ExpenseType } from "~/types";
import { Rate } from "../models/rates.model";

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

	try {
		if (!expense.currency) {
			throw new Error('Currency is required');
		}
		// convert to default currency
		const latestRates = await getLatestRates();
		const rate = latestRates[expense.currency];
		const defaultRate = latestRates[DEFAULT_CURRENCY];
		if (!expense.amount) {
			throw new Error('Amount is required');
		}
		if (!rate) {
			throw new Error('Rate is required');
		}
		const USDAmount = expense.amount / rate;
		const defaultCurrencyAmount = parseFloat((USDAmount * defaultRate).toFixed(2));
		expense.defaultCurrency = {
			amount: defaultCurrencyAmount,
			currency: DEFAULT_CURRENCY,
		};
		await expense.save();
	} catch (error) {
		console.error(error);
	}
};

const getLatestRates = async () => {
	const latestRate = await Rate.findOne().sort({ date: -1 });
	const rates = JSON.parse(latestRate?.rates || '{}');
	return rates;
};
