const mongoose = require('mongoose')
const User = require('../src/models/user')

//Test user payload to submit for /user/register API
const userToRegister = {
    "username": "testuser2",
    "firstname": "Test",
    "lastname": "User2",
    "email": "testuser2@gmail.com",
    "password": "testuser2"
};

//Default user record creating in DB to check /user/login API
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    "username": "testuser1",
    "firstname": "Test",
    "lastname": "User1",
    "email": "testuser1@gmail.com",
    "password": "testuser1"
};


//Deleting all user records and creating default user record to test login functionality
const setupDatabase = async () => {
    await User.deleteMany();
    await new User(userOne).save();
}

module.exports = {
    userToRegister,
    userOneId,
    userOne,
    setupDatabase
};