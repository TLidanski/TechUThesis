import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from 'typeorm';
import {User} from './User';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    text: string;

    @Column()
    mediaPath: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(type => User, user => user.posts)
    user: User;
}