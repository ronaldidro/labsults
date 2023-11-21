import { ApolloProvider } from '@apollo/client'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app/App'
import { client } from './app/apollo/config'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 0 } }
})

ReactDOM.hydrateRoot(
  document.getElementById('app'),
  <ApolloProvider client={client}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </ApolloProvider>
)

console.log('hydrated')
