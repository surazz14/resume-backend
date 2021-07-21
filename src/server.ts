import * as express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import buildClientSchema from "./controller/index";
import { Connection } from "typeorm";
const PORT = process.env.PORT || 5000;

async function startServer(db: Connection) {
  const server = new ApolloServer({
    schema: await buildClientSchema(),
  });
  
  await server.start();

  const app = express();
  server.applyMiddleware({ app });
  console.log(process.env,"these are env")

  app.listen(PORT, () => console.log(`App is running at port ${PORT}`));
}

export default startServer;
