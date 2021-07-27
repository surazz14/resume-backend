import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BaseEntity,
} from "typeorm";

import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity("blog")
export class Blog extends BaseEntity {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Field({ nullable: true })
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column()
  description: string;

  @Field({ nullable: true })
  @Column()
  subDescription: string;

  @Field({ nullable: true })
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
