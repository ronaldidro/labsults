const { Sequelize } = require('sequelize')

const up = async queryInterface => {
  await queryInterface.createTable('notes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    important: {
      type: Sequelize.BOOLEAN
    },
    date: {
      type: Sequelize.DATE
    }
  })

  await queryInterface.createTable('authors', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  await queryInterface.addColumn('notes', 'author_id', {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'authors', key: 'id' }
  })
}

const down = async queryInterface => {
  await queryInterface.dropTable('notes')
  await queryInterface.dropTable('authors')
}

module.exports = { up, down }
