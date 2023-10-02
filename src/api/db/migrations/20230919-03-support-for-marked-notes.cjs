const { Sequelize } = require("sequelize");

const up = async (queryInterface) => {
  await queryInterface.createTable("author_notes", {
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
    note_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "notes", key: "id" },
    },
  });
};

const down = async (queryInterface) => {
  await queryInterface.dropTable("author_notes");
};

module.exports = { up, down };
