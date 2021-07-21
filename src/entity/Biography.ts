import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { MainSkills } from "./mainSkills";
import { PersonInfo } from "./personInfo";

@Entity("biography")
export class Biography extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  subDescription: string;

  @OneToOne(() => MainSkills, (mainSkill) => mainSkill.id, { cascade: true })
  @JoinColumn()
  mainSkills: MainSkills;

  @OneToOne(() => PersonInfo, (personInfo) => personInfo.id, { cascade: true })
  @JoinColumn()
  personalInfo: PersonInfo;
}
