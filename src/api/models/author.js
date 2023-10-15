import { DataTypes, Model, Op } from 'sequelize'
import { sequelize } from '../db/index.js'
import Note from './note.js'

class Author extends Model {
  async number_of_notes() {
    return (await this.getNotes()).length
  }

  static async with_notes(limit) {
    return await Author.findAll({
      attributes: {
        include: [[sequelize.fn('COUNT', sequelize.col('notes.id')), 'note_count']]
      },
      include: [{ model: Note, attributes: [] }],
      group: ['author.id'],
      having: sequelize.literal(`COUNT(notes.id) >= ${limit}`)
    })
  }
}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'author',
    defaultScope: { where: { disabled: false } },
    scopes: {
      admin: { where: { admin: true } },
      disabled: { where: { disabled: true } },
      name(value) {
        return { where: { name: { [Op.iLike]: value } } }
      }
    }
  }
)

export default Author
