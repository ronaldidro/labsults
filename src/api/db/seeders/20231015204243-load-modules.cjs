const up = async queryInterface => {
  await queryInterface.bulkInsert('modules', [
    {
      name: 'Perfil',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Usuarios',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Órdenes',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Exámenes',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Configuración',
      created_at: new Date(),
      updated_at: new Date()
    }
  ])
}

const down = async queryInterface => {
  await queryInterface.bulkDelete('modules', null, {})
}

module.exports = { up, down }
