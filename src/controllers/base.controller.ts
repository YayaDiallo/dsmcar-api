import { NotFound } from '@/errors/index.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { BaseService } from '@/services/base.service.js';
import { Request, Response } from 'express';

interface BaseEntity {
  id: string;
}

export abstract class BaseController<
  T extends BaseService<BaseEntity, unknown>,
> {
  protected service: T;
  readonly path: string;

  constructor({ path, service }: { path: string; service: T }) {
    this.service = service;
    this.path = path;
  }

  async create(request: Request, response: Response) {
    const [resource] = await this.service.create(request.body);
    response.status(201).location(`${this.path}/${resource?.id}`).send();
  }

  async getCollection(request: Request, response: Response) {
    const resources = await this.service.getCollection();
    response.json(resources);
  }

  async getById(request: Request<ParamsWithId>, response: Response) {
    const { id } = request.params;

    const resource = await this.service.getById(id);
    if (!resource) {
      throw new NotFound({
        message: `Resource not found with id: \`${id}\``,
        statusCode: 404,
        code: 'ERR_NOT_FOUND',
      });
    }
    response.json(resource);
  }

  async update(request: Request<ParamsWithId>, response: Response) {
    const { id } = request.params;

    const resource = await this.service.update(id, request.body);
    response.status(200).json({ resource });
  }

  async delete(request: Request<ParamsWithId>, response: Response) {
    const { id } = request.params;

    await this.service.delete(id);
    response.status(204).send();
  }
}
