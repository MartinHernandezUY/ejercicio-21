const { Role } = require("../models");

module.exports = async () => {
  const roles = [];
  roles.push({
    class: "reader",
    clearance: 10,
  });

  roles.push({
    class: "writer",
    clearance: 20,
  });

  roles.push({
    class: "editor",
    clearance: 30,
  });

  roles.push({
    class: "admin",
    clearance: 40,
  });

  await Role.bulkCreate(roles);
  console.log("[Database] Se corrió el seeder de Roles.");
};
