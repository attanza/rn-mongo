import { assert } from "chai";
import { GraphQLClient } from "graphql-request";
import { getToken } from "./auth.spec";
const endpoint = "http://localhost:4000/graphql";
let clientWithHeader = null;
let UnauthorizedClient = null;

const client = new GraphQLClient(endpoint);
let _id = "";
describe("Permission", () => {
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
   * List of Permission
   */
  it("cannot show Permission list if not authenticated", async () => {
    try {
      await client.request(listQuery);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot show Permission list if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(listQuery);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("show Permission list", async () => {
    const response = await clientWithHeader.request(listQuery);
    assert.isObject(response.permissions);
    assert.isObject(response.permissions.meta);
    assert.isArray(response.permissions.data);
  });

  /**
   * Create Permission
   */
  it("cannot create Permission if not authenticated", async () => {
    try {
      await client.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot create Permission if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("create a Permission", async () => {
    const response = await clientWithHeader.request(createMutation, createVars);
    assert.isObject(response.addPermission);
    assert.equal(response.addPermission.name, createVars.name);
    _id = response.addPermission._id;
  });
  it("create Permission will failed with duplicate name", async () => {
    try {
      await clientWithHeader.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "name is already been taken");
    }
  });
  /**
   * Show Permission
   */
  it("cannot show Permission if not authenticated", async () => {
    try {
      await client.request(showQuery, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot show Permission if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(showQuery, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("show a Permission", async () => {
    const response = await clientWithHeader.request(showQuery, { _id });
    assert.isObject(response.permission);
    assert.equal(response.permission.name, createVars.name);
  });

  /**
   * Update Permission
   */
  it("cannot update Permission if not authenticated", async () => {
    try {
      updateVars._id = _id;
      await client.request(updateMutation, updateVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot update Permission if unauthorized", async () => {
    try {
      updateVars._id = _id;
      await UnauthorizedClient.request(updateMutation, updateVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("update a Permission", async () => {
    updateVars._id = _id;
    const response = await clientWithHeader.request(updateMutation, updateVars);
    assert.isObject(response.updatePermission);
    assert.equal(response.updatePermission.name, updateVars.name);
  });

  /**
   * Delete Permission
   */
  it("cannot delete Permission if not authenticated", async () => {
    try {
      await client.request(deleteMutation, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot delete Permission if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(deleteMutation, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("delete a Permission", async () => {
    const response = await clientWithHeader.request(deleteMutation, { _id });
    assert.isObject(response);
    assert.equal(response.deletePermission, "Permission successfuly deleted");
  });
});

const createVars = {
  name: "Clear Redis"
};

const updateVars = {
  name: "Clear Redis Edited"
};

const permissionData = `
  _id
  name
  slug
  description
  createdAt
  updatedAt
`;
const listQuery = `
{
  permissions {
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
    data { ${permissionData} }
  }
}
`;

const showQuery = `
query permission($_id: ID!) {
  permission(_id: $_id) {
    ${permissionData}
  }
}
`;

const createMutation = `
mutation addPermission($name: String!, $description: String) {
  addPermission(name: $name, description: $description) {
    ${permissionData}
  }
}
`;

const updateMutation = `
mutation updatePermission($_id: ID!, $name: String!, $description: String) {
  updatePermission(_id: $_id, name: $name, description: $description) {
    ${permissionData}
  }
}
`;

const deleteMutation = `
mutation deletePermission($_id: ID!) {
  deletePermission(_id: $_id)
}
`;
