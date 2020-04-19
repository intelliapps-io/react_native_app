import { InputType, Field, ID, Int } from "type-graphql"
import { Length, IsEmail } from "class-validator"
import { AccountType } from "../../entities/Account"

@InputType()
export class CreateAccountInput {
  @Field()
  @Length(1, 255)
  firstName: string

  @Field()
  @Length(1, 255)
  lastName: string

  @Field(type => AccountType)
  accountType: AccountType

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
class StudentInput extends CreateAccountInput {
  @Field(type => [String], { nullable: true })
  parentsEmail?: string[]

  @Field(type => Int)
  gradeLevel: number
}

@InputType()
class ParentInput extends CreateAccountInput {
  @Field(type => [String], { nullable: true })
  studentsEmail?: string[]
}