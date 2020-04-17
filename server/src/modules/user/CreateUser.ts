import { Resolver, Mutation, Arg, Authorized, Ctx } from "type-graphql";
import { User, UserRole } from "../../entities/User";
import bcrypt from "bcryptjs";

import { MyContext } from "../../ts/context";
import { SignUpInput } from "./SignUp";

@Resolver()
export class CreateUserResolver {
  @Mutation(() => User)
  @Authorized([UserRole['ADMIN']])
  async createUser(@Arg('input') {
    firstName,
    lastName,
    email,
    password,
    role
  }: SignUpInput, @Ctx() ctx: MyContext): Promise<User> {
    return new Promise(async (resolve: (data?: any) => void, reject: (err: Error) => void) => {
      // find user
      const user = await User.findOne({ where: { id: ctx.req.userId } }).catch(err => reject(err))
      if (!user)
        return reject(new Error('Please login, no account found'))

      // check to make sure email does not exist in organization
      const existingUser = await User.findOne({ where: { email } }).catch(err => reject(err))
      if (existingUser)
        return reject(new Error(`This email is already in use`))

      const hashedPassword = await bcrypt.hash(password, 12);
      
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      }).save();
  
      resolve(newUser)
    })
  }
}