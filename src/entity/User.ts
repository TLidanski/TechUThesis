import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
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

    @Column({
        unique: true
    })
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthday: Date;

    @Column({
        type: 'enum',
        enum: Gender
    })
    gender: Gender;

    @OneToMany(type => Post, post => post.user)
    posts: Post[];

    @ManyToMany(type => User, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinTable()
    friends: User[];
}