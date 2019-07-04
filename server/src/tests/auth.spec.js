import { assert } from "chai";
import { GraphQLClient } from "graphql-request";
const endpoint = "http://localhost:4000/graphql";
const client = new GraphQLClient(endpoint, { headers: {} });
const doLogin = async (vars = loginVars) => {
  try {
    return await client.request(loginMutation, vars);
  } catch (e) {
    throw e;
  }
};

export const getToken = async (vars = loginVars) => {
  const resp = await doLogin(vars);
  return resp.login.token;
};

describe("Auth", () => {
  it("login", async () => {
    const response = await doLogin();
    assert.isObject(response.login);
    assert.isString(response.login.token);
  });
});

const loginVars = {
  email: "super_administrator@system.com",
  password: "password"
};
const loginMutation = `
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    }
}
`;
