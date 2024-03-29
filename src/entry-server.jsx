import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import ReactDOMServer from 'react-dom/server'
import { QueryClient, QueryClientProvider } from 'react-query'
import { StaticRouter } from 'react-router-dom/server'
import { App } from './app/App'

const client = new ApolloClient({ cache: new InMemoryCache() })
const queryClient = new QueryClient()

export const render = (url, context) => {
  return ReactDOMServer.renderToString(
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url} context={context}>
          <App />
        </StaticRouter>
      </QueryClientProvider>
    </ApolloProvider>
  )
}
