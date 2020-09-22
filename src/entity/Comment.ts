import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

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
}