import { errorHandler } from '@/middlewares/index.js';
import {
  aboutRouter,
  activityRouter,
  userRouter,
  carRouter,
} from '@/routes/index.js';
import express, { Application, ErrorRequestHandler } from 'express';

export class Server {
  app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.app.use(errorHandler as ErrorRequestHandler);
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.use('/api', aboutRouter);
    this.app.use('/api/activities', activityRouter);
    this.app.use('/api/cars', carRouter);
    this.app.use('/api/users', userRouter);
  }

  start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}
