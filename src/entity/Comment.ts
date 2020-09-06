import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    text: string;

    @OneToOne(type => User)
    @JoinColumn()
    author: User;

    @ManyToOne(type => Post, post => post.comments)
    post: Post;
}