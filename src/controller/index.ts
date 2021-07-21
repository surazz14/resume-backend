import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { BiographyResolver } from "./Biography/resolver/auth/BiographyResolver";
const buildClientSchema = async (): Promise<GraphQLSchema>  =>
  await buildSchema({
    resolvers: [BiographyResolver],
  });
export default buildClientSchema;
