import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { Student } from "../../entities/Student";
import { StudentInput, ParentInput } from "./AccountInput"
import { Account, AccountType } from "../../entities/Account";
import { Parent } from "../../entities/Parent";
import bcrypt from "bcryptjs";
import { createTokens } from "../../helpers/auth";
import { MyContext } from "../../ts/context";

@Resolver()
export class CreateAccountResolver {
  @Mutation(type => Account)
  createStudentAccount(@Arg('input') input: StudentInput, @Ctx() ctx: MyContext) {
    return new Promise(async (resolve, reject) => {
      // find existing email
      const existingAccount = await Account.findOne({ where: { email: input.email } }).catch(err => reject(err))
      if (existingAccount)
        return reject(new Error('Email is already in use'))

      // hash password
      const hashedPassword = await bcrypt.hash(input.password, 12);

      const {
        email,
        firstName,
        gradeLevel,
        lastName,
        phone
      } = input

      // create user account
      Student.create({
        email,
        firstName,
        gradeLevel,
        lastName,
        password: hashedPassword,
        phone
      }).save()
        .then(account => {

          // login user via authtoken
          const tokens = createTokens(account);
          ctx.res.cookie("refresh-token", tokens.refreshToken)
          ctx.res.cookie("access-token", tokens.accessToken)

           // temp set account type
           account.accountType = AccountType['student']

          // send account
          resolve(account)
        })
        .catch(err => reject(err))
    })
  }

  @Mutation(type => Account)
  createParentAccount(@Arg('input') input: ParentInput, @Ctx() ctx: MyContext) {
    return new Promise(async (resolve, reject) => {
      // find existing email
      const existingAccount = await Account.findOne({ where: { email: input.email } }).catch(err => reject(err))
      if (existingAccount)
        return reject(new Error('Email is already in use'))

      // hash password
      const hashedPassword = await bcrypt.hash(input.password, 12);

      const {
        email,
        firstName,
        lastName,
        phone,
      } = input

      // create user account
      Parent.create({
        email,
        firstName,
        lastName,
        password: hashedPassword,
        phone,
      }).save()
        .then(account => {
          // login user via authtoken
          const tokens = createTokens(account)
          ctx.res.cookie("refresh-token", tokens.refreshToken)
          ctx.res.cookie("access-token", tokens.accessToken)

          // temp set account type
          account.accountType = AccountType['parent']

          // send account
          resolve(account)
        })
        .catch(err => reject(err))
    })
  }
}