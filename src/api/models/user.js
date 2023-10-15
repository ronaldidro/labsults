import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db/index.js'

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    document_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [8, 8]
      }
    },
    first_names: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true
      }
    },
    last_names: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true
      }
    },
    cellphone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        notEmpty: true,
        len: [9, 9]
      }
    },
    born_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        notEmpty: true
      }
    },
    genre: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['male', 'female']]
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'user'
  }
)

export default User
