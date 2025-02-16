import express, { Request, Response } from 'express';

export const aboutRouter = express.Router();

aboutRouter.get('/', (request: Request, response: Response) => {
  response.json({ message: 'Welcome to dsmcar API', version: '1.0.0' });
});
