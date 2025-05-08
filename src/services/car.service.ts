import { CarSelectSchema, CarInsertSchema } from '@/db/schema/car.schema.js';
import { carRepository } from '@/repositories/index.js';
import { BaseService } from '@/services/base.service.js';

class CarService extends BaseService<CarSelectSchema, CarInsertSchema> {
  constructor() {
    super(carRepository);
  }
}

export const carService = new CarService();
