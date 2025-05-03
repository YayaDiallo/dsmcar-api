export interface BaseRepository<T> {
  create(data: T): Promise<T[]>;
  getCollection(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  update(id: string, data: Partial<T>): Promise<{ id: string }[]>;
  delete(id: string): Promise<void>;
}
