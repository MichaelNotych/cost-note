import { Schema, model, Types, HydratedDocument } from 'mongoose'

export interface IExpense {
    title?: string | null
    amount?: number | null
    currency?: string | null
    category?: Types.ObjectId | null
    date: Date
    userDescription: string
    user: Types.ObjectId
    defaultCurrency?: {
        amount: number
        currency: string
    } | null
    createdAt: Date
    updatedAt: Date
}

export type ExpenseDocument = HydratedDocument<IExpense>

const ExpenseSchema = new Schema<IExpense>({
    title: { type: String, required: false },
    amount: { type: Number, required: false },
    currency: { type: String, required: false },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
    date: { type: Date, default: Date.now },
    userDescription: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    defaultCurrency: {
        amount: { type: Number },
        currency: { type: String }
    }
}, { timestamps: true })

export const Expense = model<IExpense>('Expense', ExpenseSchema)
