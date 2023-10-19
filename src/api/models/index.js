import Author from './author.js'
import AuthorNotes from './author_notes.js'
import Membership from './membership.js'
import Module from './module.js'
import Note from './note.js'
import Role from './role.js'
import RoleModules from './role_modules.js'
import Team from './team.js'
import User from './user.js'
import UserRoles from './user_roles.js'

Author.hasMany(Note)
Note.belongsTo(Author)

Author.belongsToMany(Team, { through: Membership })
Team.belongsToMany(Author, { through: Membership })

Author.belongsToMany(Note, { through: AuthorNotes, as: 'marked_notes' })
Note.belongsToMany(Author, { through: AuthorNotes, as: 'authors_marked' })

User.belongsToMany(Role, { through: UserRoles })
Role.belongsToMany(User, { through: UserRoles })

Role.belongsToMany(Module, { through: RoleModules })
Module.belongsToMany(Role, { through: RoleModules })

export { Author, AuthorNotes, Membership, Module, Note, Role, Team, User }
