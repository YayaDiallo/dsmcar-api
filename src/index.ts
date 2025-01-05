import { Server } from './server.js';
import env from './env.js';

const PORT = env.PORT;

const app = new Server();

const startApp = async (): Promise<void> => {
  try {
    app.start(PORT);
  } catch (error) {
    console.error(error);
  }
};

startApp();
