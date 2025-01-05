import express, { Request, Response } from 'express';

export const aboutRouter = express.Router();

aboutRouter.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to dsmcar API', version: '1.0.0' });
});
