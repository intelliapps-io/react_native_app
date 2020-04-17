import { InputType, Field } from "type-graphql"
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
  
}