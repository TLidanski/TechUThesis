import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './Post';
import { User } from './User';
import { Comment } from "./Comment";

export enum ReactionType {
    LIKE = 'LIKE',
    LOVE = 'LOVE',
    HAHA = 'HAHA',
    WOAH = 'WOAH',
    CRY = 'CRY',
    ANGRY = 'ANGRY'
}

@Entity()
export class Reaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ReactionType
    })
    reaction: ReactionType;

    @ManyToOne(type => User, user => user.reactions)
    user: User;

    @ManyToOne(type => Post, post => post.reactions, {nullable: true})
    post: Post;

    @ManyToOne(type => Comment, comment => comment.reactions, {nullable: true})
    comment: Comment;
}