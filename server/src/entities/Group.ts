import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Int, Root } from "type-graphql";
import { Student } from "./Student";
import { Meeting } from "./Meeting";

@ObjectType() @Entity()
export class Group extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column('varchar')
  name: string

  @Field()
  @Column('text')
  description: string

  @Field(type => Int)
  @Column('int')
  minMenteeGradeLevel: number

  @Field(type => Int)
  @Column('int')
  minMentorGradeLevel: number

  @Field(type => [Student], { nullable: true })
  @ManyToMany(type => Student, { eager: true, cascade: true })
  @JoinTable()
  mentors: Student[]

  @Field(type => [Student])
  @ManyToMany(type => Student, { eager: true, cascade: true })
  @JoinTable()
  mentees: Student[]

  @Field(type => [Meeting])
  meetings(@Root() group: Group) {
    return Meeting.find({ where: { groupId: group.id }})
  }
}