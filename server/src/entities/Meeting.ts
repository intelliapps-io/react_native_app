import { Account } from "./Account";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";

@ObjectType() @Entity()
export class Meeting extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(type => Date)
  @Column('date')
  date: Date

  @Field(type => Int, { description: 'minutes since midnight'})
  @Column('int', { comment: 'minutes since midnight'})
  startMin: number

  @Field(type => Int, { description: 'minutes since midnight'})
  @Column('int', { comment: 'minutes since midnight'})
  endMin: number
    
  @Field()
  @Column('varchar')
  title: string

  @Field()
  @Column('text')
  description: string
}