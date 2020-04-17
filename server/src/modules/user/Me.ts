import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../../entities/User";
import { MyContext } from "../../ts/context";

@Resolver()
export class MeResolver {
  @Query(type => User)
  me(@Ctx() ctx: MyContext) {
    return new Promise((resolve, reject) => {
      if (ctx.req.userId) 
        User.findOne({ where: { id: ctx.req.userId } })
          .then((user) => {
            if (user)
              resolve(user)
            else
              reject(new Error('No user was found with that id'))
          })
          .catch((err) => reject(err))
      else
        reject(new Error('Please login'))
    })
  }
}