import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db/index.js'

class Note extends Model {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    important: {
      type: DataTypes.BOOLEAN
    },
    date: {
      type: DataTypes.DATE
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'authors', key: 'id' }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'note'
  }
)

export default Note
