import { Account } from "./Account";
import { ChildEntity, Column } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType() @ChildEntity()
export class Admin extends Account {
  @Field({ nullable: true })
  @Column('varchar', { nullable: true })
  nickname?: string
}