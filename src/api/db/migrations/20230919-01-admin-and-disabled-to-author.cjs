const { Sequelize } = require('sequelize')

const up = async queryInterface => {
  await queryInterface.addColumn('authors', 'admin', {
    type: Sequelize.BOOLEAN,
    default: false
  })

  await queryInterface.addColumn('authors', 'disabled', {
    type: Sequelize.BOOLEAN,
    default: false
  })
}

const down = async queryInterface => {
  await queryInterface.removeColumn('authors', 'admin')
  await queryInterface.removeColumn('authors', 'disabled')
}

module.exports = { up, down }
