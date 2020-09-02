import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Post } from './Post';

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthdate: Date;

    @Column({
        type: 'enum',
        enum: Gender
    })
    gender: Gender;

    @OneToMany(type => Post, post => post.user)
    posts: Post[];
}