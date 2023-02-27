const mongoose = require('mongoose');
const logger = require('../logger/logger');

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
});

mongoose.connection.on("error", (e) => {
    logger.error("Mongo connect error!");
});
mongoose.connection.on("connected", () => {
    logger.info("connected to Mongo DB.");
});