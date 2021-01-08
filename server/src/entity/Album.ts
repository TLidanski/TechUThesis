import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Media } from './Media';
import { User } from './User';

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(type => User, user => user.albums)
    user: User;

    @ManyToMany(type => Media, media => media.albums)
    @JoinTable()
    media: Media[];
}