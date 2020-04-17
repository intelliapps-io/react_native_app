import { Resolver, Mutation, InputType, Field, Arg } from "type-graphql"
import { User, UserRole } from "../../entities/User"
import { Length, IsEmail } from "class-validator"
import bcrypt from "bcryptjs"

@InputType()
export class SignUpInput {
  @Field()
  @Length(1, 255)
  firstName: string

  @Field()
  @Length(1, 255)
  lastName: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @Length(1, 255)
  password: string

  @Field(type => UserRole)
  role: UserRole
}

@Resolver()
export class SignUpResolver {
  @Mutation(() => String)
  signUp(@Arg('input') input: SignUpInput) {
    return new Promise(async (resolve: (email: string) => void, reject: (err: Error) => void) => {

      // prevent creating an admin account on signup
      if (input.role === UserRole['ADMIN'])
        return reject(new Error('You cannot sign up as an admin account'))

      // check to make sure email does not exist in another account
      const existingUser = await User.findOne({ where: { email: input.email } }).catch(err => reject(err))
      if (existingUser)
        return reject(new Error(`This email is already in use`))

      // hash password
      const hashedPassword = await bcrypt.hash(input.password, 12)

      // create user account
      User.create({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: hashedPassword,
        role: input.role
      }).save()
        .then((_user) => resolve(_user.email))
        .catch(err => reject(err))
    })
  }
}