import { ApolloError } from "apollo-server-express";
import * as Model from "../models";
import Redis from "./redis";
class DataLoaders {
  async getAll(modelName, args) {
    try {
      const options = this.getOptions(args);
      const redisKey = `${modelName}_${Object.values(options).join("_")}`;
      const cache = await Redis.get(redisKey);
      if (cache) {
        return this.parseAllData(cache);
      }
      const data = await Model[modelName].paginate({}, options);
      await Redis.set(redisKey, data);
      return this.parseAllData(data);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async get(modelName, id) {
    try {
      const redisKey = `${modelName}_${id}`;
      const cache = await Redis.get(redisKey);
      if (cache) {
        return cache;
      }
      const data = await Model[modelName].findById(id);
      if (!data) {
        throw new ApolloError(`${modelName} not found`);
      }
      await Redis.set(redisKey, data);
      return data;
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async create(modelName, args) {
    try {
      await Redis.delete(`${modelName}_*`);
      const data = await Model[modelName].create(args);
      return await Model[modelName].findById(data._id);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async update(modelName, args) {
    try {
      const { _id } = args;
      let data = await Model[modelName].findById(_id);
      if (!data) {
        throw new ApolloError(`${modelName} not found`);
      }
      delete args["_id"];
      const keys = Object.keys(args);
      for (const key of keys) {
        data[key] = args[key];
      }
      await data.save();
      await Redis.delete(`${modelName}_*`);
      return await Model[modelName].findById(data._id);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async delete(modelName, _id) {
    try {
      let data = await Model[modelName].findById(_id);
      if (!data) {
        throw new ApolloError(`${modelName} not found`);
      }
      await Model[modelName].deleteOne({ _id });
      await Redis.delete(`${modelName}_*`);
      return `${modelName} is successfully deleted`;
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  getOptions(args) {
    const pagination = args.pagination || {};
    const paginationData = {
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      skip: pagination.skip || 0
    };

    return paginationData;
  }

  parseAllData(data) {
    const pagination = Object.assign({}, data);
    delete pagination["docs"];
    return {
      meta: { ...pagination },
      data: data.docs
    };
  }
}

export default new DataLoaders();
