import Author from "./author.js";
import AuthorNotes from "./author_notes.js";
import Membership from "./membership.js";
import Note from "./note.js";
import Team from "./team.js";

Author.hasMany(Note);
Note.belongsTo(Author);

Author.belongsToMany(Team, { through: Membership });
Team.belongsToMany(Author, { through: Membership });

Author.belongsToMany(Note, { through: AuthorNotes, as: "marked_notes" });
Note.belongsToMany(Author, { through: AuthorNotes, as: "authors_marked" });

export { Author, AuthorNotes, Membership, Note, Team };
