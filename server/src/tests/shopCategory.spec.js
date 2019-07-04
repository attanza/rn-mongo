import { assert } from "chai";
import { GraphQLClient } from "graphql-request";
import { getToken } from "./auth.spec";
const endpoint = "http://localhost:4000/graphql";
let clientWithHeader = null;
let UnauthorizedClient = null;

const client = new GraphQLClient(endpoint);
let _id = "";
describe("ShopCategory", () => {
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
  });
  /**
   * List of ShopCategory
   */
  it("cannot show ShopCategory list if not authenticated", async () => {
    try {
      await client.request(listQuery);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot show ShopCategory list if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(listQuery);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("show ShopCategory list", async () => {
    const response = await clientWithHeader.request(listQuery);
    assert.isObject(response.shopCategories);
    assert.isObject(response.shopCategories.meta);
    assert.isArray(response.shopCategories.data);
  });

  /**
   * Create ShopCategory
   */
  it("cannot create ShopCategory if not authenticated", async () => {
    try {
      await client.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot create ShopCategory if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("create a ShopCategory", async () => {
    const response = await clientWithHeader.request(createMutation, createVars);
    assert.isObject(response.addShopCategory);
    assert.equal(response.addShopCategory.name, createVars.name);
    _id = response.addShopCategory._id;
  });
  it("create ShopCategory will failed with duplicate name", async () => {
    try {
      await clientWithHeader.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "name is already been taken");
    }
  });
  /**
   * Show ShopCategory
   */
  it("cannot show ShopCategory if not authenticated", async () => {
    try {
      await client.request(showQuery, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot show ShopCategory if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(showQuery, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("show a ShopCategory", async () => {
    const response = await clientWithHeader.request(showQuery, { _id });
    assert.isObject(response.shopCategory);
    assert.equal(response.shopCategory.name, createVars.name);
  });

  /**
   * Update ShopCategory
   */
  it("cannot update ShopCategory if not authenticated", async () => {
    try {
      updateVars._id = _id;
      await client.request(updateMutation, updateVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot update ShopCategory if unauthorized", async () => {
    try {
      updateVars._id = _id;
      await UnauthorizedClient.request(updateMutation, updateVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("update a ShopCategory", async () => {
    updateVars._id = _id;
    const response = await clientWithHeader.request(updateMutation, updateVars);
    assert.isObject(response.updateShopCategory);
    assert.equal(response.updateShopCategory.name, updateVars.name);
  });

  /**
   * Delete ShopCategory
   */
  it("cannot delete ShopCategory if not authenticated", async () => {
    try {
      await client.request(deleteMutation, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot delete ShopCategory if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(deleteMutation, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("delete a ShopCategory", async () => {
    const response = await clientWithHeader.request(deleteMutation, { _id });
    assert.isObject(response);
    assert.equal(
      response.deleteShopCategory,
      "ShopCategory successfuly deleted"
    );
  });
});

const createVars = {
  name: "Caffe"
};

const updateVars = {
  name: "Caffe Edited"
};

const ShopCategoryData = `
  _id
  name
  slug
  description
  createdAt
  updatedAt
`;
const listQuery = `
{
  shopCategories {
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
    data { ${ShopCategoryData} }
  }
}
`;

const showQuery = `
query shopCategory($_id: ID!) {
  shopCategory(_id: $_id) {
    ${ShopCategoryData}
  }
}
`;

const createMutation = `
mutation addShopCategory($name: String!, $description: String) {
  addShopCategory(name: $name, description: $description) {
    ${ShopCategoryData}
  }
}
`;

const updateMutation = `
mutation updateShopCategory($_id: ID!, $name: String!, $description: String) {
  updateShopCategory(_id: $_id, name: $name, description: $description) {
    ${ShopCategoryData}
  }
}
`;

const deleteMutation = `
mutation deleteShopCategory($_id: ID!) {
  deleteShopCategory(_id: $_id)
}
`;
