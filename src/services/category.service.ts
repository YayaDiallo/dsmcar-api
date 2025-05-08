import {
  CategorySelectSchema,
  CategoryInsertSchema,
} from '@/db/schema/category.schema.js';
import { categoryRepository } from '@/repositories/index.js';
import { BaseService } from '@/services/base.service.js';

class CategoryService extends BaseService<
  CategorySelectSchema,
  CategoryInsertSchema
> {
  constructor() {
    super(categoryRepository);
  }
}

export const categoryService = new CategoryService();
