import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { BiographyResolver } from "./Biography/resolver/biography/BiographyResolver";
import { BlogResolver } from "./Biography/resolver/blog/BlogResolver";

const buildClientSchema = async (): Promise<GraphQLSchema> =>
  await buildSchema({
    resolvers: [BiographyResolver, BlogResolver],
  });
export default buildClientSchema;
