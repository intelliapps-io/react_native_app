import { Account } from "./Account";
import { ChildEntity, ManyToMany, createQueryBuilder } from "typeorm";
import { ObjectType, Field, Root } from "type-graphql";
import { RelationColumn } from "../helpers/helpers";
import { Student } from "./Student";

@ObjectType() @ChildEntity()
export class Parent extends Account {
  @Field(type => [Student])
  children(@Root() parent: Parent) {
    return new Promise((resolve, reject) => {
      const query = Student.createQueryBuilder()
      // query.innerJoin('', )
      resolve([])
      
    })
  }
}