import mongoose from 'mongoose';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    
    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [morgan, taylor, jordan] = await User.insertMany([
      {
        username: 'morganpaces',
        displayName: 'Morgan Paces',
        email: 'morgan.paces@example.com',
        city: 'Seattle',
        fitnessGoal: 'Train for a half marathon',
      },
      {
        username: 'taylorlifts',
        displayName: 'Taylor Lifts',
        email: 'taylor.lifts@example.com',
        city: 'Austin',
        fitnessGoal: 'Build full-body strength',
      },
      {
        username: 'jordancycles',
        displayName: 'Jordan Cycles',
        email: 'jordan.cycles@example.com',
        city: 'Denver',
        fitnessGoal: 'Improve cycling endurance',
      },
    ]);

    const [trailBlazers, strengthSquad] = await Team.insertMany([
      {
        name: 'Trail Blazers',
        city: 'Seattle',
        coach: 'Avery Brooks',
        members: [morgan._id, jordan._id],
      },
      {
        name: 'Strength Squad',
        city: 'Austin',
        coach: 'Riley Chen',
        members: [taylor._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: morgan._id,
        team: trailBlazers._id,
        type: 'Outdoor run',
        durationMinutes: 42,
        caloriesBurned: 430,
        completedAt: new Date('2026-07-18T14:30:00.000Z'),
      },
      {
        user: taylor._id,
        team: strengthSquad._id,
        type: 'Strength training',
        durationMinutes: 55,
        caloriesBurned: 510,
        completedAt: new Date('2026-07-19T12:00:00.000Z'),
      },
      {
        user: jordan._id,
        team: trailBlazers._id,
        type: 'Cycling',
        durationMinutes: 75,
        caloriesBurned: 690,
        completedAt: new Date('2026-07-20T09:15:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { user: jordan._id, team: trailBlazers._id, rank: 1, points: 2480, streakDays: 12 },
      { user: taylor._id, team: strengthSquad._id, rank: 2, points: 2315, streakDays: 9 },
      { user: morgan._id, team: trailBlazers._id, rank: 3, points: 2190, streakDays: 7 },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Mobility Reset',
        level: 'beginner',
        focusArea: 'Mobility',
        durationMinutes: 20,
        exercises: ['World greatest stretch', 'Hip airplanes', 'Thoracic rotations'],
      },
      {
        title: 'Tempo Strength Builder',
        level: 'intermediate',
        focusArea: 'Strength',
        durationMinutes: 45,
        exercises: ['Goblet squats', 'Dumbbell rows', 'Romanian deadlifts', 'Plank holds'],
      },
      {
        title: 'Endurance Ride Blocks',
        level: 'advanced',
        focusArea: 'Cardio',
        durationMinutes: 60,
        exercises: ['Zone 2 warmup', 'Threshold intervals', 'Cadence cooldown'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
