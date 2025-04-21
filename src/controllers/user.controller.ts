import { NotFound } from '@/errors/index.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { userService } from '@/services/index.js';
import { Request, Response } from 'express';

class UserController {
  private userService: typeof userService;
  private path: string;

  constructor() {
    this.userService = userService;
    this.path = '/users';
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request: Request, response: Response) {
    const [user] = await this.userService.create(request.body);
    response.status(201).location(`${this.path}/${user?.id}`).send();
  }

  async getAll(request: Request, response: Response) {
    const users = await this.userService.getAll();
    response.json(users);
  }
  async getById(request: Request<ParamsWithId>, response: Response) {
    const { id } = request.params;

    const [user] = await this.userService.getById(id);
    if (!user) {
      throw new NotFound({
        message: `User not found with id: \`${id}\``,
        statusCode: 404,
        code: 'ERR_NOT_FOUND',
      });
    }
    response.json(user);
  }

  async update(request: Request<ParamsWithId>, response: Response) {
    const { id } = request.params;

    const user = await this.userService.update(id, request.body);
    response.status(200).json({ user });
  }

  async delete(request: Request<ParamsWithId>, response: Response) {
    const { id } = request.params;

    await this.userService.delete(id);
    response.status(204).send();
  }
}

export const userController = new UserController();
