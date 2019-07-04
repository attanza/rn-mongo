import changeCase from "change-case";
import { Permission, Role, User } from "../models";
export default async () => {
  await Permission.deleteMany({});
  await Role.deleteMany({});
  await User.deleteMany({});

  const roles = ["Super Administrator", "Administrator", "User"];
  for (let i = 0; i < roles.length; i++) {
    let role = await Role.create({
      name: roles[i]
    });
    await seedPermissions();
    await User.create({
      name: roles[i],
      email: changeCase.snakeCase(roles[i]) + "@system.com",
      password: "password",
      role: role._id
    });

    const permissions = await Permission.find({});
    const firstRole = await Role.findOne({ slug: "super-administrator" });
    permissions.map(permission => {
      firstRole.permissions.push(permission._id);
    });
    await firstRole.save();
  }
};

const seedPermissions = async () => {
  const resources = [
    "User",
    "Role",
    "Permission",
    "Shop Category",
    "Shop",
    "Product Category",
    "Product"
  ];
  const actions = ["Read", "Create", "Update", "Delete"];
  for (let i = 0; i < resources.length; i++) {
    for (let j = 0; j < actions.length; j++) {
      await Permission.create({
        name: `${actions[j]} ${resources[i]}`
      });
    }
  }
};
