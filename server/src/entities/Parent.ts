import { Account } from "./Account";
import { ChildEntity, ManyToMany, createQueryBuilder } from "typeorm";
import { ObjectType, Field, Root } from "type-graphql";
import { RelationColumn } from "../helpers/helpers";
import { Student } from "./Student";

@ObjectType() @ChildEntity()
export class Parent extends Account {
  @Field(type => [Student])
  @ManyToMany(type => Student, student => student.parents)
  children: Student[]
}