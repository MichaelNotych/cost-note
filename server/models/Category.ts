import { Schema, model } from 'mongoose';
import type { ICategory } from '../../types';

const CategorySchema = new Schema<ICategory>({
  title: {
    type: String,
    required: [true, 'Category title is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Title cannot exceed 50 characters']
  },
  color: {
    type: String,
    required: [true, 'Category color is required'],
    match: [/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color']
  }
}, {
  timestamps: true,
  versionKey: false
});

export const Category = model<ICategory>('Category', CategorySchema);