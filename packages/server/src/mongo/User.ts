import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/types';

const userSchema = new Schema({
    _id: { type: String, required: true },
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
