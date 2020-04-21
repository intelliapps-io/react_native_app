import { InputType, Field, Int } from "type-graphql";

@InputType()
export class GroupInput {
  @Field()
  name: string

  @Field()
  description: string

  @Field(type => Int)
  minMenteeGradeLevel: number

  @Field(type => Int)
  minMentorGradeLevel: number
}