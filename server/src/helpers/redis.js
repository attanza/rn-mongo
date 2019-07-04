import ioredis from "ioredis";
import redisDeletePattern from "redis-delete-pattern";
const Redis = new ioredis();
const { REDIS_EXPIRY } = process.env;
const redisExpiry = REDIS_EXPIRY || 3600000;
class RedisHelper {
  async get(key) {
    const data = await Redis.get(key);
    return JSON.parse(data);
  }

  async set(key, data) {
    await Redis.set(key, JSON.stringify(data), "EX", redisExpiry);
  }

  async clear() {
    await Redis.flushall();
  }

  delete(pattern) {
    return new Promise((resolve, reject) => {
      redisDeletePattern(
        {
          redis: Redis,
          pattern: pattern
        },
        function handleError(err) {
          if (err) reject(err);
          resolve("Success");
        }
      );
    });
  }
}

export default new RedisHelper();
