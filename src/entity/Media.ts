import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Post } from './Post';

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

    @ManyToOne(type => Post, post => post.media, {nullable: true})
    post: Post;
}