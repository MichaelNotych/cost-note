import { Schema, model } from 'mongoose';
import { hashPassword, verifyPassword } from 'nuxt-auth-utils';
import type { IUser } from '../../types';

// Расширяем интерфейс для методов модели
interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

type UserModel = IUser & IUserMethods;

const UserSchema = new Schema<UserModel>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    maxlength: [30, 'Password cannot exceed 30 characters']
  }
}, {
  timestamps: true,
  versionKey: false
});

// Хеширование пароля перед сохранением
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Метод для сравнения паролей
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await verifyPassword(this.password, candidatePassword);
  } catch {
    return false;
  }
};

// Удаление пароля из JSON ответа
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export const User = model<UserModel>('User', UserSchema);