import express, { Request, Response } from 'express';
import env from './env.js';

const app = express();
const PORT = env.PORT;

app.get('/', (request: Request, response: Response) => {
  response.json({ message: 'Welcome to dsmcar API', version: '1.0.0' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
