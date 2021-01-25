import { createConnection, getConnection, getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Post } from '../entity/Post';
import { Comment } from '../entity/Comment';

describe('Post Test Suite', () => {
    beforeAll(async () => {
        await createConnection();
    });
    
    afterAll(async () => {
        await getConnection().close();
    });

    test('Should comment on post', async () => {
        const userRepo = getConnection().getRepository(User);
        const postRepo = getConnection().getRepository(Post);
        const commentRepo = getConnection().getRepository(Comment);
    
        const user = await userRepo.findOne({username: 'tlidanski'});

        const postData = postRepo.create({
            text: 'Jest Test Comment',
            user: user
        });
        const post = await postRepo.save(postData);

        const comment = commentRepo.create({
            text: 'Comment on post through Jest',
            author: user,
            post: post
        });
        const result = await commentRepo.save(comment);
        expect(result).toBeTruthy();
    });

    test('Should reply comment', async () => {
        const userRepo = getConnection().getRepository(User);
        const postRepo = getConnection().getRepository(Post);
        const commentRepo = getConnection().getRepository(Comment);
    
        const user = await userRepo.findOne({username: 'tlidanski'});

        const postData = postRepo.create({
            text: 'Jest Test Comment/Reply',
            user: user
        });
        const post = await postRepo.save(postData);

        const commentData = commentRepo.create({
            text: 'Comment to be replied through Jest',
            author: user,
            post: post
        });
        const comment =  await commentRepo.save(commentData);
        const reply = commentRepo.create({
            text: 'Reply on post through Jest',
            author: user,
            parentComment: comment
        });
        const result = await commentRepo.save(reply);
        expect(result).toBeTruthy();
    });
});