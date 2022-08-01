import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  static findOne(userIdNum: number) {
    throw new Error("Method not implemented.");
  }
  static update(arg0: { id: number; }, arg1: { password: string; }) {
    throw new Error("Method not implemented.");
  }
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({type: 'date'})
  createdAt  = new Date();
  
  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt  = new Date();
 
  @Field()
  @Property({type: 'text', unique: true})
  username!: string

  @Property({type: 'text',})
  password!: string
  email: any;

} 