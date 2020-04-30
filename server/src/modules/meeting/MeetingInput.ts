import { InputType, Field, Int } from "type-graphql";

@InputType()
export class MeetingInput {
  @Field(type => Date)
  date: Date

  @Field(type => Int, { description: 'minutes since midnight'})
  startMin: number

  @Field(type => Int, { description: 'minutes since midnight'})
  endMin: number
    
  @Field()
  title: string

  @Field()
  description: string

  @Field()
  location: string

  @Field(type => Int)
  capacity: number

  @Field()
  groupId: string
}