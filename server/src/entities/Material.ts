import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType() @Entity()
export class Material extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string
    
  @Field()
  @Column('varchar')
  title: string
      
  @Field({ nullable: true })
  @Column('varchar', { nullable: true })
  author: string

  @Field()
  @Column('varchar')
  type: string

  @Field()
  @Column('text')
  url: string

  @Field(type => Date)
  @Column('date')
  dueDate: Date

  @Field()
  @Column('text')
  notes: string
}