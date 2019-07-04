import {
  CheckPermission,
  DataLoaders,
  ExistsValidator,
  MongoIdValidator,
  UniqueValidator,
  Validate
} from "../helpers";

const rules = {
  name: "required|string|max:100",
  category: "required",
  email: "required|email",
  phone: "required|string:max:30",
  street: "string|max:255",
  state: "string|max:50",
  city: "string|max:50",
  province: "string|max:50",
  country: "string|max:50",
  postCode: "string|max:12",
  latitude: "number",
  longitude: "number",
  isActive: "required|boolean"
};

export default {
  Query: {
    shops: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "read-shop");
        return await DataLoaders.getAll("Shop", args);
      } catch (e) {
        return e;
      }
    },
    shop: async (_, { _id }, { authUser }) => {
      try {
        CheckPermission(authUser, "read-shop");
        MongoIdValidator(_id);
        return await DataLoaders.get("Shop", _id);
      } catch (e) {
        return e;
      }
    }
  },
  Mutation: {
    addShop: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "create-shop");
        const shopInput = Object.assign({}, args.shopInput);
        await ExistsValidator("ShopCategory", shopInput.category);
        await Validate(shopInput, rules);
        await UniqueValidator("Shop", "name", shopInput.name);
        await UniqueValidator("Shop", "email", shopInput.email);
        await UniqueValidator("Shop", "phone", shopInput.phone);
        const data = await DataLoaders.create("Shop", parseShopData(shopInput));
        return await DataLoaders.get("Shop", data._id);
      } catch (e) {
        return e;
      }
    },
    updateShop: async (_, args, { authUser }) => {
      try {
        CheckPermission(authUser, "update-shop");
        MongoIdValidator(args._id);
        const shopInput = Object.assign({}, args.shopInput);
        await ExistsValidator("ShopCategory", shopInput.category);
        await Validate(shopInput, rules);
        await UniqueValidator("Shop", "name", shopInput.name, args._id);
        await UniqueValidator("Shop", "email", shopInput.email, args._id);
        await UniqueValidator("Shop", "phone", shopInput.phone, args._id);
        const dataToUpdate = parseShopData(shopInput);
        dataToUpdate._id = args._id;
        const data = await DataLoaders.update("Shop", dataToUpdate);
        return await DataLoaders.get("Shop", data._id);
      } catch (e) {
        return e;
      }
    },
    deleteShop: async (_, { _id }, { authUser }) => {
      try {
        CheckPermission(authUser, "delete-shop");
        MongoIdValidator(_id);
        await DataLoaders.delete("Shop", _id);
        return "Shop successfuly deleted";
      } catch (e) {
        return e;
      }
    }
  }
};

const parseShopData = data => {
  return {
    name: data.name,
    category: data.category,
    email: data.email,
    phone: data.phone,
    address: {
      street: data.street,
      state: data.state,
      city: data.city,
      province: data.province,
      country: data.country,
      postCode: data.postCode
    },
    location: {
      type: "Point",
      coordinates: [data.longitude, data.latitude]
    },
    isActive: data.isActive
  };
};
