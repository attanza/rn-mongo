import { assert } from "chai";
import { GraphQLClient } from "graphql-request";
import { getToken } from "./auth.spec";
const endpoint = "http://localhost:4000/graphql";
let clientWithHeader = null;
let UnauthorizedClient = null;

const client = new GraphQLClient(endpoint);
let _id = "";
describe("Product1", () => {
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
      productCategoryList
    );
    createVars.category = categoryResponse.productCategories.data[0]._id;
    updateVars.category = categoryResponse.productCategories.data[0]._id;
  });
  /**
   * List of Product
   */
  it("cannot show Product list if not authenticated", async () => {
    try {
      await client.request(listQuery);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot show Product list if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(listQuery);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("show Product list", async () => {
    const response = await clientWithHeader.request(listQuery);
    assert.isObject(response.products);
    assert.isObject(response.products.meta);
    assert.isArray(response.products.data);
  });

  /**
   * Create Product
   */
  it("cannot create Product if not authenticated", async () => {
    try {
      await client.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot create Product if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("create a Product", async () => {
    const response = await clientWithHeader.request(createMutation, createVars);
    assert.isObject(response.addProduct);
    assert.equal(response.addProduct.name, createVars.name);
    _id = response.addProduct._id;
  });
  it("create Product will failed with duplicate name", async () => {
    try {
      await clientWithHeader.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "name is already been taken");
    }
  });
  /**
   * Show Product
   */
  it("cannot show Product if not authenticated", async () => {
    try {
      await client.request(showQuery, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot show Product if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(showQuery, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("show a Product", async () => {
    const response = await clientWithHeader.request(showQuery, { _id });
    assert.isObject(response.product);
    assert.equal(response.product.name, createVars.name);
  });

  /**
   * Update Product
   */
  it("cannot update Product if not authenticated", async () => {
    try {
      updateVars._id = _id;
      await client.request(updateMutation, updateVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot update Product if unauthorized", async () => {
    try {
      updateVars._id = _id;
      await UnauthorizedClient.request(updateMutation, updateVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("update a Product", async () => {
    updateVars._id = _id;
    const response = await clientWithHeader.request(updateMutation, updateVars);
    assert.isObject(response.updateProduct);
    assert.equal(response.updateProduct.name, updateVars.name);
  });

  /**
   * Delete Product
   */
  it("cannot delete Product if not authenticated", async () => {
    try {
      await client.request(deleteMutation, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot delete Product if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(deleteMutation, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("delete a Product", async () => {
    const response = await clientWithHeader.request(deleteMutation, { _id });
    assert.isObject(response);
    assert.equal(response.deleteProduct, "Product successfuly deleted");
  });
});

const createVars = {
  name: "Pepsodent",
  price: 12500
};

const updateVars = {
  name: "Sensodine",
  price: 10500
};

const ProductData = `
_id
name
price
category{
  _id
  name
}
description
createdAt
updatedAt
`;
const listQuery = `
{
  products {
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
    data { ${ProductData} }
  }
}
`;

const productCategoryList = `
{
  productCategories {
    data{
      _id
    }
  }
}
`;

const showQuery = `
query product($_id: ID!) {
  product(_id: $_id) {
    ${ProductData}
  }
}
`;

const createMutation = `
mutation addProduct($name: String!, $description: String, $category: ID!, $price: Float!) {
  addProduct(name: $name, description: $description, category: $category, price: $price) {
    ${ProductData}
  }
}
`;

const updateMutation = `
mutation updateProduct($_id: ID!, $name: String!, $description: String, $category: ID!, $price: Float!) {
  updateProduct(_id: $_id, name: $name, description: $description, category: $category, price: $price) {
    ${ProductData}
  }
}
`;

const deleteMutation = `
mutation deleteProduct($_id: ID!) {
  deleteProduct(_id: $_id)
}
`;
