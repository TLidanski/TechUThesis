import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {User} from './User';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    someColumn: string;

    @ManyToOne(type => User, user => user.posts)
    user: User;
}