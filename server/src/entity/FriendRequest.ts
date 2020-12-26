import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class FriendRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    fromId: number;

    @ManyToOne(() => User, user => user.requested)
    from: User;

    @Column({nullable: true})
    toId: number;

    @ManyToOne(() => User, user => user.requests)
    to: User;
}