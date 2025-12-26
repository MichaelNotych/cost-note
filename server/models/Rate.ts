import { Schema, model, HydratedDocument } from 'mongoose'

export interface IRate {
    rates: Map<string, number>
    date: Date
    createdAt: Date
    updatedAt: Date
}

export type RateDocument = HydratedDocument<IRate>

const RateSchema = new Schema<IRate>({
    rates: { type: Map, of: Number, required: true }, // Stores currency codes and their rates relative to USD
    date: { type: Date, default: Date.now },
}, { timestamps: true })

export const Rate = model<IRate>('Rate', RateSchema)
