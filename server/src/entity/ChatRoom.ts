import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ChatMessage } from './ChatMessage';
import { User } from './User';

@Entity()
export class ChatRoom {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => ChatMessage, chatMessage => chatMessage.room)
    messages: ChatMessage[];

    @ManyToMany(type => User, user => user.chatRooms, {cascade: true})
    @JoinTable()
    users: User[];
}