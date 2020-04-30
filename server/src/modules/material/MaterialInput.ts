import { Field, ID, InputType } from "type-graphql"
import { BaseEntity } from "typeorm"

@InputType()
export class MaterialInput {
  @Field(() => ID)
  id: string
    
  @Field()
  title: string
      
  @Field({ nullable: true })
  author: string

  @Field()
  type: string

  @Field()
  url: string

  @Field(type => Date)
  dueDate: Date

  @Field()
  notes: string
}