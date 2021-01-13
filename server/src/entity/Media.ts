import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';

import { Post } from './Post';
import { Album } from './Album';

export enum MediaType {
    IMAGE = 'image',
    VIDEO = 'video'
}

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: MediaType
    })
    type: MediaType;

    @Column()
    path: string;

    @Column({nullable: true})
    description: string;

    @ManyToOne(type => Post, post => post.media, {nullable: true, onDelete: 'CASCADE'})
    post: Post;

    @ManyToMany(type => Album, album => album.media)
    albums: Album[];
}