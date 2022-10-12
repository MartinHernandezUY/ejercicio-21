module.exports = (sequelize, Model, DataTypes) => {
  class Role extends Model {}

  Role.init(
    {
      class: {
        type: DataTypes.TEXT,
      },
      clearance: {
        type: DataTypes.TINYINT,
      },
    },
    {
      sequelize,
      modelName: "role",
    },
  );

  return Role;
};
