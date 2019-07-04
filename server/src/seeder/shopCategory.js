import { Product, ProductCategory, Shop, ShopCategory } from "../models";
import faker from "./faker";
export default async () => {
  await ShopCategory.deleteMany({});
  await Shop.deleteMany({});
  await ProductCategory.deleteMany({});
  await Product.deleteMany({});

  const categories = ["Toko Kelontong", "Kaki Lima"];

  for (let i = 0; i < categories.length; i++) {
    let category = await ShopCategory.create({
      name: categories[i]
    });
    for (let j = 0; j < 3; j++) {
      const shop = await Shop.create({
        name: faker.company(),
        category: category._id,
        email: faker.email(),
        phone: faker.phone(),
        address: {
          street: faker.street(),
          state: faker.state(),
          city: faker.city(),
          province: faker.province(),
          country: faker.country(),
          postCode: faker.postal()
        },
        location: {
          type: "Point",
          coordinates: [
            faker.longitude({ min: 107.61, max: 107.65 }),
            faker.latitude({ min: -6.92, max: -6.91 })
          ]
        },
        isActive: true
      });
      for (let k = 0; k < 3; k++) {
        const category = await ProductCategory.create({
          name: faker.word({ syllables: 3 }),
          shop: shop._id
        });

        for (let l = 0; l < 5; l++) {
          await Product.create({
            name: faker.sentence({ words: 5 }),
            category: category._id,
            price: faker.integer({ min: 5000, max: 20000 }),
            mainImage: "https://picsum.photos/200"
          });
        }
      }
    }
  }
  return true;
};
