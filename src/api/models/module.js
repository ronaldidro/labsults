import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db/index.js'

class Module extends Model {}

Module.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'module'
  }
)

export default Module
