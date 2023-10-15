import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db/index.js'

class UserRoles extends Model {}

UserRoles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'user', key: 'id' }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'role', key: 'id' }
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'user_roles'
  }
)

export default UserRoles
