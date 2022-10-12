const { faker } = require("@faker-js/faker");
const { User } = require("../models");
faker.locale = "es";

module.exports = async () => {
  const users = [];
  users.push({
    firstname: "admin",
    lastname: `prueba`,
    email: `admin@prueba`,
    password: "1234",
    roleId: 4,
  });
  users.push({
    firstname: "editor",
    lastname: `prueba`,
    email: `editor@prueba`,
    password: "1234",
    roleId: 3,
  });

  users.push({
    firstname: "autor",
    lastname: `prueba`,
    email: `autor@prueba`,
    password: "1234",
    roleId: 2,
  });

  users.push({
    firstname: "lector",
    lastname: `prueba`,
    email: `lector@prueba`,
    password: "1234",
    roleId: 1,
  });

  for (let i = 0; i < 15; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: "1234",
      roleId: 1,
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
