const { Sequelize } = require("sequelize");

const up = async (queryInterface) => {
  await queryInterface.createTable("teams", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    },
  });

  await queryInterface.createTable("memberships", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "authors", key: "id" },
    },
    team_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "teams", key: "id" },
    },
  });
};

const down = async (queryInterface) => {
  await queryInterface.dropTable("memberships");
  await queryInterface.dropTable("teams");
};

module.exports = { up, down };
