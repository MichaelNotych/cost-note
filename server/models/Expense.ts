import { Schema, model } from 'mongoose';
import type { IExpense } from '../../types';

const ExpenseSchema = new Schema<IExpense>({
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  amount: {
    type: Number,
    min: [0, 'Amount must be positive']
  },
  currency: {
    type: String,
    uppercase: true,
    length: [3, 'Currency must be 3 characters (ISO code)']
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  date: {
    type: Date,
    default: Date.now
  },
  userDescription: {
    type: String,
    required: [true, 'User description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  user: {
    type: String,
    required: [true, 'User is required']
  },
  defaultCurrency: {
    amount: {
      type: Number,
      min: [0, 'Amount must be positive']
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
      length: [3, 'Currency must be 3 characters (ISO code)']
    }
  }
}, {
  timestamps: true,
  versionKey: false
});

// Индексы для оптимизации запросов
ExpenseSchema.index({ user: 1, date: -1 });
ExpenseSchema.index({ user: 1, category: 1 });
ExpenseSchema.index({ user: 1, createdAt: -1 });

export const Expense = model<IExpense>('Expense', ExpenseSchema);