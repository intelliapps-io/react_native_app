import { Account } from "./Account";
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";

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


}