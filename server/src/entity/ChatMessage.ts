import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { ChatRoom } from './ChatRoom';

@Entity()
export class ChatMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, user => user.chatMessages)
    author: User;

    @Column({nullable: true})
    roomId: number;

    @ManyToOne(() => ChatRoom, room => room.messages)
    room: ChatRoom;
}