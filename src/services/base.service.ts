import { BaseRepository } from '@/repositories/base.repository.js';
import { GetCollectionResponse } from '@/services/service.helper.js';

export class BaseService<
  T,
  InsertType = T,
  Repository extends BaseRepository<T, InsertType> = BaseRepository<
    T,
    InsertType
  >,
> {
  protected repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }
  async create(data: InsertType): Promise<T[]> {
    return this.repository.create(data);
  }

  // TODO: Calculate totalCount by querying the database directly
  async getCollection(): Promise<GetCollectionResponse<T>> {
    const collection = await this.repository.getCollection();
    return {
      totalCount: collection.length,
      rows: collection,
    };
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
