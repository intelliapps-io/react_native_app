import { ObjectType, Field, ID, Root, registerEnumType, Arg } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, TableInheritance } from 'typeorm';
import { nodeLogger } from '../helpers/helpers';

export enum AccountType {
  admin = 'admin',
  parent = 'parent',
  student = 'student'
}

registerEnumType(AccountType, { name: 'AccountType' })

@ObjectType() @Entity()
@TableInheritance({ column: { type: "enum", name: "type", enum: AccountType } })
export class Account extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(type => AccountType)
  @Column({ asExpression: `type` })
  accountType: string

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Field()
  name(@Root() parent: Account): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Column({ unique: true })
  email: string

  @Field({ nullable: true })
  @Column('varchar', { nullable: true })
  phone?: string

  @Column()
  password: string

  @Field({ nullable: true })
  @Column({ default: 0 })
  authCount: number
}