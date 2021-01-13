import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';
import { Reaction } from './Reaction';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(type => User, user => user.comments)
    author: User;

    @Column({ nullable: true })
    postId: number;

    @ManyToOne(type => Post, post => post.comments, {onDelete: 'CASCADE'})
    post: Post;

    @Column({ nullable: true })
    parentCommentId: number;

    @ManyToOne(type => Comment, comment => comment.replies)
    parentComment: Comment;

    @OneToMany(type => Reaction, reaction => reaction.comment)
    reactions: Reaction[];

    @OneToMany(type => Comment, comment => comment.parentComment)
    replies: Comment[];
}