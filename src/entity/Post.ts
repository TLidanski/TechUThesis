import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';
import { Reaction } from './Reaction';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    text: string;

    @Column('simple-array')
    mediaPaths: string[];

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(type => User, user => user.posts)
    user: User;

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];

    @OneToMany(type => Reaction, reaction => reaction.post)
    reactions: Reaction[];
}