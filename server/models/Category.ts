import { Schema, model, Types, HydratedDocument } from 'mongoose'

export interface ICategory {
    name: string
    user: Types.ObjectId
    icon?: string
    createdAt: Date
    updatedAt: Date
}

export type CategoryDocument = HydratedDocument<ICategory>

const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    icon: { type: String, default: '🏷️', required: false },
}, { timestamps: true })

export const Category = model<ICategory>('Category', CategorySchema)
