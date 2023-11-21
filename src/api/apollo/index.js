import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { info } from 'console'
import cors from 'cors'
import express from 'express'
import { useServer } from 'graphql-ws/lib/use/ws'
import { createServer } from 'http'
import jwt from 'jsonwebtoken'
import { WebSocketServer } from 'ws'
import User from '../models/user.js'
import { GQL_PORT, SECRET } from '../utils/config.js'
import resolvers from './resolvers.js'
import typeDefs from './schema.js'

export const start = async () => {
  const gql = express()
  const httpServer = createServer(gql)
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const wsServer = new WebSocketServer({ server: httpServer, path: '/' })
  const serverCleanup = useServer({ schema }, wsServer) // eslint-disable-line

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })

  await server.start()

  gql.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null

        if (auth && auth.toLowerCase().startsWith('bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), SECRET)
          const currentUser = await User.findByPk(decodedToken.id)
          return { currentUser }
        }
      }
    })
  )

  httpServer.listen(GQL_PORT, () => info(`Server is now running on http://localhost:${GQL_PORT}`))
}
