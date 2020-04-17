// libraries
require('dotenv').config();
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";

// helpers
import { connectDB } from "./helpers/typeorm"
import { resolvers } from "./modules/resolvers";
import { authMiddleware, authChecker } from "./helpers/auth";
import { runCodegen, nodeLogger } from "./helpers/helpers";

const main = async () => {
  const httpPort = process.env.NODE_ENV === 'development' ? process.env.DEV_SERVER_PORT : process.env.PROD_PORT;

  // connect to MySQL DB
  const connection = await connectDB()

  // Generate TypeGraphQL Schema 
  const schema = await buildSchema({
    resolvers,
    authChecker,
    emitSchemaFile: {
      path: `./${process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production_dev' ? 'src' : 'dist'}/graphql/generated-schema.graphql`
    }
  });

  // Create GraphQL Server
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res })
  });

  // Create Express Web Server
  const app = Express();

  // Read authentication cookies from requests
  app.use(cookieParser())

  // CORS
  var corsOptions: CorsOptions = {
    credentials: true,
    origin: true
  }
  app.use(cors(corsOptions));

  // Configure JWT-Authentication
  app.use(authMiddleware);

  // Integrate GraphQL Server with Express
  apolloServer.applyMiddleware({ app, cors: corsOptions });

  ////////////////////
  //   Start App    //
  ////////////////////
  app.listen(httpPort, () => console.log(`> GraphQL: http://localhost:${httpPort}/graphql `));

  // Generate Client Code
  await runCodegen().catch(err => nodeLogger(err));
}

main()
  .then(() => console.log('process finished'))
  .catch(err => console.log(err))