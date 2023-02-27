const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(userRouter);

module.exports = app;