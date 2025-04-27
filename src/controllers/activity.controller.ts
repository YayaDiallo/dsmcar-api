import { NotFound } from '@/errors/index.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { activityService } from '@/services/index.js';
import { Request, Response } from 'express';

class ActivityController {
  private activityService: typeof activityService;
  private path: string;

  constructor() {
    this.activityService = activityService;
    this.path = '/activities';
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request: Request, response: Response) {
    const [activity] = await this.activityService.create(request.body);
    response.status(201).location(`${this.path}/${activity?.id}`).send();
  }

  async getAll(request: Request, response: Response) {
    const activities = await this.activityService.getAll();
    response.json(activities);
  }
  async getById(request: Request<ParamsWithId>, response: Response) {
    const { id } = request.params;

    const [activity] = await this.activityService.getById(id);
    if (!activity) {
      throw new NotFound({
        message: `Activity not found with id: \`${id}\``,
        statusCode: 404,
        code: 'ERR_NOT_FOUND',
      });
    }
    response.json(activity);
  }

  async update(request: Request<ParamsWithId>, response: Response) {
    const { id } = request.params;

    const activity = await this.activityService.update(id, request.body);
    response.status(200).json({ activity });
  }

  async delete(request: Request<ParamsWithId>, response: Response) {
    const { id } = request.params;

    await this.activityService.delete(id);
    response.status(204).send();
  }
}

export const activityController = new ActivityController();
