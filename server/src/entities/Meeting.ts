import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, In, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Group } from "./Group";
import { RelationColumn } from "../helpers/helpers";
import { Student } from "./Student";
import { Material } from "./Material";

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

  @Field()
  @Column('text')
  location: string

  @Field(type => Int)
  @Column('int')
  capacity: number

  @Field(type => Group)
  @ManyToOne(type => Group, group => group.id, { cascade: true, eager: true })
  group: Group
  @RelationColumn()
  groupId: string

  @Field(type => [Student], { nullable: true })
  @ManyToMany(type => Student, { eager: true, cascade: true })
  @JoinTable()
  attendingMentors: Student[]

  @Field(type => [Student])
  @ManyToMany(type => Student, { eager: true, cascade: true })
  @JoinTable()
  attendingMentees: Student[]

  @Field(type => [Material])
  @ManyToMany(type => Material, { eager: true, cascade: true })
  @JoinTable()
  materials: Material[]
}