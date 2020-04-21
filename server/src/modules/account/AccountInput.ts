import { InputType, Field, ID, Int } from "type-graphql"
import { Length, IsEmail } from "class-validator"

@InputType()
export class CreateAccountInput {
  @Field()
  @Length(1, 255)
  firstName: string

  @Field()
  @Length(1, 255)
  lastName: string

  @Field()
  @IsEmail()
  email: string

  @Field({ nullable: true })
  phone?: string

  @Field()
  @Length(1, 255)
  password: string
}

@InputType()
export class StudentInput extends CreateAccountInput {
  @Field(type => [String], { nullable: true })
  parentsEmail?: string[]

  @Field(type => Int)
  gradeLevel: number
}

@InputType()
export class ParentInput extends CreateAccountInput {
  @Field(type => [String], { nullable: true })
  studentsEmail?: string[]
}