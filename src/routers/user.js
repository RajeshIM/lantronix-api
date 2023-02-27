const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const logger = require('../logger/logger');

//User Register API
router.post('/user/register', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save();

        //user register success log
        logger.info("User Registered Successfully");

        res.status(201).send({ "message": "A verification mail has been sent to your registered mail." });
    } catch (e) {
        const errMessage = e.message || "Error while Registering the User.";
        
        //user register error log
        logger.error(errMessage);

        res.status(400).send({ "message": errMessage });
    }
})

//User Login API
router.post('/user/login', async (req, res) => {
    try {
        const { body: { email, password } } = req;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();

        //user login success log
        logger.info("User Login Success");

        res.send({ user, token });
    } catch (e) {
        const errMessage = e.message || "Unable to login.";
        
        //user login error log
        logger.error(errMessage);

        res.status(400).send({ "message": errMessage });
    }
})

module.exports = router;