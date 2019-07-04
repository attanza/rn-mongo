import { assert } from "chai";
import { GraphQLClient } from "graphql-request";
import { getToken } from "./auth.spec";

const endpoint = "http://localhost:4000/graphql";
let clientWithHeader = null;
let UnauthorizedClient = null;
const client = new GraphQLClient(endpoint);
let _id = "";

describe("Shop Shop", () => {
  before(async () => {
    const token = await getToken();
    const headers = { Authorization: `Bearer ${token}` };
    clientWithHeader = new GraphQLClient(endpoint, { headers });

    const userToken = await getToken({
      email: "user@system.com",
      password: "password"
    });
    const headers2 = { Authorization: `Bearer ${userToken}` };

    UnauthorizedClient = new GraphQLClient(endpoint, { headers: headers2 });

    const categoryResponse = await clientWithHeader.request(
      shopCategoryListQuery
    );
    createVars.category = categoryResponse.shopCategories.data[0]._id;
    updateVars.category = categoryResponse.shopCategories.data[0]._id;
  });
  /**
   * List of Shop
   */
  it("cannot show Shop list if not authenticated", async () => {
    try {
      await client.request(listQuery);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot show Shop list if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(listQuery);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("show Shop list", async () => {
    const response = await clientWithHeader.request(listQuery);
    assert.isObject(response.shops);
    assert.isObject(response.shops.meta);
    assert.isArray(response.shops.data);
  });

  /**
   * Create Shop
   */
  it("cannot create Shop if not authenticated", async () => {
    try {
      await client.request(createMutation, { shopInput: createVars });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot create Shop if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(createMutation, {
        shopInput: createVars
      });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("create a Shop", async () => {
    const response = await clientWithHeader.request(createMutation, {
      shopInput: createVars
    });
    assert.isObject(response.addShop);
    assert.equal(response.addShop.name, createVars.name);
    _id = response.addShop._id;
  });
  it("create Shop will failed with duplicate name", async () => {
    try {
      await clientWithHeader.request(createMutation, { shopInput: createVars });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "name is already been taken");
    }
  });
  /**
   * Show Shop
   */
  it("cannot show Shop if not authenticated", async () => {
    try {
      await client.request(showQuery, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot show Shop if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(showQuery, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("show a Shop", async () => {
    const response = await clientWithHeader.request(showQuery, { _id });
    assert.isObject(response.shop);
    assert.equal(response.shop.name, createVars.name);
  });

  /**
   * Update Shop
   */
  it("cannot update Shop if not authenticated", async () => {
    try {
      await client.request(updateMutation, { _id, shopInput: updateVars });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot update Shop if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(updateMutation, {
        _id,
        shopInput: updateVars
      });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("update a Shop", async () => {
    const response = await clientWithHeader.request(updateMutation, {
      _id,
      shopInput: updateVars
    });
    assert.isObject(response.updateShop);
    assert.equal(response.updateShop.name, updateVars.name);
  });

  /**
   * Delete Shop
   */
  it("cannot delete Shop if not authenticated", async () => {
    try {
      await client.request(deleteMutation, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot delete Shop if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(deleteMutation, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("delete a Shop", async () => {
    const response = await clientWithHeader.request(deleteMutation, { _id });
    assert.isObject(response);
    assert.equal(response.deleteShop, "Shop successfuly deleted");
  });
});

const createVars = {
  name: "Test Shop",
  category: "",
  email: "testshop@gmail.com",
  phone: "0811687628762",
  street: "Test Street",
  state: "Test State",
  city: "Bandung",
  province: "Jawa Barat",
  country: "Indonesia",
  postCode: "40266",
  latitude: -6.917464,
  longitude: 107.619125,
  isActive: true
};

const updateVars = {
  name: "Test Shop 2",
  category: "",
  email: "testshop@gmail.com",
  phone: "0811687628762",
  street: "Test Street",
  state: "Test State",
  city: "Bandung",
  province: "Jawa Barat",
  country: "Indonesia",
  postCode: "40266",
  latitude: -6.917464,
  longitude: 107.619125,
  isActive: true
};

const ShopData = `
  _id
  name
  category {
    _id
    name
    slug
  }
  email
  phone
  address {
    street
    state
    city
    province
    country
    postCode
  }
  location {
    type
    coordinates
  }
  isActive
  createdAt
  updatedAt
`;
const listQuery = `
{
  shops {
    meta {
      totalDocs
      limit
      skip
      page
      totalPages
      pagingCounter
      prevPage
      nextPage
      hasPrevPage
      hasNextPage
    }
    data { ${ShopData} }
  }
}
`;

const shopCategoryListQuery = `
{
  shopCategories {
    data{
      _id
    }
  }
}
`;

const showQuery = `
query shop($_id: ID!) {
  shop(_id: $_id) {
    ${ShopData}
  }
}
`;

const createMutation = `
mutation addShop($shopInput: ShopInput) {
  addShop(shopInput: $shopInput) {
    ${ShopData}
  }
}
`;

const updateMutation = `
mutation updateShop($_id: ID!, $shopInput: ShopInput) {
  updateShop(_id: $_id, shopInput: $shopInput) {
    ${ShopData}
  }
}
`;

const deleteMutation = `
mutation deleteShop($_id: ID!) {
  deleteShop(_id: $_id)
}

`;
