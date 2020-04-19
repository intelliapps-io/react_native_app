import { ManyToMany, JoinTable, OneToOne, ChildEntity, Column } from "typeorm";
import { Account } from "./Account";
import { Parent } from "./Parent";
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType() @ChildEntity()
export class Student extends Account {
  @Field(type => [Parent])
  @ManyToMany(type => Parent, { cascade: true, eager: true })
  @JoinTable()
  parents: Parent[]

  // @Field(type => [Student], { nullable: true })
  // @ManyToMany(type => Student, { nullable: true, eager: true, cascade: true })
  // mentor?: Student[]

  // @Field(type => [Student], { nullable: true })
  // @ManyToMany(type => Student, { nullable: true, eager: true, cascade: true })
  // mentee?: Student[]

  @Field(type => Int)
  @Column('int')
  gradeLevel: number
}