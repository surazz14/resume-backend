import {Entity, PrimaryGeneratedColumn, Column,BaseEntity} from "typeorm";

@Entity("personInfo")
export class PersonInfo extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    header?: string;
    @Column()
    name?: string;
    @Column()
    phoneNumber?: string;
    @Column()
    email?: string;
    @Column()
    linkedin?: string;
    @Column()
    github?: string;
    @Column()
    location?: string;
    @Column()
    description?: string;
    @Column()
    subDescription?: string;

}
