import { createConnection, getConnection, getRepository } from 'typeorm';
import { User } from '../entity/User';

describe('User Test Suite', () => {
    beforeAll(async () => {
        await createConnection();
    });
    
    afterAll(async () => {
        await getConnection().close();
    });

    test('Should create new user', async () => {   
        const repository = getConnection().getRepository(User);
        const user = repository.create({
            username: 'jest-user-test',
            email: 'jest@user.test',
            password: 'test',
            firstName: 'Jest',
            lastName: 'Test',
            birthday: new Date()
        });
    
        const result = await repository.save(user);
        expect(result).toBeTruthy();
    });

    test('Should delete created user', async () => {
        const repository = getConnection().getRepository(User);
        const result = await repository.delete({
            username: 'jest-user-test'
        });

        expect(result).toBeTruthy();
    });

    test('Should not create user with existing username', async () => {
        const repository = getConnection().getRepository(User);

        try {
            const user = repository.create({
                username: 'tlidanski',
                email: 'jest@user.test',
                password: 'test',
                firstName: 'Jest',
                lastName: 'Test',
                birthday: new Date()
            });

            const result = await repository.save(user);        
        } catch (error) {
            expect(error);
        }
    });

    test('Should not create user with existing username', async () => {
        const repository = getConnection().getRepository(User);

        try {
            const user = repository.create({
                username: 'distinct-username',
                email: 'tlidanski@gmail.com',
                password: 'test',
                firstName: 'Jest',
                lastName: 'Test',
                birthday: new Date()
            });

            const result = await repository.save(user);        
        } catch (error) {
            expect(error);
        }
    });
});