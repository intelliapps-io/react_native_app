import { Resolver, Query, Ctx } from "type-graphql";
import { Account } from "../../entities/Account";
import { MyContext } from "../../ts/context";

@Resolver()
export class MeQueryResolver {
  @Query(type => Account)
  me(@Ctx() ctx: MyContext) {
    return new Promise((resolve, reject) => {
      const id = ctx.req.accountId

      if (!id)
        return reject(new Error('Please login'))

      Account.findOne({ where: { id } })
        .then(account => resolve(account))
        .catch(err => reject(err))
    })
  }
} 