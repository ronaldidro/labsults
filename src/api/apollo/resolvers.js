import { GraphQLError } from 'graphql'
import { PubSub } from 'graphql-subscriptions'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'
import { Person, User } from '../models/index.js'
import { SECRET } from '../utils/config.js'

const pubsub = new PubSub()

const resolvers = {
  Query: {
    personCount: () => Person.count(),
    allPersons: (_root, args) => {
      if (!args.phone) return Person.findAll({})
      return Person.findAll({ where: { phone: args.phone === 'YES' ? { [Op.not]: null } : { [Op.is]: null } } })
    },
    findPerson: (_root, args) => Person.findOne({ where: { name: args.name } }),
    me: async (_root, _args, context) => {
      return context.currentUser
    }
  },
  Person: {
    address: root => {
      return { street: root.street, city: root.city }
    }
  },
  Mutation: {
    addPerson: async (_root, args, { currentUser }) => {
      let person

      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        })
      }

      person = await Person.findOne({ where: { name: args.name } })
      if (person) {
        throw new GraphQLError('Name must be unique', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name }
        })
      }

      person = Person.build({ ...args, userId: currentUser.id })

      try {
        await person.save()
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name, error }
        })
      }

      pubsub.publish('PERSON_ADDED', { personAdded: person })

      return person
    },
    editNumber: async (_root, args) => {
      const person = await Person.findOne({ where: { name: args.name } })
      if (!person) {
        throw new GraphQLError('User not found', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name }
        })
      }

      person.phone = args.phone

      try {
        await person.save()
      } catch (error) {
        throw new GraphQLError('Editing number failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name, error }
        })
      }
      return person
    },
    createUser: async (_root, args) => {
      const user = User.build({ username: args.username })

      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name, error }
        })
      }
    },
    login: async (_root, args) => {
      const user = await User.findOne({ where: { username: args.username } })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        username: user.username,
        id: user.id
      }

      return { value: jwt.sign(userForToken, SECRET) }
    }
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator('PERSON_ADDED')
    }
  }
}

export default resolvers
