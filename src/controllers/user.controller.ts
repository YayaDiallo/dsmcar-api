import { Request, Response } from 'express';
import { userService } from '../services/index.js';
import { NotFound } from '../errors/index.js';

class UserController {
  private userService: typeof userService;

  constructor() {
    this.userService = userService;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request: Request, response: Response) {
    const [user] = await this.userService.create(request.body);
    response
      .status(201)
      .location(`http://localhost:8080/api/users/${user.id}`)
      .send();
  }

  async getAll(request: Request, response: Response) {
    const users = await this.userService.getAll();
    response.json(users);
  }
  async getById(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) {
      response.status(400).json({ message: 'Missing user ID' });
    } else {
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
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    if (!id) {
      response.status(400).json({ message: 'Missing user ID' });
    } else {
      const user = await this.userService.update(id, request.body);
      response.status(200).json({ user });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) {
      response.status(400).json({ message: 'Missing user ID' });
    } else {
      await this.userService.delete(id);
      response.status(204).send();
    }
  }
}

export const userController = new UserController();
