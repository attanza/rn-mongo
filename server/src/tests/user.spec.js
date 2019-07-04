import { assert } from "chai";
import { GraphQLClient } from "graphql-request";
import { getToken } from "./auth.spec";
const endpoint = "http://localhost:4000/graphql";
let clientWithHeader = null;
let UnauthorizedClient = null;

const client = new GraphQLClient(endpoint);
let _id = "";
describe("User", () => {
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
   * List of User
   */
  it("cannot show User list if not authenticated", async () => {
    try {
      await client.request(listQuery);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot show User list if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(listQuery);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("show User list", async () => {
    const response = await clientWithHeader.request(listQuery);
    assert.isObject(response.users);
    assert.isObject(response.users.meta);
    assert.isArray(response.users.data);
  });

  /**
   * Create User
   */
  it("cannot create User if not authenticated", async () => {
    try {
      const roleResponse = await clientWithHeader.request(roleListQuery);
      createVars.role = roleResponse.roles.data[0]._id;
      updateVars.role = roleResponse.roles.data[0]._id;

      await client.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot create User if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("create a User", async () => {
    const response = await clientWithHeader.request(createMutation, createVars);
    assert.isObject(response.addUser);
    assert.equal(response.addUser.name, createVars.name);
    _id = response.addUser._id;
  });
  it("create User will failed with duplicate email", async () => {
    try {
      await clientWithHeader.request(createMutation, createVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "email is already been taken");
    }
  });
  /**
   * Show User
   */
  it("cannot show User if not authenticated", async () => {
    try {
      await client.request(showQuery, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot show User if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(showQuery, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("show a User", async () => {
    const response = await clientWithHeader.request(showQuery, { _id });
    assert.isObject(response.user);
    assert.equal(response.user.name, createVars.name);
  });

  /**
   * Update User
   */
  it("cannot update User if not authenticated", async () => {
    try {
      updateVars._id = _id;
      await client.request(updateMutation, updateVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot update User if unauthorized", async () => {
    try {
      updateVars._id = _id;
      await UnauthorizedClient.request(updateMutation, updateVars);
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("update a User", async () => {
    updateVars._id = _id;
    const response = await clientWithHeader.request(updateMutation, updateVars);
    assert.isObject(response.updateUser);
    assert.equal(response.updateUser.name, updateVars.name);
  });

  /**
   * Delete User
   */
  it("cannot delete User if not authenticated", async () => {
    try {
      await client.request(deleteMutation, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Unauthorized");
    }
  });
  it("cannot delete User if unauthorized", async () => {
    try {
      await UnauthorizedClient.request(deleteMutation, { _id });
    } catch (e) {
      assert.isArray(e.response.errors);
      assert.equal(e.response.errors[0].message, "Resource is forbidden");
    }
  });
  it("delete a User", async () => {
    const response = await clientWithHeader.request(deleteMutation, { _id });
    assert.isObject(response);
    assert.equal(response.deleteUser, "User successfuly deleted");
  });
});

const createVars = {
  name: "Test User",
  email: "test@test.com",
  password: "password"
};

const updateVars = {
  name: "Test User Edited",
  email: "test@test.com"
};

const userData = `
  _id
  name
  email
  createdAt
  updatedAt
`;
const listQuery = `
{
  users {
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
    data { ${userData} }
  }
}
`;

const roleListQuery = `
{
  roles {
    data{
      _id
    }
  }
}
`;

const showQuery = `
query user($_id: ID!) {
  user(_id: $_id) {
    ${userData}
  }
}
`;

const createMutation = `
mutation addUser($name: String!, $email: String!, $password: String!, $role: ID!) {
  addUser(name: $name, email: $email, password: $password, role: $role) {
    ${userData}
  }
}
`;

const updateMutation = `
mutation updateUser($_id: ID!, $name: String!, $email: String!, $role: ID!) {
  updateUser(_id: $_id, name: $name, email: $email, role: $role) {
    ${userData}
  }
}
`;

const deleteMutation = `
mutation deleteUser($_id: ID!) {
  deleteUser(_id: $_id)
}

`;
