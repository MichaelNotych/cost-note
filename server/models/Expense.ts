import { Schema, model } from 'mongoose'

const ExpenseSchema = new Schema({
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

export const Expense = model('Expense', ExpenseSchema)
