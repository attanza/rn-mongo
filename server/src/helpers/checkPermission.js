import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import includes from "lodash/includes";

export default (user, permission = "") => {
  if (!user) {
    throw new AuthenticationError("Unauthorized");
  }

  if (permission === "") return true;

  const permissions = user.role.permissions;
  if (!permissions || permissions.length < 1) {
    throw new ForbiddenError("Resource is forbidden");
  }
  const permissionSlug = permissions.map(p => {
    return p.slug;
  });
  const isInclude = includes(permissionSlug, permission);

  if (!isInclude) {
    throw new ForbiddenError("Resource is forbidden");
  }

  return true;
};
