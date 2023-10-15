const { Sequelize } = require('sequelize')

const up = async queryInterface => {
  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    document_number: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    first_names: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_names: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cellphone: {
      type: Sequelize.STRING
    },
    born_date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    genre: {
      type: Sequelize.ENUM('male', 'female'),
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
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

  await queryInterface.createTable('roles', {
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

  await queryInterface.createTable('user_roles', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'roles', key: 'id' }
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
  await queryInterface.dropTable('user_roles')
  await queryInterface.dropTable('roles')
  await queryInterface.dropTable('users')
}

module.exports = { up, down }
