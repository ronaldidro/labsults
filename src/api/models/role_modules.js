import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db/index.js'

class RoleModules extends Model {}

RoleModules.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'role', key: 'id' }
    },
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'module', key: 'id' }
    },
    actions: {
      type: DataTypes.JSON,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'role_modules'
  }
)

export default RoleModules
