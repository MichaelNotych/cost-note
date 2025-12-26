import { Schema, model } from 'mongoose'

const CategorySchema = new Schema({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    icon: { type: String, default: '🏷️', required: false },
}, { timestamps: true })

export const Category = model('Category', CategorySchema)
