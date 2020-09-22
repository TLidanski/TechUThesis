import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Media } from './Media';

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @ManyToMany(type => Media, media => media.albums)
    @JoinTable()
    media: Media[];
}