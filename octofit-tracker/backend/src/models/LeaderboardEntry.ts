import { Schema, model, models } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    streakDays: { type: Number, required: true, min: 0 },
  },
  { collection: 'leaderboard', timestamps: true },
);

export const LeaderboardEntry = models.LeaderboardEntry || model('LeaderboardEntry', leaderboardEntrySchema);
