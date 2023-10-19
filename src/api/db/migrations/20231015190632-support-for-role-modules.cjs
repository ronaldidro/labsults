const { Sequelize } = require('sequelize')

const up = async queryInterface => {
  await queryInterface.createTable('modules', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    }
  })

  await queryInterface.createTable('role_modules', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'roles', key: 'id' }
    },
    module_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'modules', key: 'id' }
    },
    actions: {
      type: Sequelize.JSON,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    }
  })
}

const down = async queryInterface => {
  await queryInterface.dropTable('role_modules')
  await queryInterface.dropTable('modules')
}

module.exports = { up, down }
