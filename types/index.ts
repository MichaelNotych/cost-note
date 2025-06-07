import type { Document } from 'mongoose';

export interface User {
	_id: string;
	name: string;
	email: string;
	password: string;
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
}

export type Expense = Document & IExpense;
