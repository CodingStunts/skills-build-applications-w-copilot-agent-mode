import { Router } from 'express';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const apiRouter = Router();

const asyncRoute = (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler => {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
};

apiRouter.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

apiRouter.get('/users/', asyncRoute(async (_req, res) => {
  const users = await User.find().sort({ displayName: 1 });
  res.status(200).json(users);
}));

apiRouter.get('/teams/', asyncRoute(async (_req, res) => {
  const teams = await Team.find().populate('members').sort({ name: 1 });
  res.status(200).json(teams);
}));

apiRouter.get('/activities/', asyncRoute(async (_req, res) => {
  const activities = await Activity.find().populate('user').populate('team').sort({ completedAt: -1 });
  res.status(200).json(activities);
}));

apiRouter.get('/leaderboard/', asyncRoute(async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('user').populate('team').sort({ rank: 1 });
  res.status(200).json(leaderboard);
}));

apiRouter.get('/workouts/', asyncRoute(async (_req, res) => {
  const workouts = await Workout.find().sort({ level: 1, title: 1 });
  res.status(200).json(workouts);
}));

export default apiRouter;
