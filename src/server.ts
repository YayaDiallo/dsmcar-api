import { appConfig, authConfig } from '@/config/index.js';
import { errorHandler } from '@/middlewares/index.js';
import {
  aboutRouter,
  activityRouter,
  authRouter,
  carRouter,
  categoryRouter,
  goalRouter,
  transactionRouter,
  userRouter,
} from '@/routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
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
    this.app.use(
      cors({
        origin: appConfig.origins,
      }),
    );
    this.app.use(express.json());
    this.app.use(cookieParser(authConfig.cookieSecret));
  }

  private initializeRoutes(): void {
    this.app.use('/api', aboutRouter);
    this.app.use('/api', activityRouter);
    this.app.use('/api', authRouter);
    this.app.use('/api', carRouter);
    this.app.use('/api', categoryRouter);
    this.app.use('/api', goalRouter);
    this.app.use('/api', transactionRouter);
    this.app.use('/api', userRouter);
  }

  start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}
