import { Resolver, Mutation, Arg, Authorized, Ctx, Query } from "type-graphql";
import { Group } from "../../entities/Group";
import { GroupInput } from "./GroupInput";
import { ANY_ACCOUNT_TYPE } from "../../helpers/auth";
import { AccountType } from "../../entities/Account";
import { MyContext } from "../../ts/context";
import { Student } from "../../entities/Student";

@Resolver()
export class GroupResolver {
  @Query(type => Group)
  @Authorized(ANY_ACCOUNT_TYPE)
  group(@Arg('id') id: string) {
    return Group.findOne({ where: { id }})
  }

  @Query(type => [Group])
  @Authorized(ANY_ACCOUNT_TYPE)
  groups() {
    return Group.find()
  }

  @Mutation(type => Group)
  @Authorized(ANY_ACCOUNT_TYPE)
  async createGroup(@Arg('input') input: GroupInput) {
    return await Group.create({
      ...input
    }).save()
  }

  @Mutation(type => String)
  @Authorized(ANY_ACCOUNT_TYPE)
  async deleteGroup(@Arg('id') id: string) {
    const group = await Group.findOne({ where: { id } })
    if (!group)
      throw new Error('No group found with that id')
    await group.remove()
    return id
  }

  @Mutation(type => Group)
  @Authorized(ANY_ACCOUNT_TYPE)
  async editGroup(@Arg('id') id: string, @Arg('input') input: GroupInput) {
    const group = await Group.findOne({ where: { id } })
    if (!group)
      throw new Error('No group found with that id')
    
    group.name = input.name
    group.description = input.description
    group.minMenteeGradeLevel = input.minMenteeGradeLevel
    group.minMentorGradeLevel = input.minMentorGradeLevel

    await group.save()
    return group
  }

  @Mutation(type => Group)
  @Authorized([AccountType['student']])
  async joinGroupMentee(@Arg('id') id: String, @Ctx() ctx: MyContext ) {
    const group = await Group.findOne({ where: { id } })
    if (!group)
      throw new Error('No group found with that id')
    
    const student = await Student.findOne({ where: { id: ctx.req.accountId } })
    if (!student)
      throw new Error('Please login as a student account')
    
    if (group.minMenteeGradeLevel > student.gradeLevel)
      throw new Error(`You must be grade level ${group.minMenteeGradeLevel} or above`)
      
    group.mentees.push(student)
    
    await group.save()

    return group
  } 

  @Mutation(type => Group)
  @Authorized([AccountType['student']])
  async leaveGroupMentee(@Arg('id') id: String, @Ctx() ctx: MyContext ) {
    const group = await Group.findOne({ where: { id } })
    if (!group)
      throw new Error('No group found with that id')
    
    const student = await Student.findOne({ where: { id: ctx.req.accountId } })
    if (!student)
      throw new Error('Please login as a student account')
    
    group.mentees = group.mentees.filter(_student => _student.id !== student.id)
    
    await group.save()

    return group
  } 

  @Mutation(type => Group)
  @Authorized([AccountType['student']])
  async joinGroupMentor(@Arg('id') id: String, @Ctx() ctx: MyContext ) {
    const group = await Group.findOne({ where: { id } })
    if (!group)
      throw new Error('No group found with that id')
    
    const student = await Student.findOne({ where: { id: ctx.req.accountId } })
    if (!student)
      throw new Error('Please login as a student account')
    
    if (group.minMentorGradeLevel > student.gradeLevel)
      throw new Error(`You must be grade level ${group.minMentorGradeLevel} or above`)
      
    group.mentors.push(student)
    
    await group.save()

    return group
  } 

  @Mutation(type => Group)
  @Authorized([AccountType['student']])
  async leaveGroupMentor(@Arg('id') id: String, @Ctx() ctx: MyContext ) {
    const group = await Group.findOne({ where: { id } })
    if (!group)
      throw new Error('No group found with that id')
    
    const student = await Student.findOne({ where: { id: ctx.req.accountId } })
    if (!student)
      throw new Error('Please login as a student account')
      
    group.mentors = group.mentors.filter(_student => _student.id !== student.id)
    
    await group.save()

    return group
  } 
}