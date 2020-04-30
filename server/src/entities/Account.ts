import { ObjectType, Field, ID, Root, registerEnumType, Arg } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, TableInheritance } from 'typeorm';
import { nodeLogger } from '../helpers/helpers';
import { Meeting } from './Meeting';
import { Student } from './Student';

export enum AccountType {
  admin = 'admin',
  parent = 'parent',
  student = 'student'
}

registerEnumType(AccountType, { name: 'AccountType' })

@ObjectType() @Entity()
@TableInheritance({ column: { type: "enum", name: "type", enum: AccountType } })
export class Account extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(type => AccountType)
  @Column({ asExpression: `type` })
  accountType: string

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Field()
  name(@Root() parent: Account): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Column({ unique: true })
  email: string

  @Field({ nullable: true })
  @Column('varchar', { nullable: true })
  phone?: string

  @Column()
  password: string

  @Field({ nullable: true })
  @Column({ default: 0 })
  authCount: number

  @Field(type => [Meeting])
  async meetings(@Root() account: Account) {
    if (account.accountType !== AccountType['student'])
      return []
    const student = await Student.findOneOrFail({ where: { id: account.id } })
    let meetings = await Meeting.find()
    meetings = meetings.filter((_meeting) => {
      const { attendingMentees, attendingMentors } = _meeting
      for (let i = 0; i < attendingMentees.length; i++)
        if (attendingMentees[i].id === student.id)
          return true
      for (let i = 0; i < attendingMentors.length; i++)
        if (attendingMentors[i].id === student.id)
          return true
    })
    return meetings
  }
}