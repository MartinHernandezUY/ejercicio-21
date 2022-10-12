const bcrpyt = require("bcryptjs");

module.exports = (sequelize, Model, DataTypes) => {
  class User extends Model {
    async passwordCheck(password) {
      return await bcrpyt.compare(password, this.password);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },

      email: {
        type: DataTypes.STRING,
      },

      password: {
        type: DataTypes.STRING,
      },
    },

    {
      // hooks: {
      //   beforeCreate: async (user, options) => {
      //     const passwordHasheada = await bcrpyt.hash(user.password, 10);
      //     user.password = passwordHasheada;
      //   },
      // },
      sequelize,
      modelName: "user",
    },
  );

  User.beforeCreate(async (user, options) => {
    const passwordhasheada = await bcrpyt.hash(user.password, 10);

    user.password = passwordhasheada;
  });

  User.beforeBulkCreate(async (users, options) => {
    for (const user of users) {
      const passwordHasheada = await bcrpyt.hash(user.password, 10);
      user.password = passwordHasheada;
    }
  });
  return User;
};
