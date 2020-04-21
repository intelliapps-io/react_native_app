import { Resolver, Mutation, Authorized, Arg, Ctx, InputType, Field, Query } from "type-graphql";
import { Student } from "../../entities/Student";
import { AccountType } from "../../entities/Account";
import { MyContext } from "../../ts/context";
import { Parent } from "../../entities/Parent";
import { ANY_ACCOUNT_TYPE } from "../../helpers/auth";

@InputType()
class QueryStudentInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  email?: string
}

@Resolver()
export class StudentResolver {
  @Query(type => Student)
  @Authorized(ANY_ACCOUNT_TYPE)
  async student(@Arg('input') input: QueryStudentInput) {
    if (input.id) {
      const student = await Student.findOne({ where: { id: input.id } })
      if (!student)
        throw new Error('No student found with that id')
      return student
    } else if (input.email) {
      const student = await Student.findOne({ where: { email: input.email } })
      if (!student)
        throw new Error('No student found with that email')
      return student
    } else {
      throw new Error('You must query a student with either an id or email')
    }
  }

  @Mutation(type => Student)
  @Authorized([AccountType['student']])
  async addParent(@Arg('parentEmail') parentEmail: string, @Ctx() ctx: MyContext) {
    // find student
    const student = await Student.findOne({ where: { id: ctx.req.accountId } })
    if (!student)
      throw new Error('Please login as a student')

    // find parent
    const parent = await Parent.findOne({ where: { email: parentEmail } })
    if (!parent)
      throw new Error(`No parent account exists under ${parentEmail}`)

    // check if parent exists as relation
    for (let i = 0; i < student.parents.length; i++)
      if (student.parents[i].email === parent.email)
        throw new Error('You cannot add someone who is already your parent')

    // add relation
    student.parents.push(parent)

    // save 
    return await student.save()
  }

  @Mutation(type => Student)
  @Authorized([AccountType['student']])
  async removeParent(@Arg('parentEmail') parentEmail: string, @Ctx() ctx: MyContext) {
    // find student
    const student = await Student.findOne({ where: { id: ctx.req.accountId } })
    if (!student)
      throw new Error('Please login as a student')

    // find parent
    const parent = await Parent.findOne({ where: { email: parentEmail } })
    if (!parent)
      throw new Error(`No parent account exists under ${parentEmail}`)

    // remove relation
    student.parents = student.parents.filter(_parent => _parent.email !== parent.email)

    // save 
    return await student.save()
  }
}