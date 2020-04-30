import { Resolver, Query, Authorized, Arg, Mutation, Ctx } from "type-graphql";
import { Meeting } from "../../entities/Meeting";
import { ANY_ACCOUNT_TYPE } from "../../helpers/auth";
import { MeetingInput } from "./MeetingInput";
import { Group } from "../../entities/Group";
import { MyContext } from "../../ts/context";
import { Student } from "../../entities/Student";

@Resolver()
export class MeetingResolver {
  @Query(type => Meeting)
  @Authorized(ANY_ACCOUNT_TYPE)
  async meeting(@Arg('id') id: String) {
    return await Meeting.findOne({ where: { id } })
  }

  @Query(type => [Meeting])
  @Authorized(ANY_ACCOUNT_TYPE)
  async meetings() {
    return await Meeting.find({ relations: ['group'] })
  }

  @Mutation(type => Meeting)
  @Authorized(ANY_ACCOUNT_TYPE)
  async createMeeting(@Arg('input') input: MeetingInput) {
    const group = await Group.findOneOrFail({ where: { id: input.groupId } })
    const meeting = await Meeting.create({ ...input })
    meeting.group = group

    await meeting.save()
    await meeting.reload()
    return meeting
  }

  @Mutation(type => Meeting)
  @Authorized(ANY_ACCOUNT_TYPE)
  async updateMeeting(@Arg('id') id: string, @Arg('input') input: MeetingInput) {
    const group = await Group.findOneOrFail({ where: { id: input.groupId } })
    await Meeting.update({ ...input }, { id })
    const meeting = await Meeting.findOneOrFail({ where: { id } })

    meeting.group = group

    await meeting.save()
    return meeting
  }

  @Mutation(type => String)
  @Authorized(ANY_ACCOUNT_TYPE)
  async deleteMeeting(@Arg('id') id: string) {
    const meeting = await Meeting.findOneOrFail({ where: { id } })
    await meeting.remove()
    return id
  }

  @Mutation(type => Meeting)
  @Authorized(ANY_ACCOUNT_TYPE)
  async joinMeeting(@Arg('id') id: string, @Ctx() contex: MyContext) {
    const meeting = await Meeting.findOneOrFail({ where: { id } })
    const group = await Group.findOneOrFail({ where: { id: meeting.groupId } })
    const student = await Student.findOneOrFail({ where: { id: contex.req.accountId } })

    const isMentor = group.mentors.filter(account => account.id === student.id)
    const isMentee = group.mentees.filter(account => account.id === student.id)

    if (!isMentee || !isMentee)
      throw 'You must be metee or mentor in the group of this meeting'

    if (isMentee)
      meeting.attendingMentees.push(student)

    if (isMentor)
      meeting.attendingMentors.push(student)

    await meeting.save()
    return meeting
  }

  @Mutation(type => Meeting)
  @Authorized(ANY_ACCOUNT_TYPE)
  async leaveMeeting(@Arg('id') id: string, @Ctx() contex: MyContext) {
    const meeting = await Meeting.findOneOrFail({ where: { id } })
    const student = await Student.findOneOrFail({ where: { id: contex.req.accountId } })

    meeting.attendingMentees = meeting.attendingMentees.filter(_student => _student.id !== student.id)
    meeting.attendingMentors = meeting.attendingMentors.filter(_student => _student.id !== student.id)

    await meeting.save()
    return meeting
  }
}
