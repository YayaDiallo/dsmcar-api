import express, { Application } from 'express';
import { aboutRouter, userRouter } from './routes/index.js';

export class Server {
  app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.use('/api', aboutRouter);
    this.app.use('/api/users', userRouter);
  }
  start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}
