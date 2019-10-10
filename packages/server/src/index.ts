import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { env } from './config/config'
import GitHubModule from './datasources/github/GitHubModule'
import { formatError } from './Error/ErrorHandler'

const { context, selfCache, schema } = GitHubModule

const server = new ApolloServer({
  modules: [GitHubModule],
  // schema,
  context,
  cache: selfCache,
  introspection: env.apollo.introspection,
  playground: env.apollo.playground,
  debug: env.apollo.debug,
  formatError,
})

server.listen({ port: env.port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => server.stop())
}
