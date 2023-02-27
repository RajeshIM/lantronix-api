const app = require('./app');
const logger = require('./logger/logger');
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
    logger.info(`Server is up on port ${port}`);
});