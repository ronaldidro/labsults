const up = async queryInterface => {
  await queryInterface.bulkInsert('authors', [
    {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      admin: true,
      disabled: false
    }
  ])
}

const down = async queryInterface => {
  await queryInterface.bulkDelete('authors', null, {})
}

module.exports = { up, down }
