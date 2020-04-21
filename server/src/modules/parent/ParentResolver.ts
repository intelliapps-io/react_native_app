import { Resolver, Query, InputType, Field, Arg, Mutation, Authorized, Ctx } from "type-graphql";
import { Parent } from "../../entities/Parent";
import { ANY_ACCOUNT_TYPE } from "../../helpers/auth";
import { AccountType } from "../../entities/Account";
import { MyContext } from "../../ts/context";
import { Student } from "../../entities/Student";

@InputType()
class QueryParentInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  email?: string
}

@Resolver()
export class ParentResolver {
  @Query(type => Parent)
  @Authorized(ANY_ACCOUNT_TYPE)
  async parent(@Arg('input') input: QueryParentInput) {
    if (input.id) {
      const student = await Parent.findOne({ where: { id: input.id }, relations: ['children'] })
      if (!student)
        throw new Error('No parent found with that id')
      return student
    } else if (input.email) {
      const student = await Parent.findOne({ where: { email: input.email }, relations: ['children'] })
      if (!student)
        throw new Error('No parent found with that email')
      return student
    } else {
      throw new Error('You must query a parent with either an id or email')
    }
  }

  @Mutation(type => Parent)
  @Authorized([AccountType['parent']])
  async addStudent(@Arg('studentEmail') studentEmail: string, @Ctx() ctx: MyContext) {
    // find parent
    const parent = await Parent.findOne({ where: { id: ctx.req.accountId } })
    if (!parent)
      throw new Error('Please login as a parent')

    // find student
    const student = await Student.findOne({ where: { email: studentEmail } })
    if (!student)
      throw new Error(`No student account exists under ${studentEmail}`)

    // check if student exists as relation
    for (let i = 0; i < student.parents.length; i++)
      if (student.parents[i].email === parent.email)
        throw new Error('You cannot add someone who is already your parent')

    // add relation
    student.parents.push(parent)

    // save 
    await student.save()

    return parent
  }

  @Mutation(type => Parent)
  @Authorized([AccountType['parent']])
  async removeStudent(@Arg('studentEmail') studentEmail: string, @Ctx() ctx: MyContext) {
    // find parent
    const parent = await Parent.findOne({ where: { id: ctx.req.accountId } })
    if (!parent)
      throw new Error('Please login as a parent')

    // find student
    const student = await Student.findOne({ where: { email: studentEmail } })
    if (!student)
      throw new Error(`No student account exists under ${studentEmail}`)

    // remove relation
    student.parents = student.parents.filter(_parent => _parent.email !== parent.email)

    // save 
    await student.save()

    return parent
  }
}