import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const GQL_PORT = import.meta.env.VITE_GQL_PORT

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  return { headers: { ...headers, authorization: token ? `Bearer ${token}` : null } }
})

const httpLink = createHttpLink({ uri: `http://localhost:${GQL_PORT}` })

const wsLink = new GraphQLWsLink(createClient({ url: `ws://localhost:${GQL_PORT}` }))

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})
