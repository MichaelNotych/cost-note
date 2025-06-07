import type { Document } from 'mongoose';

export interface User {
	_id: string;
	name: string;
	email: string;
	password: string;
}

interface IDefaultCurrencyExpense {
	amount: number;
	currency: string;
}

export interface IExpense {
	_id: string;
	title?: string;
	amount?: number;
	currency?: string;
	category?: string;
	date: Date;
	userDescription: string;
	user: string;
	defaultCurrency?: IDefaultCurrencyExpense;
}

export type Expense = Document & IExpense;

export interface IRate {
	_id: string;
	rates: string;
	date: Date;
}

export type Rate = Document & IRate;