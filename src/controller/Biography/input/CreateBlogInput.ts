import { Field, InputType } from "type-graphql";

@InputType()
export class CreateBlogInput {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  subDescription: string;
}

