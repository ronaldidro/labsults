const up = async queryInterface => {
  const roleActions = { create: true, read: true, update: true, delete: true }
  const roleId = await queryInterface.rawSelect('roles', { where: { name: 'Administrador' } }, ['id'])
  const modules = await queryInterface.sequelize.query('SELECT id FROM modules', {
    type: queryInterface.sequelize.QueryTypes.SELECT
  })

  for (const module of modules) {
    await queryInterface.bulkInsert('role_modules', [
      {
        role_id: roleId,
        module_id: module.id,
        actions: JSON.stringify(roleActions),
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  }
}

const down = async queryInterface => {
  const role_id = await queryInterface.rawSelect('roles', { where: { name: 'Administrador' } }, ['id'])
  await queryInterface.bulkDelete('role_modules', { role_id }, {})
}

module.exports = { up, down }
