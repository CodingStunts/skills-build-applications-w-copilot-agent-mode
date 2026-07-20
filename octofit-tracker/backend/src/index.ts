import express from 'express';
import apiRouter from './api/routes';
import { apiBaseUrl } from './config/apiUrl';
import { connectDatabase } from './config/database';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/api', apiRouter);

app.use(((error, _req, res, _next) => {
  console.error('API error:', error);
  res.status(500).json({ error: 'Internal server error' });
}) as express.ErrorRequestHandler);

async function startServer() {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`Octofit API listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start Octofit API:', error);
  process.exit(1);
});
