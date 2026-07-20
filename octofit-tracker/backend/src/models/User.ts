import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    fitnessGoal: { type: String, required: true, trim: true },
  },
  { collection: 'users', timestamps: true },
);

export const User = models.User || model('User', userSchema);
