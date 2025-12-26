import { Schema, model } from 'mongoose'

const RateSchema = new Schema({
    rates: { type: Map, of: Number, required: true }, // Stores currency codes and their rates relative to USD
    date: { type: Date, default: Date.now },
}, { timestamps: true })

export const Rate = model('Rate', RateSchema)
