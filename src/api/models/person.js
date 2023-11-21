import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db/index.js'

class Person extends Model {}

Person.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [5] }
    },
    phone: {
      type: DataTypes.STRING,
      validate: { len: [5] }
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5] }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5] }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'person',
    tableName: 'persons'
  }
)

export default Person
