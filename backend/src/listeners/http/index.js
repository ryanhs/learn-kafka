import { GraphQLServer } from 'graphql-yoga'
import helmet from 'helmet';
import nocache from 'nocache';
import cors from 'cors';

import log from 'utils/Log';

// graphql
import GraphQLTypeDefs from './graphql/schema';
import GraphQLQueries from './graphql/queries';
import GraphQLMutations from './graphql/mutations';

import ExpressRoutes from './routes'

// some options
const corsOptions = { origin: true, credentials: false };
const yogaOptions = {
  port: process.env.PORT || process.env.APP_PORT || 13001,
  endpoint: '/graphql',
  getEndpoint: true,
  subscriptions: process.env['APP_GRAPHQL_SUBSCRIPTION'] === 'true' ? '/graphql/subscriptions' : false,
  playground: process.env.NODE_ENV === 'development' ? '/graphql/playground' : false,
  debug: process.env.NODE_ENV === 'development',
};

const listen = () => {
  // yoga setup for GraphQLServer
  var yoga = new GraphQLServer({
    typeDefs: GraphQLTypeDefs,
    resolvers: {
      Query: GraphQLQueries,
      Mutation: GraphQLMutations,
    },
    cors: corsOptions,
    context: req => ({ ...req }),
    middlewares: []
  });

  // global express setup
  yoga.express.use(helmet());
  yoga.express.use(nocache());
  yoga.express.options('*', cors(corsOptions));

  // express routes
  ExpressRoutes(yoga.express);

  // start/listen
  yoga.start(yogaOptions, ({ port }) => log.info(`🚀 App server ready.`, yogaOptions))
}

export default { listen };
