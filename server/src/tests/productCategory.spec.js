import { assert } from "chai";
import { GraphQLClient } from "graphql-request";
import { getToken } from "./auth.spec";
const endpoint = "http://localhost:4000/graphql";
let clientWithHeader = null;
let UnauthorizedClient = null;

const client = new GraphQLClient(endpoint);
let _id = "";
describe("ProductCategory", () => {
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

    const shopResponse = await clientWithHeader.request(shopListQuery);
    createVars.shop = shopResponse.shops.data[0]._id;
    updateVars.shop = shopResponse.shops.data[0]._id;
  });
  /**
   * List of ProductCategory
   */
  it("cannot show ProductCategory list if not authenticated", async () => {
    try {
      await client.request(listQuery);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot show ProductCategory list if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(listQuery);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("show ProductCategory list", async () => {
    const response = await clientWithHeader.request(listQuery);
    assert.isObject(response.shopCategories);
    assert.isObject(response.shopCategories.meta);
    assert.isArray(response.shopCategories.data);
  });

  /**
   * Create ProductCategory
   */
  it("cannot create ProductCategory if not authenticated", async () => {
    try {
      await client.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot create ProductCategory if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("create a ProductCategory", async () => {
    const response = await clientWithHeader.request(createMutation, createVars);
    assert.isObject(response.addProductCategory);
    assert.equal(response.addProductCategory.name, createVars.name);
    _id = response.addProductCategory._id;
  });
  it("create ProductCategory will failed with duplicate name", async () => {
    try {
      await clientWithHeader.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "name is already been taken");
    }
  });
  /**
   * Show ProductCategory
   */
  it("cannot show ProductCategory if not authenticated", async () => {
    try {
      await client.request(showQuery, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot show ProductCategory if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(showQuery, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("show a ProductCategory", async () => {
    const response = await clientWithHeader.request(showQuery, { _id });
    assert.isObject(response.productCategory);
    assert.equal(response.productCategory.name, createVars.name);
  });

  /**
   * Update ProductCategory
   */
  it("cannot update ProductCategory if not authenticated", async () => {
    try {
      updateVars._id = _id;
      await client.request(updateMutation, updateVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot update ProductCategory if unauthorized", async () => {
    try {
      updateVars._id = _id;
      await UnauthorizedClient.request(updateMutation, updateVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("update a ProductCategory", async () => {
    updateVars._id = _id;
    const response = await clientWithHeader.request(updateMutation, updateVars);
    assert.isObject(response.updateProductCategory);
    assert.equal(response.updateProductCategory.name, updateVars.name);
  });

  /**
   * Delete ProductCategory
   */
  it("cannot delete ProductCategory if not authenticated", async () => {
    try {
      await client.request(deleteMutation, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot delete ProductCategory if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(deleteMutation, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("delete a ProductCategory", async () => {
    const response = await clientWithHeader.request(deleteMutation, { _id });
    assert.isObject(response);
    assert.equal(
      response.deleteProductCategory,
      "ProductCategory successfuly deleted"
    );
  });
});

const createVars = {
  name: "Mobil"
};

const updateVars = {
  name: "Automotive"
};

const ProductCategoryData = `
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
    data { ${ProductCategoryData} }
  }
}
`;

const shopListQuery = `
{
  shops {
    data{
      _id
    }
  }
}
`;

const showQuery = `
query productCategory($_id: ID!) {
  productCategory(_id: $_id) {
    ${ProductCategoryData}
  }
}
`;

const createMutation = `
mutation addProductCategory($name: String!, $description: String, $shop: ID!) {
  addProductCategory(name: $name, description: $description, shop: $shop) {
    ${ProductCategoryData}
  }
}
`;

const updateMutation = `
mutation updateProductCategory($_id: ID!, $name: String!, $description: String, $shop: ID!) {
  updateProductCategory(_id: $_id, name: $name, description: $description, shop: $shop) {
    ${ProductCategoryData}
  }
}
`;

const deleteMutation = `
mutation deleteProductCategory($_id: ID!) {
  deleteProductCategory(_id: $_id)
}
`;
