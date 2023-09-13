  import { CacheRedisDataBase } from "../../../../main/database/redis.connection";

export class CacheRepository {
  private repository = CacheRedisDataBase.connection;

  public async get(key: string): Promise<any> {
    const result = await this.repository.get(key);

    if (!result) {
      return null;
    }

    return JSON.parse(result);
  }

  public async set(key: string, value: string) {
    await this.repository.set(key, JSON.stringify(value));
  }
}
