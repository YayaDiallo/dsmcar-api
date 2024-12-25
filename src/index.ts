import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8080;

app.get('/', (request: Request, response: Response) => {
  response.json({ message: 'Welcome to dsmcar API', version: '1.0.0' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
