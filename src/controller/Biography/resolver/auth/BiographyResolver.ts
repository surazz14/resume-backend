import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  Query,
} from "type-graphql";

import {
  CreateBiographyInput,
  PersonalInfoInputType,
  MainSkillsInputType,
} from "../../input/CreateBiographyInput";
import { Biography,MainSkills,PersonInfo } from "../../../../entity";

@ObjectType()
class MainSkillsResponse {
  @Field({ nullable: true })
  header1?: string;
  @Field({ nullable: true })
  header2?: string;
  @Field(() => [String], { nullable: true })
  skills?: [String];
  @Field(() => [String], { nullable: true })
  values?: [string];
}

@ObjectType()
class PersonalInfoResponse {
  @Field({ nullable: true })
  header?: string;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  phoneNumber?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  linkedin?: string;
  @Field({ nullable: true })
  github?: string;
  @Field({ nullable: true })
  location?: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  subDescription?: string;
}

@ObjectType()
class BiographyResponse {
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  subDescription?: string;
  @Field(() => MainSkillsResponse, { nullable: true })
  mainSkills?: MainSkillsResponse;
  @Field(() => PersonalInfoResponse, { nullable: true })
  personalInfo?: PersonalInfoResponse;
  @Field({ nullable: true })
  success: boolean;
  @Field({ nullable: true })
  originalError?: string;
}

@ObjectType()
class BiographyListResponse {
  @Field(() => [BiographyResponse], { nullable: true })
  biographies: BiographyResponse;
  @Field()
  success: true;
  @Field({ nullable: true })
  originalError?: string;
}

@Resolver()
export class BiographyResolver {
  @Mutation(() => BiographyResponse)
  async register(
    @Arg("data") data: CreateBiographyInput
  ): Promise<BiographyResponse> {
    try {
      const { title, description, subDescription, mainSkills, personalInfo } =
        data;

      const mainSkillData = MainSkills.create({...mainSkills});
      await mainSkillData.save()
      const personalInfoData = PersonInfo.create({...personalInfo});
      await personalInfoData.save()
      const biography = Biography.create({
        title,
        description,
        subDescription,
        personalInfo: personalInfoData,
        mainSkills: mainSkillData
      })
      await biography.save();

      return {
        title: title,
        description: description,
        subDescription: subDescription,
        mainSkills: mainSkills,
        personalInfo: personalInfo,
        success: true,
      };
    } catch (error) {
      console.log("error", error);
      return {
        originalError: JSON.stringify(error),
        success: false,
      };
    }
  }

  @Query(() => BiographyListResponse)
  async biograohies(): Promise<BiographyListResponse> {
    const biographies: any = await Biography.find();
    return {
      biographies,
      success: true,
    };
  }
}

// mutation RegisterMutation($title: String!="suraj"
// $image1: String! ="dhakal" $image2: String! = "aa"
// $description:String!="ss" $subDescription:String! = "abc") {
//   register(data: {title: $title image1:$image1 image2: $image2 description: $description subDescription: $subDescription}) {
//     title
//     description
//     subDescription
//     image1
//     image2
//     success
//     originalError
//   }
// }

// mutation RegisterMutation($firstName: String!="suraj"
// $lastName: String! ="dhakal") {
//   register(data: {firstName: $firstName lastName:$lastName}) {
//     message
//     success
//     originalError
//   }
// }


// mutation RegisterMutation($title: String!="suraj"
// $description:String!="ss" $subDescription:String! = "abc" $mainSkills:MainSkillsInputType={header1: "abc",header2:"abcde",
// skills:["hello","hy"] values:["test","test1"]}) {
//   register(data: {title: $title description: $description subDescription: $subDescription mainSkills: $mainSkills}) {
//     title
//     description
//     subDescription
//     success
//     originalError
//     mainSkills {
//       header1
//       header2
//       skills
//       values
//     }
//   }
// }



// mutation RegisterMutation($title: String!="suraj"
// $description:String!="ss" $subDescription:String! = "abc" $mainSkills:MainSkillsInputType={header1: "abc",header2:"abcde",
// skills:["hello","hy"] values:["test","test1"]} $personalInfo:PersonalInfoInputType = {
//   header: "abc",
//   name: "abc",
//   phoneNumber: "aaaa",
//   email: "surajdhakal427@gmail.com",
//   linkedin: "avx",
//   github: "aa",
//   location: "aa",
//   description: "aa",
//   subDescription: "aa"

// }
// ) {
//   register(data: {title: $title description: $description subDescription: $subDescription mainSkills: $mainSkills personalInfo:$personalInfo}) {
//     title
//     description
//     subDescription
//     success
//     originalError
//     mainSkills {
//       header1
//       header2
//       skills
//       values
//     }
//   }
// }