import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("mainSkills")
export class MainSkills extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  header1?: string;
  @Column()
  header2?: string;
  @Column("text", { array: true, })
  skills?: string[];
  @Column("text", { array: true })
  values?: string[];
};
