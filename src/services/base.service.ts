import { BaseRepository } from '@/repositories/base.repository.js';

export abstract class BaseService<T, InsertType = T> {
  constructor(protected readonly repository: BaseRepository<T, InsertType>) {}

  async create(data: InsertType): Promise<T[]> {
    return this.repository.create(data);
  }
  async getCollection(): Promise<T[]> {
    return this.repository.getCollection();
  }
  async getById(id: string): Promise<T | undefined> {
    return this.repository.getById(id);
  }
  async update(id: string, data: InsertType): Promise<{ id: string }[]> {
    return this.repository.update(id, data);
  }
  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
