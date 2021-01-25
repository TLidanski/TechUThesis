import { createConnection, getConnection, getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Post } from '../entity/Post';

describe('Post Test Suite', () => {
    beforeAll(async () => {
        await createConnection();
    });
    
    afterAll(async () => {
        await getConnection().close();
    });

    test('Should create post', async () => {
        const userRepo = getConnection().getRepository(User);
        const postRepo = getConnection().getRepository(Post);
    
        const user = await userRepo.findOne({username: 'tlidanski'});

        const post = postRepo.create({
            text: 'Some catchy phrase',
            user: user
        });

        const result = await postRepo.save(post);
        expect(result).toBeTruthy();
    });

    test('Should delete post', async () => {
        const postRepo = getConnection().getRepository(Post);
        const result = await postRepo.delete({text: 'Some catchy phrase'});

        expect(result).toBeTruthy();
    });
});