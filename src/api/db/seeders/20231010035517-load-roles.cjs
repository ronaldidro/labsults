const up = async queryInterface => {
  await queryInterface.bulkInsert('roles', [
    {
      name: 'Administrador',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Colaborador',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Paciente',
      created_at: new Date(),
      updated_at: new Date()
    }
  ])
}

const down = async queryInterface => {
  await queryInterface.bulkDelete('roles', null, {})
}

module.exports = { up, down }
