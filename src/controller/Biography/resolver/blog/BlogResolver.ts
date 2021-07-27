import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  Query,
} from "type-graphql";
import { Blog } from "../../../../entity/Blog";

import { CreateBlogInput } from "../../input/CreateBlogInput";

@ObjectType()
class BlogResponse {
  @Field({ nullable: true })
  _id?: string;
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  subDescription?: string;
  @Field({ nullable: true })
  createdAt?: Date;
  @Field({ nullable: true })
  originalError?: string;
  @Field({ nullable: true })
  success?: boolean;
}

@ObjectType()
class BlogsListType {
  @Field(() => [BlogResponse], { nullable: true })
  blogs: BlogResponse;
  @Field({ nullable: true })
  originalError?: string;
  @Field({ nullable: true })
  success?: boolean;
}

@Resolver()
export class BlogResolver {
  @Mutation(() => Blog)
  async Blog(@Arg("data") data: CreateBlogInput): Promise<BlogResponse> {
    try {
      const { title, subDescription, description } = data;
      const blog = await Blog.create({
        title,
        description,
        subDescription,
      }).save();
      return {
        _id: blog._id,
        title: title,
        subDescription: subDescription,
        description: description,
        createdAt: blog.createdAt,
        success: true,
      };
    } catch (error) {
      return {
        originalError: JSON.stringify(error),
        success: false,
      };
    }
  }
  @Query(() => BlogsListType)
  async blogs(): Promise<BlogsListType> {
    try {
      const allBlog: any = await Blog.find();
      return {
        blogs: allBlog,
        success: true,
      };
    } catch (error) {
      return {
        blogs: null,
        originalError: JSON.stringify(error),
        success: false,
      };
    }
  }
}

// mutation BlogMutation($title: String!="abcdefg" $description: String!="description" $subDescription:String!="subDescription") {
//   Blog(data:{title:$title description: $description subDescription: $subDescription}) {
//     id
//     title
//     description
//     subDescription
//   }
// }
