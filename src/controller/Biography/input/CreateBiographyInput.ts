import { isPhoneNumber } from "class-validator";
import { Field, InputType } from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";

@InputType()
export class PersonalInfoInputType {
  @Field()
  header?: string;
  @Field()
  name?: string;
  @Field()
  phoneNumber?: string;
  @Field()
  email?: string;
  @Field()
  linkedin?: string;
  @Field()
  github?: string;
  @Field()
  location?: string;
  @Field()
  description?: string;
  @Field()
  subDescription?: string;
}

@InputType()
export class MainSkillsInputType {
  @Field()
  header1?: string;
  @Field()
  header2?: string;
  @Field(() => [String], { nullable: true })
  skills?: [string];
  @Field(() => [String], { nullable: true })
  values?: [string];
}

@InputType()
export class CreateBiographyInput {
  @Field()
  title: string;
  @Field(() => PersonalInfoInputType, { nullable: true })
  personalInfo: PersonalInfoInputType;
  @Field(() => MainSkillsInputType, { nullable: true })
  mainSkills: MainSkillsInputType;
  @Field()
  description: string;
  @Field()
  subDescription: string;
  @Field(() => GraphQLUpload, { nullable: true })
  image1: FileUpload;
  @Field(() => GraphQLUpload, { nullable: true })
  image2: FileUpload;
}

