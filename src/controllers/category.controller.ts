import { categoryService } from '@/services/index.js';
import { BaseController } from './base.controller.js';

class CategoryController extends BaseController<typeof categoryService> {
  constructor() {
    super({
      path: '/categories',
      service: categoryService,
    });
  }
}

export const categoryController = new CategoryController();
