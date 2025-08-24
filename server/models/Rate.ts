import { Schema, model } from 'mongoose';
import type { IRate } from '../../types';

const RateSchema = new Schema<IRate>({
  rates: {
    type: String,
    required: [true, 'Rates data is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    unique: true
  }
}, {
  timestamps: { createdAt: true, updatedAt: false },
  versionKey: false
});

// Индекс для быстрого поиска по дате
RateSchema.index({ date: -1 });

export const Rate = model<IRate>('Rate', RateSchema);