import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Post } from './Post';
import { Reaction } from './Reaction';

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
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthday: Date;

    @Column({default: 'static/media/default-user.svg'})
    avatar: string;

    @Column({
        type: 'enum',
        enum: Gender
    })
    gender: Gender;

    @OneToMany(type => Post, post => post.user)
    posts: Post[];

    @OneToMany(type => Reaction, reaction => reaction.user)
    reactions: Reaction[];

    @ManyToMany(type => User, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinTable()
    friends: User[];
}