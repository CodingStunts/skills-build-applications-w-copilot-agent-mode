import express from 'express';
import apiRouter from './api/routes';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Octofit API listening on port ${port}`);
});
