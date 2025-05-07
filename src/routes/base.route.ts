import express from 'express';

interface Controller {
  path: string;
}

export abstract class BaseRoute<T extends Controller> {
  protected controller: T;
  public readonly router: express.Router;
  protected path: string;

  constructor({ controller }: { controller: T }) {
    this.controller = controller;
    this.path = controller.path;
    this.router = express.Router();
    this.initializeRoutes();
  }

  protected bindController(methodName: keyof T) {
    const method = this.controller[methodName];
    if (typeof method === 'function') {
      return method.bind(this.controller);
    }
    throw new Error(
      `Controller method ${String(methodName)} is not a function`,
    );
  }

  protected abstract initializeRoutes(): void;
}
