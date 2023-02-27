const request = require('supertest');
const app = require('../src/app');
const { userToRegister, userOne, setupDatabase } = require('./db');

beforeEach(setupDatabase);

test('Should register a new user', async () => {
    const response = await request(app).post('/user/register').send(userToRegister).expect(201);
    expect(response.body.message).toBe("A verification mail has been sent to your registered mail.");
})

test('Should login existing user', async () => {
    const { email, password, username } = userOne;
    
    const response = await request(app).post('/user/login').send({
        email,
        password
    }).expect(200);
    
    const { body: { user, token } } = response;

    expect(user.username).toBe(username);
    expect(user.email).toBe(email);
    expect(user.password).not.toBe(password);
    expect(token).not.toBeNull();
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/user/login').send({
        email: userOne.email,
        password: 'wrongpassword'
    }).expect(400);
});