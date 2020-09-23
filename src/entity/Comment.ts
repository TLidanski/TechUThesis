import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Post } from './Post';
import { User } from './User';
import { Reaction } from './Reaction';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    text: string;

    @ManyToOne(type => User, user => user.comments)
    author: User;

    @ManyToOne(type => Post, post => post.comments)
    post: Post;

    @OneToMany(type => Reaction, reaction => reaction.comment)
    reactions: Reaction[];
}