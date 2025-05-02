import { NotFound } from '@/errors/index.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { carService } from '@/services/index.js';
import { Request, Response } from 'express';

class CarController {
  private carService: typeof carService;
  private path: string;

  constructor() {
    this.carService = carService;
    this.path = '/cars';
    this.getCollection = this.getCollection.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request: Request, response: Response) {
    const [car] = await this.carService.create(request.body);
    response.status(201).location(`${this.path}/${car?.id}`).send();
  }

  async getCollection(request: Request, response: Response) {
    const cars = await this.carService.getCollection();
    response.json(cars);
  }
  async getById(request: Request<ParamsWithId>, response: Response) {
    const { id } = request.params;

    const [car] = await this.carService.getById(id);
    if (!car) {
      throw new NotFound({
        message: `Car not found with id: \`${id}\``,
        statusCode: 404,
        code: 'ERR_NOT_FOUND',
      });
    }
    response.json(car);
  }

  async update(request: Request<ParamsWithId>, response: Response) {
    const { id } = request.params;

    const car = await this.carService.update(id, request.body);
    response.status(200).json({ car });
  }

  async delete(request: Request<ParamsWithId>, response: Response) {
    const { id } = request.params;

    await this.carService.delete(id);
    response.status(204).send();
  }
}

export const carController = new CarController();
