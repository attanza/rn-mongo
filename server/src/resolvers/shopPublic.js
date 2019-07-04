import { Redis } from "../helpers";
import { Shop, ShopCategory } from "../models";
export default {
  Query: {
    shopsPublic: async (_, args) => {
      try {
        const { latitude, longitude } = args;
        const filter = { isActive: true };
        const redisKey = `Shop_Public_${latitude}_${longitude}`;
        const cache = await Redis.get(redisKey);
        if (cache) {
          return cache;
        }
        const data = await Shop.aggregate([
          {
            $geoNear: {
              near: {
                type: `Point`,
                coordinates: { longitude, latitude }
              },
              distanceField: `distance`,
              // distanceMultiplier: 0.000998,
              maxDistance: 4000,
              query: filter,
              spherical: true
            }
          }
        ]);

        await Redis.set(redisKey, data);

        return data;
      } catch (e) {
        return e;
      }
    }
  },

  ShopPublic: {
    category: async parent => {
      const category = parent.category;
      return await ShopCategory.findById(category);
    }
  }
};
