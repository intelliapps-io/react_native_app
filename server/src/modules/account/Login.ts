import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import { MyContext } from "../../ts/context";
import { createTokens } from "../../helpers/auth";
import { Account } from "../../entities/Account";

@Resolver()
export class LoginResolver {
  @Mutation(type => Account, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: MyContext
  ): Promise<Account | null> {
    // find account whose email matches
    const account = await Account.findOne({ where: { email } });
    if (!account) throw "email and or password are invalid";

    // compare passwords
    const valid = await bcrypt.compare(password, account.password);
    if (!valid) throw "email and or password are invalid";

    const tokens = createTokens(account);

    ctx.res.cookie("refresh-token", tokens.refreshToken);
    ctx.res.cookie("access-token", tokens.accessToken);

    return account;
  }
}