import { Schema, model, HydratedDocument } from 'mongoose'

export interface IUser {
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

export type UserDocument = HydratedDocument<IUser>

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true })

export const User = model<IUser>('User', UserSchema)
