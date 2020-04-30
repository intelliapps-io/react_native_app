import { Resolver, Query, Authorized, Arg, Mutation } from "type-graphql";
import { Material } from "../../entities/Material";
import { ANY_ACCOUNT_TYPE } from "../../helpers/auth";
import { MaterialInput } from "./MaterialInput";

@Resolver()
export class MaterialResolver {
  @Query(type => Material)
  @Authorized(ANY_ACCOUNT_TYPE)
  async material(@Arg('id') id: string) {
    return Material.findOneOrFail({ where: { id } })
  }

  @Query(type => [Material])
  @Authorized(ANY_ACCOUNT_TYPE)
  async materials() {
    return Material.find()
  }

  @Mutation(type => Material)
  @Authorized(ANY_ACCOUNT_TYPE)
  async createMaterial(@Arg('input') input: MaterialInput) {
    return Material.create({ ...input })
  }

  @Mutation(type => Material)
  @Authorized(ANY_ACCOUNT_TYPE)
  async editMaterial(@Arg('id') id: string, @Arg('input') input: MaterialInput) {
    await Material.update({ ...input }, { id })
    return await Material.findOneOrFail({ where: { id } })
  }

  @Mutation(type => String)
  @Authorized(ANY_ACCOUNT_TYPE)
  async deleteMaterial(@Arg('id') id: string) {
    const material = await Material.findOneOrFail({ where: { id } })
    await material.remove()
    return id
  }
}