import { carService } from '@/services/index.js';
import { BaseController } from './base.controller.js';

class CarController extends BaseController<typeof carService> {
  constructor() {
    super({
      path: '/cars',
      service: carService,
    });
  }
}

export const carController = new CarController();
