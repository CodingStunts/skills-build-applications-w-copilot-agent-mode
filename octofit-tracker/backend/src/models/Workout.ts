import { Schema, model, models } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    level: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, required: true, trim: true }],
  },
  { collection: 'workouts', timestamps: true },
);

export const Workout = models.Workout || model('Workout', workoutSchema);
