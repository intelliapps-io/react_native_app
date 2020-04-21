import { ManyToMany, JoinTable, OneToOne, ChildEntity, Column } from "typeorm";
import { Account } from "./Account";
import { Parent } from "./Parent";
import { Field, ObjectType, Int, Root } from "type-graphql";
import { Group } from "./Group";

@ObjectType() @ChildEntity()
export class Student extends Account {
  @Field(type => [Parent], { nullable: true })
  @ManyToMany(type => Parent, parent => parent.children, { cascade: true, eager: true, nullable: true })
  @JoinTable()
  parents: Parent[]

  @Field(type => [Group])
  @ManyToMany(type => Group, group => group.mentors)
  mentorGroups: [Group]

  @Field(type => [Group])
  @ManyToMany(type => Group, group => group.mentees)
  menteeGroups:  [Group]

  @Field(type => Int)
  @Column('int')
  gradeLevel: number
}