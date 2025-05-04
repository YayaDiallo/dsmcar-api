export interface BaseRepository<T, InsertSchema = T> {
  create(data: InsertSchema): Promise<T[]>;
  getCollection(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  update(id: string, data: InsertSchema): Promise<{ id: string }[]>;
  delete(id: string): Promise<void>;
}
