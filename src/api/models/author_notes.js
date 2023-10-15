import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db/index.js'

class AuthorNotes extends Model {}

AuthorNotes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'author', key: 'id' }
    },
    noteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'notes', key: 'id' }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'author_notes'
  }
)

export default AuthorNotes
