import { assert } from "chai";
import { GraphQLClient } from "graphql-request";
import { getToken } from "./auth.spec";
const endpoint = "http://localhost:4000/graphql";
let clientWithHeader = null;
let UnauthorizedClient = null;

const client = new GraphQLClient(endpoint);
let _id = "";
describe("Role", () => {
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
   * List of role
   */
  it("cannot show role list if not authenticated", async () => {
    try {
      await client.request(listQuery);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot show role list if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(listQuery);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("show Role list", async () => {
    const response = await clientWithHeader.request(listQuery);
    assert.isObject(response.roles);
    assert.isObject(response.roles.meta);
    assert.isArray(response.roles.data);
  });

  /**
   * Create role
   */
  it("cannot create role if not authenticated", async () => {
    try {
      await client.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot create role if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("create a Role", async () => {
    const response = await clientWithHeader.request(createMutation, createVars);
    assert.isObject(response.addRole);
    assert.equal(response.addRole.name, createVars.name);
    _id = response.addRole._id;
  });
  it("create Role will failed with duplicate name", async () => {
    try {
      await clientWithHeader.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "name is already been taken");
    }
  });
  /**
   * Show role
   */
  it("cannot show role if not authenticated", async () => {
    try {
      await client.request(showQuery, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot show role if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(showQuery, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("show a Role", async () => {
    const response = await clientWithHeader.request(showQuery, { _id });
    assert.isObject(response.role);
    assert.equal(response.role.name, createVars.name);
  });

  /**
   * Update role
   */
  it("cannot update role if not authenticated", async () => {
    try {
      updateVars._id = _id;
      await client.request(updateMutation, updateVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot update role if unauthorized", async () => {
    try {
      updateVars._id = _id;
      await UnauthorizedClient.request(updateMutation, updateVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("update a Role", async () => {
    updateVars._id = _id;
    const response = await clientWithHeader.request(updateMutation, updateVars);
    assert.isObject(response.updateRole);
    assert.equal(response.updateRole.name, updateVars.name);
  });
  /**
   * Role Add Permission
   */
  it("role add permissions", async () => {
    let permissions = [];
    const permissionResponse = await clientWithHeader.request(
      permissionListQuery
    );
    permissionResponse.permissions.data.map(p => permissions.push(p._id));
    const vars = {
      _id,
      permissions
    };
    const response = await clientWithHeader.request(roleAddPermission, vars);
    assert.isObject(response);
    assert.equal(response.roleAddPermission, "Permission attached");
  });
  /**
   * Delete role
   */
  it("cannot delete role if not authenticated", async () => {
    try {
      await client.request(deleteMutation, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot delete role if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(deleteMutation, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("delete a Role", async () => {
    const response = await clientWithHeader.request(deleteMutation, { _id });
    assert.isObject(response);
    assert.equal(response.deleteRole, "Role successfuly deleted");
  });
});

const createVars = {
  name: "Author"
};

const updateVars = {
  name: "Author Edited"
};

const roleData = `
  _id
  name
  slug
  description
  createdAt
  updatedAt
`;
const listQuery = `
{
  roles {
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
    data { ${roleData} }
  }
}
`;

const permissionListQuery = `
{
  permissions {
    data {
      _id
    }
  }
}
`;

const showQuery = `
query role($_id: ID!) {
  role(_id: $_id) {
    ${roleData}
  }
}
`;

const createMutation = `
mutation addRole($name: String!, $description: String) {
  addRole(name: $name, description: $description) {
    ${roleData}
  }
}
`;

const updateMutation = `
mutation updateRole($_id: ID!, $name: String!, $description: String) {
  updateRole(_id: $_id, name: $name, description: $description) {
    ${roleData}
  }
}
`;

const deleteMutation = `
mutation deleteRole($_id: ID!) {
  deleteRole(_id: $_id)
}
`;

const roleAddPermission = `
mutation roleAddPermission($_id: ID!, $permissions: [ID!]!){
  roleAddPermission(_id: $_id, permissions: $permissions)
}
`;
